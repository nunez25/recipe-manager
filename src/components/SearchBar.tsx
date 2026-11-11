import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="join w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search TheMealDB — try chicken, pasta, beef..."
        className="input input-bordered join-item w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary join-item">
        Search
      </button>
    </form>
  );
}
