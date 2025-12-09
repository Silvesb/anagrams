import { useState } from "react";

const IMPORT_ENDPOINT = "https://wordbase-importer.onrender.com/api/wordbase/submit";

function WordbaseSubmit() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitWordbase = async () => {
    setMessage("");

    if (!url) {
        alert("No URL submitted");
        return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(IMPORT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: url.trim() }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.error ?? "Failed to import wordbase.");
            return;
        }
        setMessage(data.message);

        } catch (err) {
            console.log(err);
            setMessage("import failed");
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
        placeholder="https://www.opus.ee/lemmad2013.txt"
      />
      <button onClick={submitWordbase} disabled={isSubmitting}>
        {isSubmitting ? "Importing..." : "Submit"}
      </button>

      {<p>{message}</p>}
    </div>
  );
}

export default WordbaseSubmit;
