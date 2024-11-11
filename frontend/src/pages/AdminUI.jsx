import { useState } from 'react';

import FileUploader from '../components/AdminUIComponents/FileUploader';
import SortFilter from "../components/SortFilter/SortFilter";

const AdminUI = () => {
    const [selectedFilters, setSelectedFilters] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('filters', selectedFilters);
        formData.append('file', file);

        try {
            await sendUploadData(formData);
            alert("File upload successful");
        } catch (error) {
            alert("File upload error");
        }
        
    };
    return(
        <form onSubmit = {handleSubmit}>
            <SortFilter setSelectedFilters={setSelectedFilters} />
            {selectedFilters && (
                <div>
                    <FileUploader
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        setFile={setFile}
                    />
                    <button key="submit" type="submit">Upload</button>
                </div>
            )}
        </form>
    );
};

export default AdminUI;