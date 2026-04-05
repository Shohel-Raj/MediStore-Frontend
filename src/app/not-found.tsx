"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9EDE1] px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-100 h-100 bg-[#FBD536]/20 rounded-full blur-3xl animate-pulse" />

      <div className="text-center max-w-xl z-10">

        {/* 404 Number */}
        <h1 className="text-8xl font-extrabold text-[#FBD536] mb-4 animate-in fade-in zoom-in duration-700">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 animate-in fade-in duration-700 delay-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-[#FBD536] text-black rounded-xl font-medium shadow hover:scale-105 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* Home Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 border border-[#FBD536] text-[#FBD536] rounded-xl font-medium hover:bg-[#FBD536] hover:text-black transition"
          >
            <Home size={18} />
            Home
          </button>

        </div>
      </div>
    </div>
  );
}