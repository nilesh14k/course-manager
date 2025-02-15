"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CourseForm, { CourseFormValues } from "../../../components/CourseForm";
import Loading from "../../../components/Loading";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [initialValues, setInitialValues] = useState<CourseFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const course = data.course;
          setInitialValues({
            title: course.title || "",
            description: course.description || "",
            instructorName: course.instructorName || "",
            category: course.category || "",
            customCategory: "",
            topic: course.topic || "",
            customTopic: "",
            level: course.level || "",
            customLevel: "",
            language: course.language || "",
            fee: course.fee ? course.fee.toString() : "",
            duration: course.duration || "",
            whatYouWillLearn: course.whatYouWillLearn || "",
            requirements: course.requirements || "",
            thumbnailFile: null,
          });
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

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
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        router.push("/courses");
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !initialValues) {
    return <Loading message="Loading course details..." />;
  }

  return (
    <div className="min-h-screen w-full bg-black px-4 py-6 sm:px-8">
      <div className="w-full bg-black p-4 sm:p-8 rounded shadow border border-beige mx-auto max-w-2xl">
        <CourseForm initialValues={initialValues} onSubmit={handleSubmit} isEditMode={true} formTitle="Edit Course" />
      </div>
    </div>
  );
}
