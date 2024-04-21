# Library API

Node + Express + TypeScript API about a Library to manage:

1. Books
2. Authors

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

Download Postman and access [this](https://www.postman.com/dark-sunset-399073/workspace/library) Public Workspace.