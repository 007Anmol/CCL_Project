import multer from 'multer';
import path from 'path';
import { bucket } from '../config.js';

// Multer memory storage
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload function to Google Cloud Storage
const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    const filename = `${Date.now()}${path.extname(".jpg")}`;
    console.log(filename);
    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      predefinedAcl: 'publicRead', // 👈 Makes file publicly accessible
    });

    blobStream.on('error', (err) => {
      console.error('BlobStream error:', err);
      reject(err);
    });

    blobStream.on('finish', async () => {
      try {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      } catch (err) {
        console.error('Make public error:', err);
        reject(err);
      }
    });

    blobStream.end(file.buffer);
  });
};

export { upload, uploadImageToGCS };
