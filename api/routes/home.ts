import { Router } from 'express';

const router = Router();

router.get('/', (_, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.send(html);
})

const html = `
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Library API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                padding: 20px;
                text-align: center;
            }
            h1 {
                color: #333;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Library API</h1>
        <p>Learn more about this API <a href="https://www.postman.com/dark-sunset-399073/workspace/library-api/overview">here</a>.</p>
    </body>
</html>
`;

export default router;