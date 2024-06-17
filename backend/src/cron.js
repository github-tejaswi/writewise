// cronjob.js

import cron from 'node-cron';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { parse } from "papaparse";

async function convertCSVToJSON(bucketName, objectKey, region) {
  try {
    const s3Client = new S3Client({ region: region }); // Replace with your region

    const getObjectParams = { Bucket: bucketName, Key: objectKey };
    const getObjectCommand = new GetObjectCommand(getObjectParams);

    const response = await s3Client.send(getObjectCommand);
    const csvData = response.Body.toString();

    // Parse CSV with Papa Parse
    const parsedData = parse(csvData, { header: true });

    // Convert rows to JSON objects
    const jsonData = parsedData.data.map((row) => {
      const jsonKey = Object.keys(row)[0]; // Assuming first column is key
      const jsonArray = Object.values(row).slice(1); // Remaining values as array
      return { [jsonKey]: jsonArray };
    });

    console.log("Converted JSON data:", jsonData);
  } catch (error) {
    console.error("Error converting CSV to JSON:", error);
  }
}

// Schedule a cron job to run 3 minute
cron.schedule('*/3 * * * *', () => {
  console.log('Running a task every 3 minute');
// Replace with your bucket name and object key
const bucketName = "ww-fs";
const objectKey = "your-object-key.csv";

convertCSVToJSON(bucketName, objectKey);
  // Your task logic here
});
