import { useState } from 'react';

import MainDisplay from '../components/UserUIComponents/MainDisplay/MainDisplay';
import SortFilter from '../components/SortFilter/SortFilter';

const UserUI = () => {
    const [selectedFilters, setSelectedFilters] = useState(null);
    return(
        <div>
            <SortFilter setSelectedFilters = {setSelectedFilters} />
            <MainDisplay selectedFilters = {selectedFilters} />
        </div>
    );
};

export default UserUI;