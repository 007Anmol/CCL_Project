// models/bookModel.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // GCS public image URL
      required: false, // Optional field
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export const Book = mongoose.model('Book', bookSchema);
