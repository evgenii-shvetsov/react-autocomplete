import "./App.css";
import Trie from "./Components/Trie/Trie";
import Autocomplete from "./Components/Autocomplete/Autocomplete";

function App() {
  const trie = new Trie();
  
  let words = ["apple", "app", "apricot", "banana", "cherry", "grape", "mango"];

  for (let word of words) {
    trie.insert(word);
  }

  return (
    <div className="App">
      <h1>Autocomplete with Trie and React</h1>
      <Autocomplete trie={trie} />
    </div>
  );
}

export default App;
