import "./App.css";
import Trie from "./Components/Trie/Trie";
import Autocomplete from "./Components/Autocomplete/Autocomplete";
import Header from "./Components/Header/Header";
import wordsData from "./Components/wordsData";

function App() {
  const trie = new Trie();
  
  for (let word of wordsData) {
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
