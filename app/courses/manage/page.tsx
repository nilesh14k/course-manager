"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Course {
  id: string;
  title: string;
  instructorName?: string;
  thumbnail?: string;
}

export default function ManageCoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCourses() {
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
    setSearchTerm(term);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
        setFilteredCourses((prev) => prev.filter((course) => course.id !== id));
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (isLoading) {
    return <Loading message="Loading courses..." />;
  }

  return (
    <div className="min-h-screen bg-black text-beige p-4">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Manage Courses
      </h1>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-center">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border border-beige rounded-lg overflow-hidden p-4 flex flex-col items-center sm:flex-row sm:items-start"
            >
              <div className="w-full sm:w-24 h-24 bg-black border border-beige overflow-hidden rounded-md">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1 w-full mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-400">
                  {course.instructorName || "Unknown Instructor"}
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-4 mt-3 sm:mt-0">
                <Link
                  href={`/courses/${course.id}/edit`}
                  className="flex items-center space-x-1 text-sm border border-yellow bg-yellow text-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex items-center space-x-1 text-sm bg-red-600 border border-red text-white px-3 py-1 rounded hover:bg-red transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
