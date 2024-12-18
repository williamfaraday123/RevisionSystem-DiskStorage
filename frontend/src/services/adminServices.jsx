import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

        await axios.post(`${backendUrl}/api/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.error("file upload error: ", error);
        throw error;
    }
};

export const sendDeleteData = async (filters) => {
    try {
        await axios.post(`${backendUrl}/api//delete-file`, { filters }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error("file delete error", error);
        throw error;
    }
}