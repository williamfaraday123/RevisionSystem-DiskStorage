const express = require('express');

const upload = require('./middleware/uploadMiddleware');
const { uploadFile } = require('./controllers/uploadsController');
const { retrieveFilterOptions, modifyFilterOptions } = require('./controllers/sortFilterController');
const { getAllFromDatabase, displayDatabaseView } = require('./views/databaseView');

const router = express.Router();

router.post('/uploads', upload.single('file'), uploadFile);
router.get('/sort-filter', retrieveFilterOptions);
router.post('/sort-filter', modifyFilterOptions);
router.get('/views', getAllFromDatabase);
router.get('/views/database', displayDatabaseView);

module.exports = router;