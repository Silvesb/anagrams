type Props = {
  onSelect: (view: "import" | "search") => void;
};

function Welcome({ onSelect }: Props) {
  return (
    <section>
      <h1>Welcome to the Anagram Toolkit</h1>
      <p>Choose what you want to do:</p>
      <button onClick={() => onSelect("import")}>Import Wordbase</button>
      <button onClick={() => onSelect("search")} style={{ marginLeft: "0.75rem" }}>
        Find Anagrams
      </button>
    </section>
  );
}

export default Welcome;
