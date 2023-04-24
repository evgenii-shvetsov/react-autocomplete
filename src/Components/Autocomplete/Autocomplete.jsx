import { useState } from "react";
import PropTypes from "prop-types";
import Trie from "../Trie/Trie";
import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const isSelected = inputValue !== "" && !suggestions.length;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveSuggestionIndex(-1);
    if(value.length > 0){
        setSuggestions(trie.autoComplete(value));
    } else {
        setSuggestions([]);
    }
  };

  const handleSuggestionsClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === "Enter" && activeSuggestionIndex !== -1) {
      setInputValue(suggestions[activeSuggestionIndex]);
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  
  return (
    <div className="autocomplete-container">
      <input
        // className="autocomplete-input"
        className={`autocomplete-input ${isSelected ? "selected" : ""}`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Start typing..."
      />
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
