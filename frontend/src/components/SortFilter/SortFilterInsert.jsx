import { useState } from 'react';
import { insertFilterOption } from '../../services/sortFilterServices';
const SortFilterInsert = ({ filter, onNewOptionAdded }) => {
    const [newOption, setNewOption] = useState('');
    const handleChange = (e) => {
        setNewOption(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('sending', { filter, option: newOption }); //check error
            await insertFilterOption({ filter, option: newOption });
            alert(`Added new option '${newOption}' for filter '${filter}'`);
            onNewOptionAdded(); //toggle the state to rerender useEffect to fetch all filter options
        } catch (error) {
            alert('Insert filter option error');
        }
    };
    return(
        <div>
            <div>{filter}</div>
            <input value = {newOption} onChange = {handleChange} />
            <button onClick = {handleSubmit}>+</button>
        </div>
    );
};

export default SortFilterInsert;