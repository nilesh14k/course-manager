"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaUndo } from "react-icons/fa";

export interface CourseFormValues {
  title: string;
  description: string;
  instructorName: string;
  category: string;
  customCategory: string;
  topic: string;
  customTopic: string;
  level: string;
  customLevel: string;
  language: string;
  fee: string;
  duration: string;
  whatYouWillLearn: string;
  requirements: string;
  thumbnailFile?: File | null;
}

interface CourseFormProps {
  formTitle: string;
  initialValues?: Partial<CourseFormValues>;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  isEditMode?: boolean;
}

export default function CourseForm({
  formTitle,
  initialValues = {},
  onSubmit,
  isEditMode = false,
}: CourseFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CourseFormValues>({
    title: initialValues.title || "",
    description: initialValues.description || "",
    instructorName: initialValues.instructorName || "",
    category: initialValues.category || "",
    customCategory: initialValues.customCategory || "",
    topic: initialValues.topic || "",
    customTopic: initialValues.customTopic || "",
    level: initialValues.level || "",
    customLevel: initialValues.customLevel || "",
    language: initialValues.language || "",
    fee: initialValues.fee || "",
    duration: initialValues.duration || "",
    whatYouWillLearn: initialValues.whatYouWillLearn || "",
    requirements: initialValues.requirements || "",
    thumbnailFile: initialValues.thumbnailFile || null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValues((prev) => ({ ...prev, thumbnailFile: file }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  const handleDiscard = () => {
    if (isEditMode) {
      router.push("/courses");
    } else {
      setValues({
        title: "",
        description: "",
        instructorName: "",
        category: "",
        customCategory: "",
        topic: "",
        customTopic: "",
        level: "",
        customLevel: "",
        language: "",
        fee: "",
        duration: "",
        whatYouWillLearn: "",
        requirements: "",
        thumbnailFile: null,
      });
    }
  };

  return (
    <div>
      <div className="sticky top-[56px] md:top-[64px] bg-black/80 backdrop-blur-md z-20 border-b border-beige px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-beige flex-1">
          {formTitle}
        </h1>
        <div className="flex space-x-2">
          <button
            type="submit"
            form="course-form"
            className="bg-beige text-black px-4 py-2 rounded flex items-center space-x-2 font-semibold hover:bg-beige/80 transition-colors"
          >
            <FaSave className="w-5 h-5" />
            <span>{isEditMode ? "Save Changes" : "Save"}</span>
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="bg-transparent border border-beige text-beige px-4 py-2 rounded flex items-center space-x-2 font-semibold hover:bg-beige hover:text-black transition-colors"
          >
            <FaUndo className="w-5 h-5" />
            <span>{isEditMode ? "Discard Changes" : "Clear Fields"}</span>
          </button>
        </div>
      </div>

      <form id="course-form" onSubmit={handleSubmit} className="space-y-8 p-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Instructor Name</label>
              <input
                type="text"
                name="instructorName"
                value={values.instructorName}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              className="w-full p-3 border border-beige rounded bg-black text-beige"
              rows={5}
              required
            ></textarea>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              >
                <option value="">-- Select Category --</option>
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Photography">Photography</option>
                <option value="custom">Other (Add Custom)</option>
              </select>
              {values.category === "custom" && (
                <input
                  type="text"
                  name="customCategory"
                  placeholder="Enter custom category"
                  value={values.customCategory}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-beige rounded bg-black text-beige"
                />
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Topic</label>
              <select
                name="topic"
                value={values.topic}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              >
                <option value="">-- Select Topic --</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="custom">Other (Add Custom)</option>
              </select>
              {values.topic === "custom" && (
                <input
                  type="text"
                  name="customTopic"
                  placeholder="Enter custom topic"
                  value={values.customTopic}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-beige rounded bg-black text-beige"
                />
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Level</label>
              <select
                name="level"
                value={values.level}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              >
                <option value="">-- Select Level --</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="custom">Other (Add Custom)</option>
              </select>
              {values.level === "custom" && (
                <input
                  type="text"
                  name="customLevel"
                  placeholder="Enter custom level"
                  value={values.customLevel}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-beige rounded bg-black text-beige"
                />
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Course Language</label>
              <select
                name="language"
                value={values.language}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              >
                <option value="">-- Select Language --</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium mb-1">Course Fee (USD)</label>
              <input
                type="number"
                name="fee"
                value={values.fee}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 10 hours"
                value={values.duration}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                required
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium mb-1">What you'll learn</label>
              <textarea
                name="whatYouWillLearn"
                value={values.whatYouWillLearn}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                rows={4}
              ></textarea>
            </div>
            <div>
              <label className="block font-medium mb-1">Requirements</label>
              <textarea
                name="requirements"
                value={values.requirements}
                onChange={handleChange}
                className="w-full p-3 border border-beige rounded bg-black text-beige"
                rows={4}
              ></textarea>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Media</h2>
          <div>
            <label className="block font-medium mb-1">Course Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-beige rounded bg-black text-beige"
            />
          </div>
        </section>
      </form>
    </div>
  );
}
