const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

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
        //Wrap JSON parsing within a try-catch block to manage parsing errors gracefully
        try {
            //cannot do { course_code, type, year, semester, chapter, QuestionsOrSolutions } = JSON.parse(req.body.filters) because: If any required field (e.g., type, course_code) is missing or incorrectly parsed, the backend will throw an error, and multer will pass this error up the chain, leading to a 500 error.
            //so must assign const filters = JSON.parse(req.body.filters) before destructuring filters
            //error handling for cases where req.body.filters is undefined or improperly formatted.
            const filters = JSON.parse(req.body.filters);

            //Before destructuring filters, consider checking that each expected key exists to ensure all fields are available.
            //If any required field, such as course_code, type, or others, is missing or undefined, JavaScript will not throw an explicit error when destructuring filters. 
            //However, subsequent code that relies on these fields could cause unexpected behavior, such as trying to build paths or filenames based on undefined values, potentially leading to malformed paths, file names, or the inability to handle the file correctly
            if (!filters.course_code || !filters.type) {
                return cb(new Error('Missing required filter fields'));
            }
            switch (filters.type) {
                case 'Lecture':
                    if (!filters.chapter) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                case 'Tutorial':
                    if (!filters.chapter || !filters.QuestionsOrSolutions) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                case 'Past Year Papers':
                    if (!filters.year || !filters.semester || !filters.QuestionsOrSolutions) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                default:
                    return cb(new Error('Invalid type'));
            }
            const { course_code, type, year, semester, chapter, QuestionsOrSolutions } = filters;
            
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

            //check directory existence
            //Confirm directories exist or create them dynamically before saving files
            //If these directories do not already exist, multer might encounter issues saving the file unless the directories are created dynamically or pre-exist on the server.
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            
            cb(null, destPath);
        } catch (err) {
            console.error('Error parsing filters or ensuring directory:', err);
            cb(err);
        }            
    },
    filename: (req, file, cb) => {
        //Wrap JSON parsing within a try-catch block to manage parsing errors gracefully
        try {
            //cannot do { course_code, type, year, semester, chapter, QuestionsOrSolutions } = JSON.parse(req.body.filters) because: If any required field (e.g., type, course_code) is missing or incorrectly parsed, the backend will throw an error, and multer will pass this error up the chain, leading to a 500 error.
            //so must assign const filters = JSON.parse(req.body.filters) before destructuring filters
            //error handling for cases where req.body.filters is undefined or improperly formatted.
            const filters = JSON.parse(req.body.filters);
            
            //Before destructuring filters, consider checking that each expected key exists to ensure all fields are available.
            //If any required field, such as course_code, type, or others, is missing or undefined, JavaScript will not throw an explicit error when destructuring filters. 
            //However, subsequent code that relies on these fields could cause unexpected behavior, such as trying to build paths or filenames based on undefined values, potentially leading to malformed paths, file names, or the inability to handle the file correctly
            if (!filters.course_code || !filters.type) {
                return cb(new Error('Missing required filter fields'));
            }
            switch (filters.type) {
                case 'Lecture':
                    if (!filters.chapter) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                case 'Tutorial':
                    if (!filters.chapter || !filters.QuestionsOrSolutions) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                case 'Past Year Papers':
                    if (!filters.year || !filters.semester || !filters.QuestionsOrSolutions) {
                        return cb(new Error('Missing required filter fields'));
                    }
                    break;
                default:
                    return cb(new Error('Invalid type'));
            }
            const { course_code, type, year, semester, chapter, QuestionsOrSolutions } = filters;
            
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
        } catch (err) {
            console.error('Error parsing filters or setting filename:', err);
            cb(err);
        }
    }
});
const upload = multer({ 
    storage: storage,
    //limit uploaded file types to PDFs  by adding a file filter in multer
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only pdf files are allowed'));
        }
    }
});
app.post('/api/uploads', upload.single('file'), (req, res) => {
    try {
        res.send(`File uploaded successfully: ${req.file.path}`);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
});
