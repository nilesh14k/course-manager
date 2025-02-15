"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  rating: number;
  numReviews: number;
  price: number;
  category: string;
}

export default function CoursesContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
          setFilteredCourses(data.courses);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredCourses(courses);
      return;
    }
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  if (isLoading) return <Loading message="Loading courses..." />;

  return (
    <div className="min-h-screen bg-black text-beige p-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <p className="text-sm text-gray-300 mb-2 md:mb-0">
            {filteredCourses.length} result
            {filteredCourses.length !== 1 && "s"} for "
            {searchQuery || "All Courses"}"
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          {filteredCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="flex flex-col sm:flex-row items-center border border-beige p-4 rounded-lg w-full hover:bg-black/80 transition-colors cursor-pointer">
                <div className="w-full sm:w-40 h-40 sm:h-24 bg-black border border-beige overflow-hidden rounded-md">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 mt-3 sm:mt-0 sm:ml-4 w-full">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-300">{course.instructor}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-yellow-400">⭐ {course.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-400">({course.numReviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
