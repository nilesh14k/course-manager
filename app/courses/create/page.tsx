"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CourseForm, { CourseFormValues } from "../../components/CourseForm";
import Loading from "../../components/Loading";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: CourseFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("instructorName", values.instructorName);
    formData.append("category", values.category === "custom" ? values.customCategory : values.category);
    formData.append("topic", values.topic === "custom" ? values.customTopic : values.topic);
    formData.append("level", values.level === "custom" ? values.customLevel : values.level);
    formData.append("language", values.language);
    formData.append("fee", values.fee);
    formData.append("duration", values.duration);
    formData.append("whatYouWillLearn", values.whatYouWillLearn);
    formData.append("requirements", values.requirements);
    if (values.thumbnailFile) {
      formData.append("thumbnail", values.thumbnailFile);
    }

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        router.push("/courses");
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Creating course..." />;
  }

  return (
    <div className="min-h-screen w-full bg-black px-4 py-6 sm:px-8">
      <div className="w-full bg-black p-4 sm:p-8 rounded shadow border border-beige mx-auto max-w-2xl">
        <CourseForm onSubmit={handleSubmit} formTitle="Add a New Course" />
      </div>
    </div>
  );
}
