"use client";
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={handleChange}
          className="w-full pl-12 pr-10 py-2 border border-beige rounded-full bg-black text-beige focus:outline-none"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beige">
          <FaSearch />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}
