import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto pt-10 pb-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#1E3A8A]">About MediStore</h1>
        <p className="text-gray-700 text-lg">
          Your Trusted Online Medicine Shop — reliable, fast, and convenient OTC medicine delivery.
        </p>
      </section>

      {/* Our Story */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1E3A8A]">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          MediStore was created to make purchasing medicines easier and more reliable for everyone.
          Our goal is to connect customers with trusted sellers while ensuring quality products and
          timely delivery. Over the years, we have grown into a platform that serves thousands of
          satisfied customers across the country.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2 border-l-4 border-[#FBD536] p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-[#1E3A8A]">Our Mission</h3>
          <p className="text-gray-700">
            To provide high-quality OTC medicines with a seamless online shopping experience,
            ensuring customers can access healthcare products conveniently and safely.
          </p>
        </div>
        <div className="space-y-2 border-l-4 border-[#FBD536] p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-[#1E3A8A]">Our Vision</h3>
          <p className="text-gray-700">
            To become the most trusted online medicine store, connecting customers and sellers while
            promoting health, transparency, and reliability in every transaction.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Mohammed Shohel", role: "Founder & CEO" },
            { name: "Korim Uddin", role: "Product Manager" },
            { name: "Alamgir", role: "Lead Developer" },
          ].map((member) => (
            <div
              key={member.name}
              className="border rounded-lg p-4 text-center hover:shadow-lg transition bg-white"
            >
              <div className="h-24 w-24 mx-auto rounded-full bg-[#FBD536] mb-4 flex items-center justify-center text-2xl font-bold text-white">
                {member.name[0]}
              </div>
              <h4 className="font-semibold text-[#1E3A8A]">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 bg-[#FEF8E5] rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-[#1E3A8A]">Get in Touch</h2>
        <p className="text-gray-700 mb-4">
          Have questions or need assistance? Contact us and our support team will be happy to help.
        </p>
        <Link
          href="/contact"
          className="px-6 py-2 bg-[#FBD536] text-[#1E3A8A] rounded-lg font-semibold hover:bg-[#facc15] transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
