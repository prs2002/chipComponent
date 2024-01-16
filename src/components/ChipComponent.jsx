import React, { useState, useRef, useEffect } from 'react';
import './ChipComponent.css';
import jsonData from './data.json';

const ChipComponent = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = jsonData.map((item) => ({
    id: item.id,
    label: item.first_name, 
    email: item.email,
    image: item.image,
  }));

  useEffect(() => {
    let isFirstBackspace = true;
    const handleBackspace = (event) => {
      if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
        if(chips.length === 1 && isFirstBackspace){
            alert(`Press again to delete the last chip : ${chips[chips.length - 1].label}`);
            isFirstBackspace = false;
            return;
        }
        handleRemoveChip(chips[chips.length - 1]);
      }
    };

    document.addEventListener('keydown', handleBackspace);

    return () => {
      document.removeEventListener('keydown', handleBackspace);
    };
  }, [inputValue, chips]);

  const filterItems = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowercasedValue) &&
        !chips.some((chip) => chip.id === item.id)
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue('');
    setFilteredItems([]);
  };

  const handleRemoveChip = (chipToRemove) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipToRemove.id));
    setFilteredItems((prevItems) => [...prevItems, chipToRemove]);
    
  };

  const handleSearchBarClick = () => {
    filterItems(inputValue);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!inputRef.current.contains(event.target)) {
        setFilteredItems([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            <img src={chip.image} alt={chip.label} className="chip-image" />
            {chip.label}
            <span className="remove-icon" onClick={() => handleRemoveChip(chip)}>
              X
            </span>
          </div>
        ))}
        
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleSearchBarClick}
        className="chip-input"
        placeholder="Add new users..."
      />
      {filteredItems.length > 0 && (
        <ul className="item-list">
          {filteredItems.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              <img src={item.image} alt={item.label} className="chip-image" />
              {item.label}
              <span className="email">{item.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipComponent;