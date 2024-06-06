import { useEffect, useState } from 'react';

export const SearchBar = ({setFilter}) => {
    const [searchValue, setSearchValue] = useState('');

      // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    };

    const inputStyle = {
        width: '100%',
        maxWidth: '600px',
        padding: '10px 20px',
        border: '2px solid #ddd',
        borderRadius: '25px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
    };

    const inputFocusStyle = {
        borderColor: '#007bff',
        boxShadow: '0 0 8px rgba(0, 123, 255, 0.3)',
    };

      // Combine styles for focused state
    const [isFocused, setIsFocused] = useState(false);
    const combinedInputStyle = isFocused
    ? { ...inputStyle, ...inputFocusStyle }
    : inputStyle;

    useEffect(() => { setFilter(searchValue); }, [searchValue]);

    return (
        <div style={containerStyle}>
        <input
          type="text"
          style={combinedInputStyle}
          placeholder="Search for a dining hall..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    )
}