import { notFound } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  rating?: number;
  numReviews?: number;
  enrollments?: number;
  lastUpdated?: string;
  language?: string;
  price?: number;
  thumbnail?: string;
  whatYouWillLearn?: string[] | string;
  requirements?: string[] | string;
  description?: string;
  instructorName?: string;
  curriculum?: Array<{
    title: string;
    lectures: Array<{
      title: string;
      length: string;
    }>;
  }>;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/courses/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const course: Course = data.course;

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-black text-beige min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
            {course.subtitle && (
              <p className="text-lg text-gray-300 mb-4">{course.subtitle}</p>
            )}
            <p className="text-lg font-semibold mb-4">
              by {course.instructorName || "Unknown Instructor"}
            </p>
            <div className="flex flex-wrap items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">
                  {"⭐".repeat(Math.round(course.rating || 0))}
                </span>
                <span className="text-gray-300">
                  {course.rating ? course.rating.toFixed(1) : "0.0"}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                ({course.numReviews || 0} ratings)
              </span>
              <span className="text-sm text-gray-400">
                {course.enrollments || 0} students
              </span>
            </div>
            <div className="text-sm text-gray-400 mb-6">
              <span className="mr-4">
                Last updated {course.lastUpdated || "N/A"}
              </span>
              <span>Language: {course.language || "N/A"}</span>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:w-1/3 bg-black border border-beige rounded p-4">
            <div className="w-full h-48 bg-black border border-beige rounded mb-4 flex items-center justify-center overflow-hidden">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500">No Thumbnail</span>
              )}
            </div>
            <div className="text-2xl font-bold mb-4">
              {course.price && course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
            </div>
            <button className="w-full bg-beige text-black py-2 rounded font-semibold hover:bg-beige/80 transition-colors mb-2">
              Buy Now
            </button>
            <button className="w-full bg-transparent border border-beige text-beige py-2 rounded font-semibold hover:bg-beige hover:text-black transition-colors mb-2">
              Add to Cart
            </button>
            <button className="w-full bg-transparent border border-beige text-beige py-2 rounded font-semibold hover:bg-beige hover:text-black transition-colors">
              Preview This Course
            </button>
            <p className="text-sm text-gray-400 mt-4">
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
        <hr className="my-8 border-beige/50" />
        {course.whatYouWillLearn && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
            {Array.isArray(course.whatYouWillLearn) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 bg-black p-2 border border-beige rounded"
                  >
                    <span className="text-yellow-400">✓</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{course.whatYouWillLearn}</p>
            )}
          </section>
        )}
        {course.curriculum && course.curriculum.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Course content</h2>
            <div className="bg-black border border-beige rounded p-4">
              {course.curriculum.map((section, sIdx) => (
                <div key={sIdx} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <ul className="space-y-1 ml-4 list-disc list-inside text-gray-300">
                    {section.lectures.map((lec, lIdx) => (
                      <li key={lIdx}>
                        {lec.title} — <span className="text-sm">{lec.length}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {course.requirements && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            {Array.isArray(course.requirements) ? (
              <ul className="space-y-2 bg-black border border-beige rounded p-4 text-gray-300 list-disc list-inside ml-4">
                {course.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            ) : (
              <p>{course.requirements}</p>
            )}
          </section>
        )}
        {course.description && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="bg-black rounded leading-relaxed">
              {course.description}
            </div>
          </section>
        )}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Student Feedback</h2>
          <div className="bg-black rounded text-gray-300">
            <p>No Reviews posted.....</p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">More courses you might like</h2>
          <div className="bg-black rounded text-gray-300">
            <p>No Suggestions Posted.....</p>
          </div>
        </section>
      </div>
    </div>
  );
}
