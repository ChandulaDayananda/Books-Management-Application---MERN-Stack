import express from 'express'
import { Book } from '../models/bookModel.js'
const router = express.Router();

// Route for saving a new book
router.post('/', async (request, response) => { // Updated route to '/books'
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get All Books from database
router.get('/', async (request, response) => { // Moved closing parenthesis for `response` here
    try {
        const books = await Book.find({}); // Corrected `Books` to `Book` to match the model name
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get One Book from database by ID
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id); // Pass `id` directly
        if (!book) {
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for Deleting a Book by ID
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        // Attempt to find and delete the book by ID
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;