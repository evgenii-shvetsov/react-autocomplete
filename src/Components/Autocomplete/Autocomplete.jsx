import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Trie from "../Trie/Trie";
import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveSuggestionIndex(-1);
    if (value.length > 0) {
      setSuggestions(trie.autoComplete(value));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionsClick = (suggestion) => {
    setSelectedWords([...selectedWords, suggestion]);
    setInputValue("");
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  };


const handleKeyDown = (e) => {
  if (e.key === "ArrowDown") {
    setActiveSuggestionIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  } else if (e.key === "ArrowUp") {
    setActiveSuggestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  } else if (e.key === "Enter") {
    if (activeSuggestionIndex > -1) {
      handleSuggestionsClick(suggestions[activeSuggestionIndex]);
      e.preventDefault();
    }
  }
};

  const isSelected = inputValue !== "" && !suggestions.length;
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      inputRef.current.focus();
    }
  }, [isSelected]);


const handleDeleteClick = (index) => {
  setSelectedWords([
    ...selectedWords.slice(0, index),
    ...selectedWords.slice(index + 1),
  ]);
  inputRef.current.focus();
};

  return (
    <div className="autocomplete-container">
      <div className={`input-wrapper ${isSelected ? "selected" : ""}`}>
        {selectedWords.map((selectedWord, index) => (
          <div key={index} className="selected-word-box">
            <span>{selectedWord}</span>
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(index)}
            >
              x
            </button>
          </div>
        ))}
        {selectedWords.length < 3 && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing..."
            ref={inputRef}
            className="autocomplete-input"
          />
        )}
      </div>

      <ul className="suggestions-dropdown">
        {suggestions.map((suggestion, index) => (
          <li
            className={index === activeSuggestionIndex ? "active" : ""}
            key={index}
            onClick={() => handleSuggestionsClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

// removes error from ESlint
Autocomplete.propTypes = {
  trie: PropTypes.instanceOf(Trie).isRequired,
};

export default Autocomplete;
