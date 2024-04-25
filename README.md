# Library API

NodeJS based backend to showcase how to use Prisma ORM with TypeScript and a MySQL database to keep track of:

1. Books
2. Authors

## Relations

This API has the following relationships in the database:

- `Authors` 1..* `Books`

> `1..*` means "One-to-Many". If you are not familiar with this concept, check out this [video](https://www.youtube.com/watch?v=xsg9BDiwiJE)

## Getting started

- Install `MySQL` on your machine
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

## Trying it out

Download Postman and access [this](https://www.postman.com/dark-sunset-399073/workspace/library-api) Public Workspace.