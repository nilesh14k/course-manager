"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center">
      <div className="max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mx-auto text-beige"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M13 2.5V5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h4"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 14l-1 1l1 1m4.5 0l1 1l-1 1M10 14l-1.5 4"/>
          <path fill="currentColor" d="M2.75 10a.75.75 0 0 0-1.5 0h1.5Zm18.5 4a.75.75 0 0 0 1.5 0h-1.5Z"/>
        </svg>

        <h1 className="text-3xl md:text-4xl font-bold mt-4">Page Not Working</h1>
        <p className="mt-2 text-gray-300 text-sm md:text-base">
          Sorry! This page is not available or not working as expected.
        </p>

        <Link
          href="/"
          className="mt-5 inline-block text-sm md:text-base font-medium px-6 py-2 bg-beige text-black rounded-md hover:font-bold transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
