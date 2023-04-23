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