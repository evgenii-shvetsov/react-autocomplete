import { useState } from "react";
import PropTypes from "prop-types";
import Trie from "../Trie/Trie";
import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
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

  
  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <ul className="suggestions-dropdown">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionsClick(suggestion)}>
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
