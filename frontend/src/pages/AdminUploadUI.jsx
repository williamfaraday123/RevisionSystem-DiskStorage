import { useState } from 'react';

import FileUploader from '../components/AdminUIComponents/FileUploader';
import QuestionsOrSolutionsComponent from '../components/AdminUIComponents/QuestionsOrSolutionsComponent';
import SortFilter from "../components/SortFilter/SortFilter";

import { sendUploadData } from '../services/adminServices';

const AdminUploadUI = () => {
    const [selectedFilters, setSelectedFilters] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('filters', JSON.stringify(selectedFilters));
        formData.append('file', file);

        try {
            await sendUploadData(formData);
            alert("File upload successful");
            setSelectedFilters(null); //to make FileUpload component disappear
        } catch (error) {
            alert("File upload error");
        }
    };
    return(
        <form onSubmit = {handleSubmit}>
            <SortFilter setSelectedFilters={setSelectedFilters} />
            {selectedFilters && (
                <div>
                    <QuestionsOrSolutionsComponent 
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                    <FileUploader
                        setFile={setFile}
                    />
                    <button key="submit" type="submit">Upload</button>
                </div>
            )}
        </form>
    );
};

export default AdminUploadUI;