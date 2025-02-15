"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed w-full z-10 top-0 backdrop-blur-md bg-black/70 text-beige">
      <div className="flex justify-between items-center py-4 px-6 md:px-8">
        <div className="text-2xl font-bold">
          <Link href="/">Course Manager</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
          {user ? (
            <>
              <Link href="/courses/create" className="hover:text-white transition-colors">Add Course</Link>
              <Link href="/courses/manage" className="hover:text-white transition-colors">Manage Courses</Link>
              <button onClick={logout} className="hover:text-white transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-white transition-colors">Signup</Link>
            </>
          )}
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden text-beige focus:outline-none"
        >
          {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 border-t border-beige shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
            <Link href="/courses" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Courses</Link>
            {user ? (
              <>
                <Link href="/courses/create" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Add Course</Link>
                <Link href="/courses/manage" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Manage Courses</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="hover:text-white transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Login</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Signup</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
