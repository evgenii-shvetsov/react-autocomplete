import { useState } from "react";
import "./Instructions.css";

const Instructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const toggleInfoBlock = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="instructions-wrapper">
      <h3 onClick={toggleInfoBlock}>
        Intro <span id="lamp">💡</span>
      </h3>
      {isOpen && (
        <>
          <div className="overlay" onClick={handleClickOutside}></div>
          <div className="info-block">
            <p>
              &nbsp; &nbsp; In this project, I constructed an Autocomplete
              Component by combining the power of React and the Trie data
              structure. 📚
              <strong>Trie</strong> (also known as a prefix tree and pronounced
              as “try”) is a tree-like data structure that efficiently stores a
              dynamic set of strings.
            </p>{" "}
            <br />
            <p>
              &nbsp;For Demo purposes, I used 78 words, three words per each letter in the English Alphabet. For more info, please check my GitHub.
            </p>{" "}
            <br />
            <div className="trie-words-block">
              <strong> This are the words in the Trie:</strong> <br />
              <p id="words-object">
                a: ["algorithm", "application", "artificial"] <br />
                b: ["backup", "binary", "browser"] <br />
                c: ["compiler", "code", "cybersecurity"] <br />
                d: ["data", "debugging", "desktop"] <br />
                e: ["encryption", "ethernet", "email"] <br />
                f: ["firewall", "firmware", "file"] <br />
                g: ["gui", "gaming", "gigabyte"] <br />
                h: ["hacker", "harddrive", "html"] <br />
                i: ["input", "interface", "internet"] <br />
                j: ["java", "javascript", "jpeg"] <br />
                k: ["kernel", "keyboard", "kilobyte"] <br />
                l: ["laptop", "linux", "logic"] <br />
                m: ["monitor", "motherboard", "mouse"] <br />
                n: ["network", "node", "notebook"] <br />
                o: ["object", "optical", "output"] <br />
                p: ["password", "processor", "protocol"] <br />
                q: ["query", "quicktime", "quantum"] <br />
                r: ["ram", "router", "robotics"] <br />
                s: ["software", "server", "storage"] <br />
                t: ["trojan", "terminal", "tablet"] <br />
                u: ["uniform", "universals", "unix"] <br />
                v: ["virus", "virtualization", "video"] <br />
                w: ["website", "windows", "wifi"] <br />
                x: ["xbox", "xml", "xerox"] <br />
                y: ["yaml", "yottabyte","youtube"] <br />
                z: ["zip", "zettabyte", "zoom"]
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Instructions;
