const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
}));

// Middleware to parse JSON and urlencoded data
app.use(express.json()); // To handle JSON bodies
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded bodies

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('sent to backend: ', JSON.parse(req.body));//check error
        const { course_code, type, year, semester, chapter, QuestionsOrSolutions } = JSON.parse(req.body.filters);
        let destPath = '';
        switch (type) {
            case 'Lecture':
                destPath = path.join(__dirname, `../frontend/src/assets/${course_code}/${type}`);
                break;
            case 'Tutorial':
                destPath = path.join(__dirname, `../frontend/src/assets/${course_code}/${type}/${QuestionsOrSolutions}`);
                break;
            case 'Past Year Papers':
                destPath = path.join(__dirname, `../frontend/src/assets/${course_code}/${type}/${QuestionsOrSolutions}`);
                break;
            default:
                return cb(new Error('Invalid type'));
        }
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const { course_code, type, year, semester, chapter, QuestionsOrSolutions } = JSON.parse(req.body.filters);
        let filename = '';
        switch (type) {
            case 'Lecture':
            case 'Tutorial':
                filename = `${chapter}.pdf`;
                break;
            case 'Past Year Papers':
                filename = `${course_code} ${year} ${semester}.pdf`;
                break;
            default:
                return cb(new Error('Invalid type'));
        }
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });
app.post('/api/uploads', upload.single('file'), (req, res) => {
    try {
        res.send(`File uploaded successfully: ${req.file.path}`);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
});