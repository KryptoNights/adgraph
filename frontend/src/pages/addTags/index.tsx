import React, { useState } from "react";

const Chip = ({ chip, onDelete }: { chip: any; onDelete: any }) => (
  <div className="chip">
    {chip}
    <span className="closebtn" onClick={() => onDelete(chip)}>
      &times;
    </span>
  </div>
);

const ChipInput = ({ chips, setChips }: { chips: any; setChips: any }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (inputValue.trim() && !chips.includes(inputValue.trim())) {
        setChips([...chips, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete: any) => {
    setChips(chips.filter((chip: any) => chip !== chipToDelete));
  };

  return (
    <div className="chip-input">
      {chips.map((chip: any) => (
        <Chip key={chip} chip={chip} onDelete={handleDeleteChip} />
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter or Space"
      />
    </div>
  );
};

const index = () => {
  const [chips, setChips] = useState([]);
  const [appName, setAppName] = useState("");

  const handleAppNameChange = (event: any) => {
    setAppName(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Application Name:", appName);
    console.log("Chips:", chips);
  };

  return (
    <div className="container">
      <div className="app-name">
        <label htmlFor="app-name">Application Name:</label>
        <input
          type="text"
          id="app-name"
          value={appName}
          onChange={handleAppNameChange}
        />
      </div>
      <div className="chips-section">
        <ChipInput chips={chips} setChips={setChips} />
      </div>
      <div className="submit-section">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default index;
