import React from "react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // SSR

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export default async function BlogPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/data/blogPosts.json`
  );
  const blogPosts: BlogPost[] = await res.json();

  return (
    <div className="w-11/12 md:w-10/12 mx-auto pt-10 pb-16 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-[#1E3A8A]">MediStore Blog</h1>
        <p className="text-gray-700 text-lg">
          Stay updated with health tips, medicine advice, and our latest news.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-700 text-sm flex-1 line-clamp-4">
                {post.excerpt}
              </p>

              <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <Link
                  href={`/blogs/${post.id}`}
                  className="px-3 py-1 bg-[#FBD536] text-[#1E3A8A] rounded font-semibold hover:bg-yellow-400 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
