import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

function AnagramSearch() {
    const [word, setWord] = useState("");
    const [anagrams, setAnagrams] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const findAnagrams = async () => {
        let resultMessage = "";

        if (anagrams) {
            setAnagrams([]);
        }

        if (!word) {
            alert("Input field is empty!");
            return;
        }
        setIsSearching(true);

        try {
            const response = await fetch("/api/anagrams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ word }),
            });
            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }
            const results: string[] = (data.anagrams ?? []);

            console.log(data.anagrams);
            if (data.anagrams[0] != null) {
                setAnagrams(results);
                resultMessage = "Found anagrams!";
            } else {
                resultMessage = "No results found!";
            }
            setMessage(resultMessage);
        } catch (err) {
            console.log(err);
            alert(err);
        } finally {
            if (resultMessage) {
                alert(resultMessage);
            }
            setIsSearching(false);
        }
    };

    return (
        <>
            <Head title="Find Anagrams" />
            <div className="container">
                <div>
                    <h1>Find Anagrams</h1>
                    <Link href="/">
                        Go back
                    </Link>
                </div>
                <br />
                <p>
                    Enter a collection of letters and the program will find a
                    suitable (set of) anagram(s)
                </p>
                <h4>Enter a word:</h4>
                <input
                    className="form-control"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    disabled={isSearching}
                    type="text"
                />
                <br />
                <button
                    className="btn btn-primary"
                    onClick={findAnagrams}
                    disabled={isSearching}
                >
                    {isSearching ? "Searching..." : "Find anagrams"}
                </button>

                <br />
                <div className="container border">
                    <ul>
                        {anagrams.map((anagram) => (
                            <li key={anagram}>
                                {anagram}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AnagramSearch;
