import React, { useState, ChangeEvent } from 'react';

interface DropdownProps {
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState('idle');

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="controls">
      <label htmlFor="animations">Choose animation:</label>
      <select id="animations" name="animations" value={selectedValue} onChange={handleDropdownChange}>
        <option value="idle">Idle</option>
        <option value="jump">Jump</option>
        <option value="fall">Fall</option>
      </select>
    </div>
  );
};
