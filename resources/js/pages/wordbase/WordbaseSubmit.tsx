import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

function WordbaseSubmit() {
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitWordbase = async () => {
        if (!url) {
            alert("No URL submitted");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/wordbase/submit", {
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
        <>
            <Head title="Import Wordbase" />
            <div className="container">
                <div>
                    <h1>Import Wordbase</h1>
                    <Link href="/">
                        Go back
                    </Link>
                </div>

                <p>
                    Enter a URL containing a wordbase
                    <br /><br />
                    example urls:
                    <br />
                    https://www.opus.ee/lemmad2013.txt
                    <br />
                    https://gist.githubusercontent.com/Sjord/5e8f06c3734c1a1129c729c4d28a07e7/raw/35163117f81ede219644dcb143e6eab7b9ab207c/wordlist.txt
                </p>

                <label className="form-label">URL with wordbase</label>
                <input
                    className="form-control"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isSubmitting}
                />
                <br />
                <button
                    className="btn btn-primary"
                    onClick={submitWordbase}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Importing..." : "Submit"}
                </button>
            </div>
        </>
    );
}

export default WordbaseSubmit;
