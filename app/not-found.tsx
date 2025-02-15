import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
      <img src="/404.png" alt="404 Not Found" className="h-60 mb-6" />
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-8">
        Oops! The page you are looking for doesn't exist. It might have been moved or removed.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-beige text-black rounded-full hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
