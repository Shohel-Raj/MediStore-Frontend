import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic"; // SSR

export default async function BlogDetail({ params }: Props) {

    const param =await params
  // Fetch all posts
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/data/blogPosts.json`
  );
  const blogPosts: BlogPost[] = await res.json();

  // Find the post by id
  const post = blogPosts.find((p) => p.id.toString() === param.id);
  if (!post) return notFound();

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-16 space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/blog" className="hover:underline">Blog</Link> / {post.title}
      </div>

      {/* Title & Meta */}
      <h1 className="text-4xl font-bold text-[#1E3A8A]">{post.title}</h1>
      <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
        <span>By {post.author}</span>
        <span>{post.date}</span>
        <span className="capitalize">{post.category}</span>
      </div>

      {/* Image */}
      <div className="w-full h-64 sm:h-96 overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-gray-700 text-base space-y-4">
        <p>{post.excerpt}</p>
       
      </div>

      {/* Back Button */}
      <div>
        <Link
          href="/blogs"
          className="px-4 py-2 bg-[#FBD536] text-[#1E3A8A] rounded font-semibold hover:bg-yellow-400 transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
