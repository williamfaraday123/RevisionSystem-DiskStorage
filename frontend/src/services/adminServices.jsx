import axios from 'axios';

// Add a request interceptor to log the request
axios.interceptors.request.use((request) => {
    console.log('Request Data:', request.data); // Logs the form data
    return request;
}, (error) => {
    return Promise.reject(error);
});

export const sendUploadData = async (formData) => {
    try {
        //check error
        // Log the form data (filters and file)
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        await axios.post('http://localhost:8000/api/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.error("file upload error: ", error);
        throw error;
    }
};