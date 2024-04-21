# Library API

Node + Express + TypeScript API about a Library to manage:

1. Books
2. Authors

## Getting started

- Rename the `example.env` file to `.env`
- Set the values for each environment variable in that `.env` file

- Install all the dependencies

```
npm install
```

- Generate the Prisma client

```
npx prisma generate
```

- Run all the Prisma migrations:

```
npx prisma migrate dev
```

- Start up the server

```
npm run dev
```

## API Endpoints

### Books

#### Get All Books

- **Description**: Retrieve a list of all books.
- **Method**: GET
- **Endpoint**: `/api/books`
- **Response**: 
  - `200 OK` 
    ```json
    [
      {
        "id": 1,
        "title": "Sample Book 1",
        "description": "Sample description for Book 1",
        "authorId": 1,
        "createdAt": "2024-04-10T12:00:00.000Z",
        "updatedAt": "2024-04-10T12:00:00.000Z"
      },
    ]
    ```

#### Get Book by ID

- **Description**: Retrieve a specific book by its ID.
- **Method**: GET
- **Endpoint**: `/api/books/{id}`
- **Request Parameters**: 
  - `id` (string) - The ID of the book.
- **Response**: 
  - `200 OK` 
    ```json
    {
      "id": 1,
      "title": "Sample Book 1",
      "description": "Sample description for Book 1",
      "authorId": 1,
      "createdAt": "2024-04-10T12:00:00.000Z",
      "updatedAt": "2024-04-10T12:00:00.000Z"
    }
    ```
  - `404 Not Found` - If the book with the specified ID is not found.

#### Add a New Book

- **Description**: Add a new book to the database.
- **Method**: POST
- **Endpoint**: `/api/books`
- **Request Body**: 
  - `title` (string, required) - The title of the book.
  - `description` (string) - The description of the book.
  - `authorId` (int, required) - The ID of the author of the book.
- **Response**: 
  - `201 Created` 
    ```json
    {
      "id": 3,
      "title": "Sample Book 3",
      "description": "Sample description for Book 3",
      "authorId": 2,
      "createdAt": "2024-04-10T12:00:00.000Z",
      "updatedAt": "2024-04-10T12:00:00.000Z"
    }
    ```
  - `400 Bad Request` - If the request body is missing required fields.

### Authors

#### Get All Authors

- **Description**: Retrieve a list of all authors.
- **Method**: GET
- **Endpoint**: `/api/authors`
- **Response**: 
  - `200 OK` 
    ```json
    [
      {
        "id": 1,
        "name": "Author 1"
      },
    ]
    ```

#### Get Author by ID

- **Description**: Retrieve a specific author by their ID.
- **Method**: GET
- **Endpoint**: `/api/authors/{id}`
- **Request Parameters**: 
  - `id` (string) - The ID of the author.
- **Response**: 
  - `200 OK` 
    ```json
    {
      "id": 1,
      "name": "Author 1"
    }
    ```
  - `404 Not Found` - If the author with the specified ID is not found.

#### Add a New Author

- **Description**: Add a new author to the database.
- **Method**: POST
- **Endpoint**: `/api/authors`
- **Request Body**: 
  - `name` (string, required) - The name of the author.
- **Response**: 
  - `201 Created` 
    ```json
    {
      "id": 3,
      "name": "Author 3"
    }
    ```
  - `400 Bad Request` - If the request body is missing required fields.
