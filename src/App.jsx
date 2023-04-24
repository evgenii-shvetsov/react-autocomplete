import "./App.css";
import Trie from "./Components/Trie/Trie";
import Autocomplete from "./Components/Autocomplete/Autocomplete";
import Header from "./Components/Header/Header";

function App() {
  const trie = new Trie();
  
  let words = ["apple", "app", "apricot", "banana", "cherry", "grape", "mango"];

  for (let word of words) {
    trie.insert(word);
  }

  return (
    <div className="App">
      <Header />
      <Autocomplete trie={trie} />
    </div>
  );
}

export default App;
