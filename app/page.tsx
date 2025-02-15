"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to House Of EdTech
        </h1>
        <p className="text-xl mb-8">
          Unlock your potential with premium courses designed for your professional and personal growth.
        </p>
        <Link href="/courses">
          <span className="inline-block bg-beige text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-300 transition-colors">
            Browse Courses
          </span>
        </Link>
      </section>
    </div>
  );
}
