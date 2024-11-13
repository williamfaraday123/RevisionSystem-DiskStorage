const express = require('express');

const upload = require('./middleware/uploadMiddleware');
const { uploadFile } = require('./controllers/uploadsController');
const { insertFilterOption, retrieveFilterOptions } = require('./controllers/sortFilterController');

const router = express.Router();

router.post('/uploads', upload.single('file'), uploadFile);
router.get('/sort-filter', retrieveFilterOptions);
router.post('/sort-filter', insertFilterOption);

module.exports = router;