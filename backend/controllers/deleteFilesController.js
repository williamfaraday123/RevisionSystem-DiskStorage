const path = require('path');
const fs = require('fs');

const deleteFileAtPath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file', err);
                reject(err);
            }
            console.log('File deleted successfully');
            resolve();
        });
    });
};

const deleteFile = async (req, res) => {
    try {
        //parse request body
        const filters = JSON.parse(req.body.filters);
    
        //check required fields in filters
        if (!filters.course_code || !filters.type) {
            res.status(400).json({ error: 'Missing required filter fields' });
        }
        switch (filters.type) {
            case 'Lecture':
                if (!filters.chapter) {
                    res.status(400).json({ error: 'Missing required filter fields' });
                }
                break;
            case 'Tutorial':
                if (!filters.chapter || !filters.QuestionsOrSolutions) {
                    res.status(400).json({ error: 'Missing required filter fields' });
                }
                break;
            case 'Past Year Papers':
                if (!filters.year || !filters.semester || !filters.QuestionsOrSolutions) {
                    res.status(400).json({ error: 'Missing required filter fields' });
                }
                break;
            default:
                res.status(400).json({ error: 'Invalid type' });
        }

        //destructure to obtain filter fields
        const { course_code, type, year, semester, chapter, QuestionsOrSolutions } = filters;

        //form file path
        let filePath = '';
        switch (filters.type) {
            case 'Lecture':
                filePath = path.join(__dirname, `../../frontend/src/assets/${course_code}/${type}/${chapter}.pdf`);
                break;
            case 'Tutorial':
                filePath = path.join(__dirname, `../../frontend/src/assets/${course_code}/${type}/${QuestionsOrSolutions}/${chapter}.pdf`);
                break;
            case 'Past Year Papers':
                filePath = path.join(__dirname, `../../frontend/assets/${course_code}/${type}/${QuestionsOrSolutions}/${course_code} ${year} ${semester}.pdf`);
                break;
            default:
                return res.status(400).json({ error: 'Invalid type' });
        }

        //check if filePath exists before deletion
        if (fs.existsSync(filePath)) {
            await deleteFileAtPath(filePath);
            res.status(200).json({ message: 'File deleted successfully' });
        } else {
            res.status(404).json({ error: 'File not found' });
        }

    } catch (err) {
        if (err instanceof SyntaxError && err.message.includes('JSON')) {
            console.error('Error parsing filters in deleteFile()', err);
            res.status(400).json({ error: 'Invalid JSON format in request body' });
        } else {
            console.error('Internal server error in deleteFile()', err);
            res.status(500).json({ error: err.message || 'Internal server error' });
        }
    }
};

module.exports = {
    deleteFile
};