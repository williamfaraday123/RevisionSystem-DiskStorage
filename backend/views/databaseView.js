const path = require('path');
const db = require('../database/database.js');

const getAllFromDatabase = async (req, res) => {
    try {
        const allData = await db.all('SELECT * FROM sortFilterOptions');
        res.status(200).json(allData);
    } catch (err) {
        console.error('Error fetching allData from database in getAllFromDatabase', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

const displayDatabaseView = async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); //display database at http://localhost:8000/api/views/database
};

module.exports = {
    getAllFromDatabase,
    displayDatabaseView
};