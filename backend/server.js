const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Updated path to pets.json inside 'backend' folder
const petsFilePath = path.join(__dirname, 'backend', 'pets.json');

// Load pet data from the JSON file
let pets = [];
fs.readFile(petsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading pets data:', err);
        return;
    }
    pets = JSON.parse(data);
});

// Search endpoint
app.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const results = pets.filter(pet => pet.breed.toLowerCase().includes(query));
    res.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
