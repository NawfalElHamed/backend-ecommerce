require('dotenv').config()



const {  StorageSharedKeyCredential } = require('@azure/storage-blob');
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, process.env.AZURE_STORAGE_ACCOUNT_KEY);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

// Create a SAS token for a specific container
const containerName = 'nawfal';
const containerClient = blobServiceClient.getContainerClient(containerName);
const sasToken = generateBlobSASQueryParameters(
  {
    containerName,
    permissions: BlobSASPermissions.parse('racwd'), 
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000), 
  },
  sharedKeyCredential 
).toString()

const blobServiceClientWithSAS = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);
let cdnBaseUrl = "https://cdnayman.azureedge.net"
const sharp = require('sharp');
exports.addImages = async (images) => {
  console.log('inside helpers', images);  
  if (images && images.length > 0) {
    const uploadedImages = [];
    for (const image of images) {
      const blobName = `${Date.now()}${image.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const imageContentType = image.mimetype;

      // Use "sharp" to convert the image to WebP format
      const webpData = await sharp(image.buffer)
        .webp({ quality: 100 }) // You can adjust the quality as needed
        .toBuffer();
      const options = {
        blobHTTPHeaders: {
          blobContentType: "image/webp", // Set the content type to WebP
        },
      };

      await blockBlobClient.upload(webpData, webpData.length, options);
      const imageUrl = `https://cdnayman.azureedge.net/nawfal/${blobName}`;
      console.log("Image uploaded to Azure Blob Storage:", imageUrl);
      uploadedImages.push({
        imageUrl,
        // Add other fields as needed for each image
      });
    }
    console.log('uploaded',uploadedImages);
    return uploadedImages; // Return the array of uploaded images
  } else {
    console.log("No images received");
    return []; // Return an empty array if no images are provided
  }
}; 
