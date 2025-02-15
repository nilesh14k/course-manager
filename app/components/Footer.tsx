"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-beige text-center py-4 px-4">
      <p className="text-xs sm:text-sm md:text-base flex flex-wrap items-center justify-center space-x-2 sm:space-x-4">
        <span>Developed by Nilesh Kumar</span>
        <span className="hidden sm:inline">|</span>
        <Link href="https://github.com/nilesh14k" className="flex items-center text-beige hover:underline">
          <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span>Github</span>
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link href="https://www.linkedin.com/in/nileshkumar14" className="flex items-center text-beige hover:underline">
          <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span>LinkedIn</span>
        </Link>
      </p>
    </footer>
  );
}