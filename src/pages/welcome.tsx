type Props = {
  onSelect: (view: "import" | "search") => void;
};

function Welcome({ onSelect }: Props) {
  return (
    <section>
      <h1>Welcome to the Anagram App</h1>
      <button onClick={() => onSelect("import")}>Import Wordbase</button>
      <br /><br />
      <button onClick={() => onSelect("search")}>Search for Anagrams</button>
    </section>
  );
}

export default Welcome;
