const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
}));

// Middleware to parse JSON and urlencoded data
app.use(express.json()); // To handle JSON bodies
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded bodies

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
});
