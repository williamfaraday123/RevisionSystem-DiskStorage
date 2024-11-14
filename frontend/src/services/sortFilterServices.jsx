import axios from 'axios';

export const modifyFilterOptions = async ({ filter, option, action }) => {
    try {
        const response = await axios.post('http://localhost:8000/api/sort-filter', {
            filter,
            option,
            action
        });
        return response;
    } catch (error) {
        console.error('Error inserting sort filter option in insertFilterOption()', error);
        throw error;
    }
};

export const retrieveFilterOptionsData = async (filters) => {
    try {
        const response = await axios.get('http://localhost:8000/api/sort-filter', { 
            params: { filters }
        });
        console.log('response:', response);
        return response.data;
    } catch (error) {
        console.error('Error retrieving sort filter options in retrieveFilterOptionsData()', error);
        throw error;
    }
};