// Import the required AWS SDK clients and commands for Node.js
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from 'dotenv';

dotenv.config();


// Create an SES client object with region and credentials
const credentials = {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
};

// Set the AWS Region
const REGION = "us-east-1"; // Update to your region

// Create SES service object
const sesClient = new SESClient({ region: REGION, credentials });

// Set the parameters
const params = {
  Destination: {
    ToAddresses: ["kukalakuntat@gmail.com"],
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "<h1>Hello</h1><p>This is a test email sent using AWS SES</p>",
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello, This is a test email sent using AWS SES",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "kukalakuntat@gmail.com", // Your verified email
};

// Function to send email
const run = async () => {
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent successfully:", data.MessageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// Execute the function
run();
