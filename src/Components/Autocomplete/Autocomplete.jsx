import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Trie from "../Trie/Trie";

import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tempInputValue, setTempInputValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputError, setInputError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const resetInput = () => {
    setInputValue("");
    setTempInputValue("");
    setInputError("Word not found");
  };

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setTempInputValue(newInputValue);
    setTyping(true);

    if (newInputValue) {
      const newSuggestions = trie.autoComplete(newInputValue);
      setSuggestions(newSuggestions);

      if (newSuggestions.length > 0) {
        setInputError("");
      }
    } else {
      setSuggestions([]);
      setInputError("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tempInputValue && suggestions.length === 0 && !typing) {
        resetInput();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [tempInputValue, suggestions, typing]);

  useEffect(() => {
    if (typing) {
      const timer = setTimeout(() => {
        setTyping(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [typing]);

  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => {
        setInputError("");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [inputError]);

  const handleSuggestionsClick = (suggestion) => {
    if (!selectedWords.includes(suggestion)) {
      setSelectedWords([...selectedWords, suggestion]);
      setInputValue("");
      setTempInputValue("");
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
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

  const handleDeleteClick = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setSelectedWords([
        ...selectedWords.slice(0, index),
        ...selectedWords.slice(index + 1),
      ]);
      setDeletingIndex(null);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  };

  return (
    <div className="autocomplete-container">
      <div className={`input-wrapper ${isSelected ? "selected" : ""}`}>
        {selectedWords.map((selectedWord, index) => (
          <div
            key={index}
            className={`selected-word-box${
              deletingIndex === index ? " fade-out" : ""
            }`}
          >
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
            value={inputValue || tempInputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={inputError ? inputError : "Start typing..."}
            ref={inputRef}
            className={`autocomplete-input ${inputError ? "error" : ""}`}
          />
        )}
      </div>

      <ul
        className={`suggestions-dropdown ${
          suggestions.length > 0 ? "open" : ""
        }`}
      >
        {suggestions.map((suggestion, index) => {
          const isActive = index === activeSuggestionIndex;
          const isDisabled = selectedWords.includes(suggestion);
          return (
            <li
              className={`${isActive ? "active" : ""} ${
                isDisabled ? "disabled" : ""
              }`}
              key={index}
              onClick={() => !isDisabled && handleSuggestionsClick(suggestion)}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// removes error from ESlint
Autocomplete.propTypes = {
  trie: PropTypes.instanceOf(Trie).isRequired,
};

export default Autocomplete;
