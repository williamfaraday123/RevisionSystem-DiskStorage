import { useState } from 'react';
import { modifyFilterOptions } from '../../services/sortFilterServices';
const SortFilterInsert = ({ filter, onOptionModified }) => {
    const [newOption, setNewOption] = useState('');
    const handleChange = (e) => {
        setNewOption(e.target.value);
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            console.log('sending', { filter, option: newOption, action: "insert" }); //check error
            await modifyFilterOptions({ filter, option: newOption, action: "insert" });
            alert(`Added new option '${newOption}' for filter '${filter}'`);
            onOptionModified(); //toggle the state to rerender useEffect to fetch all filter options in SortFilter.jsx
        } catch (error) {
            alert('Insert filter option error');
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            console.log('sending', { filter, option: newOption, action: "delete" }); //check error
            await modifyFilterOptions({ filter, option: newOption, action: "delete" });
            alert(`Removed option '${newOption}' for filter '${filter}'`);
            onOptionModified(); //toggle the state to rerender useEffect to fetch all filter options in SortFilter.jsx
        } catch (error) {
            alert('Delete filter option error');
        }
    };
    return(
        <div>
            <div>{filter}</div>
            <input value = {newOption} onChange = {handleChange} />
            <button onClick = {handleInsert}>+</button>
            <button onClick = {handleDelete}>-</button>
        </div>
    );
};

export default SortFilterInsert;