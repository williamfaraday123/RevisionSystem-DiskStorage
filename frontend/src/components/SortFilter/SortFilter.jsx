import { useEffect, useState } from 'react';

import { retrieveFilterOptionsData } from '../../services/sortFilterServices';
import SortFilterOption from './SortFilterOption';

const SortFilter = ({ setSelectedFilters }) => {
    const filters = ["course_code", "type", "year", "semester", "chapter"];
    const [filterOptions, setFilterOptions] = useState(() => {
        let initialFilterOptions = {};
        filters.forEach((filter) => {
            initialFilterOptions[filter] = '';
        });
        return initialFilterOptions;
    });
    const [newOptionAdded, setNewOptionAdded] = useState(false);
    const [SortFilterOptionsJSON, setSortFilterOptionsJSON] = useState(null);
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const data = await retrieveFilterOptionsData(filters);
                setSortFilterOptionsJSON(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFilterOptions();
    }, [newOptionAdded]);
    const handleNewOptionAdded = () => {
        setNewOptionAdded(prevState => !prevState); //toggle the state to render the useEffect above whenever new option is added
    };

    const handleSelectOption = (e, filter) => {
        setFilterOptions((prevFilterOptions) => ({
            ...prevFilterOptions,
            [filter]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSelectedFilters(filterOptions);
    };

    return(
        <div>
            {SortFilterOptionsJSON?.map((SortFilterOptionJSON, index) => (
                <SortFilterOption 
                    key = {index}
                    filter = {SortFilterOptionJSON.filter}
                    options = {SortFilterOptionJSON.options}
                    onSelectOption = {(e) => handleSelectOption(e, SortFilterOptionJSON.filter)}
                    onNewOptionAdded = {handleNewOptionAdded}
                />
            ))}
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    );
};

export default SortFilter;