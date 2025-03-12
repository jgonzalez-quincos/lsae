const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from the back-end!');
});

app.listen(port, () => {
    console.log(`Back-end server running at http://localhost:${port}`);
});