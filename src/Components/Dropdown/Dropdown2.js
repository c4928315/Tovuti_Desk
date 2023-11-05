import React, { useState } from "react";

function CustomDropdown({
  options,
  selectedValue,
  onSelect,
  placeholder,
  searchPlaceholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
