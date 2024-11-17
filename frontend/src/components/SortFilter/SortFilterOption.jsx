import { useState } from 'react';
import SortFilterInsert from "./SortFilterInsert";

const SortFilterOption = ({ filter, options, onSelectOption, onOptionModified }) => {
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
            {filter != 'type' && ( //don't allow add/delete option for 'type' as the code rely on absolute path for files with different 'type'
                <>
                    <button onClick = {toggleVisibility}>Add/Delete new option for {filter}</button>
                    {visible && (
                        <SortFilterInsert 
                            filter = {filter} 
                            onOptionModified = {onOptionModified} 
                        />)}
                </>
            )}
        </div>
    );
};

export default SortFilterOption;