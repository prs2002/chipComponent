import React, { useState, useRef, useEffect } from 'react';
import './ChipComponent.css';

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = [
    'John Doe',
    'John Cena',
    'Dani Daniels',
    'Nick Giannopoulos',
    'Nicky Dandelion',
    'Alice Smith',
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter items excluding those already selected as chips
    setFilteredItems(items.filter((item) => 
      !chips.some((chip) => chip.label.toLowerCase() === item.toLowerCase())
        && item.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const handleItemClick = (item) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue('');
    setFilteredItems(filteredItems.filter((filteredItem) => filteredItem !== item));
  };

  const handleRemoveChip = (chipId) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipId));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      inputRef.current?.blur();
      const lastChip = chips[chips.length - 1];
      alert(`Selected chip: ${lastChip.label}`);
      handleRemoveChip(lastChip.id);

      // Remove the last chip from the filtered items
      setFilteredItems((prevFilteredItems) => [
        ...prevFilteredItems,
        lastChip.label,
      ]);
    }
  };

  useEffect(() => {
    if (inputValue === '' && filteredItems.length === 0 && chips.length > 0) {
      handleRemoveChip(chips[chips.length - 1].id);
    }
  }, [inputValue, filteredItems, chips]);

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            {chip.label}
            <span className="remove-icon" onClick={() => handleRemoveChip(chip.id)}>
              x
            </span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type here..."
      />
      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChipComponent;