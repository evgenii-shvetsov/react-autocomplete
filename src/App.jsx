import "./App.css";
import Trie from "./Components/Trie/Trie";
import Autocomplete from "./Components/Autocomplete/Autocomplete";
import Header from "./Components/Header/Header";
import wordsData from "./Components/wordsData";
import Instructions from "./Components/Instructions/Instructions";
import Footer from "./Components/Footer/Footer";

function App() {
  const trie = new Trie();
  
  for (let word of wordsData) {
    trie.insert(word);
  }

  return (
    <div className="App">
      <Footer />
      <Instructions />
      <Header />
      <Autocomplete trie={trie} />
      
    </div>
  );
}

export default App;
