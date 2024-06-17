import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import XLSX  from "xlsx";
import { FileManager } from './utils/FileManager.js';
import { masking } from './utils/Masking.js';
// import './cron.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors()); // Allow CORS for all origins

// Create an S3 client object with region and credentials
const credentials = {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
};
const s3Client = new S3Client({ region: 'us-east-1', credentials });
const bucketName = 'ww-auth'; 

// API#1: Register a User 
app.post('/user/register', async(req, res) => {
 let reqBody = req.body;
 try{
  const fileName = masking( req.body?.email );
  const fileManager = new FileManager(s3Client);
  console.log("fileName: ", fileName+'.json');
  await fileManager.uploadFile(bucketName, fileName+'.json', JSON.stringify(req.body) );
 } catch (error) {
    console.error(`Error: ${error}`);
 }
 res.json(reqBody);
});

// API#2: User Login Authentication
app.post('/user/login', async(req, res) => { 
 let data = '';
 let response = {
    status : 'NOT_MATCHED',
    message: 'Password doesn\'t Match'
 }
 try{
    const fileName = masking( req.body?.email );
    const fileManager = new FileManager(s3Client);
    console.log("fileName: ", fileName+'.json');
    data = await fileManager.readFile(bucketName, fileName+'.json');
    data = JSON.parse(data);
    if(req.body.pwd === data?.pwd) {
        response.status= 'MATCHED';
        response.message = 'Password Matched';
        response.data = data;
    }
 } catch (error) {
    response.status='ERROR';
    response.message = error.message;
    console.error(`Error: ${error}`);
 }
  res.json(response);
});


// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/data', async(req, res) => {
   const getObjectParams = { Bucket: 'ww-fs', Key: 'writewise-repricing.xlsx' };
   const getObjectCommand = new GetObjectCommand(getObjectParams);
   const response = await s3Client.send(getObjectCommand);
  
  return res.status(200).send(response.Body);
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
   const file = req.file;
   console.log("req", file);
   if (!file) {
     return res.status(400).send('No file uploaded.');
   }
 
   const params = {
     Bucket: 'ww-fs',
     Key: file.originalname, // unique file name
     Body: file.buffer,
     ContentType: file.mimetype,
   };
 
   try {
     const command = new PutObjectCommand(params);
     await s3Client.send(command);
     console.log('File uploaded successfully');
     res.status(200).send('File uploaded successfully');
   } catch (error) {
     console.error('Error uploading file:', error);
     res.status(500).send('Error uploading file');
   }
 });


app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});