const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
//const port = 8000; //for development

app.use(cors({
    origin: 'https://revision-system-disk-storage-client.vercel.app/',
    //origin: 'http://localhost:5173', // Only allow requests from this origin
}));

// Middleware to parse JSON and urlencoded data
app.use(express.json()); // To handle JSON bodies
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded bodies

app.use('/api', routes);

//for development
/* 
app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
}); */

module.exports = app; // Export the app for serverless deployment