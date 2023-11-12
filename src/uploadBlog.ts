import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// Replace these with your Azure Storage account and container details
const accountName = "<your-storage-account-name>";
const accountKey = "<your-storage-account-key>";
const containerName = "<your-container-name>";
const blobName = "<your-blob-name>"; // This will be the name of the file in the Blob Storage

async function uploadFileToBlobStorage() {
  // Create a Shared Key Credential for authentication
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  // Create a BlobServiceClient to interact with the Blob service
  const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

  // Get a reference to the container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a BlockBlobClient to upload a file
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Replace 'path-to-your-local-file' with the path to the file you want to upload
  const filePath = "path-to-your-local-file";

  // Upload the file to Blob Storage
  await blockBlobClient.uploadFile(filePath);

  console.log(`File "${blobName}" uploaded to Azure Blob Storage.`);
}

// Call the function to upload the file
uploadFileToBlobStorage().catch((error) => {
  console.error("Error uploading file:", error);
});

