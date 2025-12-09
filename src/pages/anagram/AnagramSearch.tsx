import { useState } from "react";

const SEARCH_ENDPOINT = "https://anagram-finder.onrender.com/api/anagrams";

function AnagramSearch() {
  const [word, setWord] = useState("");
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const findAnagrams = async () => {
    let resultMessage = "";
    setAnagrams([]);
    setMessage("");

    if (!word.trim()) {
      alert("Input field is empty!");
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(SEARCH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error ?? "Failed to fetch anagrams.");
        return;
      }
      console.log(data);

      const results: string[] = data.anagrams ?? [];

      if (results.length) {
        setAnagrams(results);
        resultMessage = "Found anagrams!";
      } else {
        resultMessage = "No results found!";
      }

      setMessage(resultMessage);
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      if (resultMessage) {
        alert(resultMessage);
      }
      setIsSearching(false);
    }
  };

  return (
    <div>
      <h2>Find anagrams</h2>
      <p>Enter a word and the app queries the anagram API for matches.</p>

      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        disabled={isSearching}
        type="text"
        placeholder="Enter a word"
      />

      <button onClick={findAnagrams} disabled={isSearching}>
        {isSearching ? "Searching..." : "Find anagrams"}
      </button>

      {message && <p>{message}</p>}

      {anagrams.length > 0 && (
        <ul>
          {anagrams.map((anagram) => (
            <li key={anagram}>{anagram}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnagramSearch;
