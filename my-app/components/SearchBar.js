"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const debounceRef = useRef(null);

  const handleSearch = (name) => {
    const searchName = name || username;
    if (searchName.trim() === "") return;
    setSuggestions([]);
    router.push(`/user/${searchName}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (username.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${username}&per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setSuggestions(data.items || []);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [username]);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={() => handleSearch()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {(suggestions.length > 0 || loading) && (
        <div className="absolute top-12 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
          {loading && (
            <p className="text-gray-400 text-sm px-4 py-2">Searching...</p>
          )}
          {suggestions.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSearch(user.login)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-gray-800 text-sm">{user.login}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}