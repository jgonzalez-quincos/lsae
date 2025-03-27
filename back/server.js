require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Back-end server is running!');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Back-end server running at http://localhost:${port}`);
});