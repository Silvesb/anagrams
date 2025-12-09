import { useState } from "react";

function WordbaseSubmit() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wordBaseEndpoint = "https://wordbase-importer.onrender.com/api/wordbase/submit";

  const submitWordbase = async () => {
    setMessage("");

    if (!url) {
        alert("No URL submitted");
        return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(wordBaseEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url: url}),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.error);
            return;
        }
        setMessage(data.message);

        } catch (err) {
            console.log(err);
            setMessage("Import failed");
        } finally {
            alert(message || "Import was successful");
            setIsSubmitting(false);
        }
    };

  return (
    <div>
      <h2>Import wordbase</h2>
        <p>
            Enter a URL containing a wordbase
            <br /><br />
            example urls:
            <br />
            https://www.opus.ee/lemmad2013.txt
            <br />
            https://gist.githubusercontent.com/Sjord/5e8f06c3734c1a1129c729c4d28a07e7/raw/35163117f81ede219644dcb143e6eab7b9ab207c/wordlist.txt
        </p>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isSubmitting}
        placeholder="http://example.com/something.txt"
      />
      <button onClick={submitWordbase} disabled={isSubmitting}>
        {isSubmitting ? "Importing..." : "Submit"}
      </button>

      {<p>{message}</p>}
    </div>
  );
}

export default WordbaseSubmit;
