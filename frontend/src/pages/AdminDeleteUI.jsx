import { useState } from 'react';
import QuestionsOrSolutionsComponent from '../components/AdminUIComponents/QuestionsOrSolutionsComponent';
import SortFilter from '../components/SortFilter/SortFilter';
import { sendDeleteData } from '../services/adminServices';

const AdminDeleteUI = () => {
    const [selectedFilters, setSelectedFilters] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendDeleteData(JSON.stringify(selectedFilters));
            alert("File delete successful");
            setSelectedFilters(null); //make QuestionsOrSolutionComponent disappear
        } catch (error) {
            alert("File delete error");
        }
    };

    return(
        <div>
            <SortFilter setSelectedFilters={setSelectedFilters}/>
            {selectedFilters && (
                <div>
                    <QuestionsOrSolutionsComponent 
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                    <button onClick={handleSubmit}>Delete file</button>
                </div>
            )}
        </div>
    );
};

export default AdminDeleteUI;