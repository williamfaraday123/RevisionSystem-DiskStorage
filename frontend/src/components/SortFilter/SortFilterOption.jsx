import { useState } from 'react';
import SortFilterInsert from "./SortFilterInsert";

const SortFilterOption = ({ filter, options, onSelectOption, onNewOptionAdded }) => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = async (e) => {
        e.preventDefault();
        setVisible((prevVisibility) => !prevVisibility);
    };
    return(
        <div>
            <div>{filter}</div>
            <select
                onChange = {(e) => onSelectOption(e)}
            >
                {options.map((option, index) => (
                    <option
                        key = {index}
                        value = {option}
                    >{option}</option>
                ))}
            </select>
            <button onClick = {toggleVisibility}>Add new option for {filter}</button>
            {visible && (
                <SortFilterInsert 
                    filter = {filter} 
                    onNewOptionAdded = {onNewOptionAdded} 
                />)}
        </div>
    );
};

export default SortFilterOption;