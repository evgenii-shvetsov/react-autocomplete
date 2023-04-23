import { useState } from "react";
import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = () => {};

  const handleSuggestionsClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };
  return (
    <div>
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

export default Autocomplete;
