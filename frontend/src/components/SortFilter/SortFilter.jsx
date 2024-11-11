import { useState } from 'react';

import SortFilterOption from './SortFilterOption';
import SortFilterOptionsJSON from './SortFilterOptions.json';

const SortFilter = ({ setSelectedFilters }) => {
    const [filterOptions, setFilterOptions] = useState(() => {
        let initialFilterOptions = {};
        SortFilterOptionsJSON.forEach((SortFilterOptionJSON) => {
            initialFilterOptions[SortFilterOptionJSON.filter] = '';
        });
        return initialFilterOptions;
    });

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
            {SortFilterOptionsJSON.map((SortFilterOptionJSON, index) => (
                <SortFilterOption 
                    key = {index}
                    filter = {SortFilterOptionJSON.filter}
                    options = {SortFilterOptionJSON.options}
                    onSelectOption = {(e) => handleSelectOption(e, SortFilterOptionJSON.filter)}
                />
            ))}
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    );
};

export default SortFilter;