import axios from 'axios';

export const sendUploadData = async (formData) => {
    try {
        await axios.post('/api/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.error("file upload error: ", error);
        throw error;
    }
};