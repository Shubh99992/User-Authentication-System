const express = require('express');
const fs = require('fs');
const joi = require('joi');
const path = require('path');
const authController = require('./controllers/authController');

const app = express();
app.use(express.json());

// static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'views')));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API Endpoints
app.post('/signup', authController.signup);
app.post('/login', authController.login);

// Starting the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
