Books CRUD API - Setup Instructions and Example Requests
Setup Instructions
Clone the repository
 Clone this repository from GitHub to your local machine:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies
 Ensure that you have Node.js and npm installed on your system. If not, you can download and install them from here.
 Once Node.js and npm are installed, run the following command in your terminal to install the required dependencies:

npm install

Start the server
 After installing the dependencies, start the server by running:

node server.js

 The server will run at http://localhost:3000.


Access Swagger UI
 You can access the API documentation via Swagger UI by visiting:

http://localhost:3000/swagger-ui
 This will allow you to interact with the API and test all available endpoints.



Example Requests
Here are some example requests you can use to test the API:
Create a new book (POST /books)
 To create a new book, use the POST method. Example using curl:


curl -X POST "http://localhost:3000/books" -H "Content-Type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "publishedYear": 1925}'
Retrieve all books (GET /books)
 To retrieve all books, use the GET method:

curl "http://localhost:3000/books"
Get a book by ID (GET /books/{id})
 To retrieve a book by its ID, use the GET method. Example:

curl "http://localhost:3000/books/1"
Update a book by ID (PUT /books/{id})
 To update a book by ID, use the PUT method. Example:

curl -X PUT "http://localhost:3000/books/1" -H "Content-Type: application/json" -d '{"title": "The Great Gatsby (Updated)", "author": "F. Scott Fitzgerald", "publishedYear": 1926}'

Delete a book by ID (DELETE /books/{id})
 To delete a book by ID, use the DELETE method. Example:

curl -X DELETE "http://localhost:3000/books/1"


