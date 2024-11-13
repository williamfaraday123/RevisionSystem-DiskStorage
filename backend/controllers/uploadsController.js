const uploadFile = async (req, res) => {
    try {
        res.send(`File uploaded successfully: ${req.file.path}`);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

module.exports = {
    uploadFile
};