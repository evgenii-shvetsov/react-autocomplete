![autocomplete-demo](https://user-images.githubusercontent.com/46214277/235007130-fe404cee-4fb2-4893-a0b4-6e9190601812.gif)


## Overview

**React Autocomplete component built with the Trie data structure** <br /> 

[Autocomplete Demo](https://autocomplete-trie.netlify.app/)

✅ Pros:

1. Elegant Design: Trie's tree-like structure simplifies visualizing and understanding how words with shared prefixes are stored, which facilitated the implementation process.
2. Efficient Prefix-Based Searches: Trie's ability to perform prefix-based searches in O(L) time complexity, where L is the length of the input string, made it ideal for the autocomplete app.

⁉️ Cons:

1. Memory Overhead: Trie consumes more memory compared to other data structures like hash tables, especially when dealing with large datasets and numerous unique characters.
2. Optimization Required for Large Datasets: Handling large datasets might require implementing optimization techniques, such as lazy-loading or compressing the Trie, to reduce memory usage and improve performance. Inserting 300K words in the Trie, didn’t go smoothly, so I had to impose some restrictions for the demo purposes.


#### Trie data structure
```javascript

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    insert(word){
        let currentNode = this.root;
        for(let char of word){
            if(!currentNode.children[char]){
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    _searchPrefix(prefix){
        let currentNode = this.root;
        for(let char of prefix){
            if(!currentNode.children[char]){
                return null;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode;
    }

    search(word){
        const node = this._searchPrefix(word);
        return node !== null && node.isEndOfWord;
    }

    startsWith(prefix){
        return this._searchPrefix(prefix) !== null;
    }

    autoComplete(prefix){
        const results = [];
        const node = this._searchPrefix(prefix);
        if(node === null) return results;

        const traverse = (node, path) =>{
            if(node.isEndOfWord) results.push(prefix + path);
            for(const char in node.children){
                traverse(node.children[char], path + char);
            }
        }

        traverse(node, '');
        return results;
    }


}

export default Trie;
```








