const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;
app.use(bodyParser.json());

let books = [];
let currentId = 1;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: 'A simple CRUD API for books',
    },
  },
  apis: ['./*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 */
app.post('/books', (req, res) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = { id: currentId++, title, author, publishedYear };
  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books with optional pagination and filtering
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of books per page
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author name
 *     responses:
 *       200:
 *         description: A list of books
 */
app.get('/books', (req, res) => {
  let { page = 1, size = 10, author } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  let filteredBooks = books;
  if (author) {
    filteredBooks = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }

  const start = (page - 1) * size;
  const paginatedBooks = filteredBooks.slice(start, start + size);
  
  res.json({
    page,
    size,
    total: filteredBooks.length,
    data: paginatedBooks,
  });
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  
  const { title, author, publishedYear } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (publishedYear) book.publishedYear = publishedYear;
  
  res.json(book);
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
  
  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/swagger-ui`);
});