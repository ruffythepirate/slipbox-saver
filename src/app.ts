import express from 'express';
import multer from 'multer';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Replace these with your Azure Storage account and container details
const accountName: string = process.env.AZURE_STORAGE_ACCOUNT!!;
const accountKey = process.env.AZURE_STORAGE_KEY!!;
const containerName = process.env.AZURE_STORAGE_CONTAINER!!;


// Initialize Azure Blob Storage
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Define an endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const blobName = file.originalname;

    // Create a BlockBlobClient to upload the file to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file to Blob Storage
    await blockBlobClient.uploadFile(file.path);

    // Respond with a success message
    res.status(200).json({ message: 'File uploaded to Azure Blob Storage' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

