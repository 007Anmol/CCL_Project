import express from 'express';
import { Book } from '../models/bookModel.js';
import { upload, uploadImageToGCS } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Create a new book
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    let imageUrl = '';

    if (req.file) {
      try {
        imageUrl = await uploadImageToGCS(req.file);
      } catch (err) {
        console.error('Image upload error:', err);
        return res.status(500).send({ message: 'Image upload error' });
      }
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
      imageUrl: imageUrl || undefined, // Only store if uploaded
    });

    const savedBook = await newBook.save();
    return res.status(201).send(savedBook);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Update a book
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { id } = req.params;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    let updateData = { title, author, publishYear };

    if (req.file) {
      try {
        const imageUrl = await uploadImageToGCS(req.file);
        updateData.imageUrl = imageUrl;
      } catch (err) {
        console.error('Image upload error during update:', err);
        return res.status(500).send({ message: 'Image upload error' });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
