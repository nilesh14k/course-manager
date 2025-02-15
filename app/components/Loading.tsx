"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-beige px-4">
      <FaSpinner className="animate-spin text-5xl md:text-6xl" />
      <p className="mt-4 text-lg md:text-xl text-center">{message}</p>
    </div>
  );
}
