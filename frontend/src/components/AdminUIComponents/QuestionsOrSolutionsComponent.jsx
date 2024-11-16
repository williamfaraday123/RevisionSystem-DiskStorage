import { useEffect } from 'react';

const QuestionsOrSolutionsComponent = ({ selectedFilters, setSelectedFilters }) => {
    const QuestionsOrSolutions = {
        filter: "QuestionsOrSolutions",
        options: ["Questions", "Solutions"]
    };
    useEffect(() => {
        if (!selectedFilters.hasOwnProperty(QuestionsOrSolutions.filter)) {
            setSelectedFilters((prevFilterOptions) => ({
                ...prevFilterOptions,
                [QuestionsOrSolutions.filter]: QuestionsOrSolutions.options[0]
            }));
        }
    }, [selectedFilters, setSelectedFilters]);

    const handleQuestionsOrSolutionsChange = async (e) => {
        setSelectedFilters((prevFilterOptions) => ({
            ...prevFilterOptions,
            [QuestionsOrSolutions.filter]: e.target.value
        }));
    };

    return(
        <div>
            {(selectedFilters["type"] == "Tutorial" || selectedFilters["type"] == "Past Year Papers") && (
                <div>
                    <label>{QuestionsOrSolutions.filter}</label>
                    <select value={selectedFilters[QuestionsOrSolutions.filter]} onChange={handleQuestionsOrSolutionsChange}>
                        {QuestionsOrSolutions?.options?.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default QuestionsOrSolutionsComponent;