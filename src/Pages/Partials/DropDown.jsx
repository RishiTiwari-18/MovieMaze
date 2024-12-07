import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropDown = ({ title, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-between w-32 rounded-md px-4 py-2 bg-[#2c2f33] text-sm font-medium text-white hover:bg-[#3a3e42] focus:outline-none"
        >
          {title}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute overflow-hidden z-10 mt-2 w-32 rounded-md shadow-lg bg-[#2c2f33] ring-1 ring-black ring-opacity-5">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <Link
                key={index}
                className="block px-4 py-2 text-sm text-white hover:bg-[#36393d]"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
