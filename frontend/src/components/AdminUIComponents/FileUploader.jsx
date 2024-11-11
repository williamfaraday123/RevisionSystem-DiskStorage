import { useEffect } from 'react';

const FileUploader = ({ selectedFilters, setSelectedFilters, setFile }) => {
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const QuestionsOrSolutions = {
        filter: "QuestionsOrSolutions",
        options: ["Questions", "Solutions"]
    };

   useEffect(() => {
        if (!selectedFilters.hasOwnProperty(QuestionsOrSolutions.filter)) {
            setSelectedFilters((prevFilterOptions) => ({
                ...prevFilterOptions,
                [QuestionsOrSolutions.filter]: "Questions" //default value
            }));
        }
    }, [selectedFilters, setSelectedFilters]);
    
    const handleQuestionsOrSolutionsChange = (e) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [QuestionsOrSolutions.filter]: e.target.value
        }));
    };

    return(
        <div>
            {(selectedFilters["type"] == "Past Year Papers" || selectedFilters["type"] == "Tutorial") && (
                <div>
                    <label>{QuestionsOrSolutions.filter}</label>
                    <select value={selectedFilters[QuestionsOrSolutions.filter]} onChange={(e) => handleQuestionsOrSolutionsChange(e)}>
                        {QuestionsOrSolutions.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default FileUploader;