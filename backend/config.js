// backend/config.js
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB and Server Config
export const PORT = 5555;
export const mongoDBURL = 'mongodb+srv://Anmol:1234@bookstore.wrpf4qp.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookStore';

// Path to service account file
const serviceKeyPath = path.join(__dirname, 'gcs-service-key.json');

// Sanity check: does the file exist?
if (!fs.existsSync(serviceKeyPath)) {
  console.error('❌ GCS service key file not found at:', serviceKeyPath);
  process.exit(1);
}

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: serviceKeyPath, // Full path to JSON key
  projectId: 'gold-chassis-456418-g5',
});

// Reference your GCS bucket
const bucket = storage.bucket('bookstore-assets'); // ✅ Ensure bucket name is correct

// Export for use in upload logic
export { storage, bucket };
