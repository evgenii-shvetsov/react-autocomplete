import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Trie from "../Trie/Trie";

import "./Autocomplete.css";

const Autocomplete = ({ trie }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tempInputValue, setTempInputValue] = useState("");

  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputError, setInputError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const [inputPadding, setInputPadding] = useState(0);

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

    if (hoveredSuggestion) {
      setHoveredSuggestion("");
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
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [inputError]);

  useEffect(() => {
    let totalWidth = 0;
    const boxes = document.querySelectorAll(".selected-word-box");
    boxes.forEach((box) => {
      totalWidth += box.offsetWidth;
    });
    setInputPadding(selectedWords.length > 0 ? totalWidth + 50 : 20); 
  }, [selectedWords]);

  const handleSuggestionsClick = (suggestion) => {
    if (!selectedWords.includes(suggestion)) {
      setSelectedWords([...selectedWords, suggestion]);
      setInputValue("");
      setTempInputValue("");
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
    setHoveredSuggestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) => {
        const newIndex =
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex;
        setHoveredSuggestion(suggestions[newIndex]);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
        setHoveredSuggestion(suggestions[newIndex]);
        return newIndex;
      });
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex > -1) {
        handleSuggestionsClick(suggestions[activeSuggestionIndex]);
        e.preventDefault();
      }
    }
  };

  const isSelected = inputValue !== "" && !suggestions.length;
  const inputRef = useRef(null);

const handleDeleteClick = (index, e) => {
  e.stopPropagation();
  setDeletingIndex(index);
  setTimeout(() => {
    setSelectedWords([
      ...selectedWords.slice(0, index),
      ...selectedWords.slice(index + 1),
    ]);
    setDeletingIndex(null);
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, 500);
};

  return (
    <div className="autocomplete-container">
      <div className={`input-wrapper ${isSelected ? "selected" : ""}`}>
        <div className="input-content">
          <div
            className="selected-word-box-container"
            onClick={() => inputRef.current.focus()}
          >
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
                  onClick={(e) => handleDeleteClick(index, e)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          {selectedWords.length < 3 && (
            <input
              type="text"
              style={{ paddingLeft: inputPadding }}
              value={hoveredSuggestion || tempInputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={inputError ? inputError : "Start typing..."}
              ref={inputRef}
              // className={`autocomplete-input ${inputError ? "error" : ""}`}
              className="autocomplete-input"
            />
          )}
        </div>
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
              onMouseEnter={() => setHoveredSuggestion(suggestion)}
              onMouseLeave={() => setHoveredSuggestion("")}
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
