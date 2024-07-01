# Library API

NodeJS based backend to showcase how to use Prisma ORM with TypeScript and a MySQL database to keep track of:

1. Books
2. Authors

## Relations

This API has the following relationships in the database:

- `Authors` 1..* `Books`

> `1..*` means "One-to-Many". If you are not familiar with this concept, check out this [video](https://www.youtube.com/watch?v=xsg9BDiwiJE)

## Getting started

- Install `Docker` on your machine
- Setup the PostgreSQL database in your local easily with

```
docker compose up -d
```

- Rename the `example.env` file to `.env`
- Set the values for each environment variable in that `.env` file

- Install all the dependencies

```
pnpm install
```

- Generate the Prisma client

```
pnpm prisma:dev
```

- Start up the server

```
pnpm dev
```

## Trying it out

Download Postman and access [this](https://www.postman.com/dark-sunset-399073/workspace/library-api) Public Workspace.