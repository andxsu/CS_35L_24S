import { useEffect, useState } from 'react';

export const SearchBar = ({setFilter}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => { setFilter(searchValue); }, [searchValue]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
}