const SortFilterOption = ({ filter, options, onSelectOption }) => {
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
        </div>
    );
};

export default SortFilterOption;