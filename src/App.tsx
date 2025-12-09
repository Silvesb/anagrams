import { useState } from "react";
import Welcome from "./pages/welcome";
import WordbaseSubmit from "./pages/wordbase/WordbaseSubmit";
import AnagramSearch from "./pages/anagram/AnagramSearch";

type View = "welcome" | "import" | "search";

function App() {
  const [view, setView] = useState<View>("welcome");

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      {view === "welcome" && <Welcome onSelect={setView} />}

      {view === "import" && (
        <div>
          <button onClick={() => setView("welcome")}>Back to home</button>
          <WordbaseSubmit />
        </div>
      )}

      {view === "search" && (
        <div>
          <button onClick={() => setView("welcome")}>Back to home</button>
          <AnagramSearch />
        </div>
      )}
    </div>
  );
}

export default App;
