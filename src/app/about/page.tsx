import React from "react";

export default function About() {
  return (
    <main className='max-w-3xl mx-auto py-20 px-4'>
      <h1 className='text-4xl font-bold text-[#6366F1] mb-6'>
        About SnapVault
      </h1>
      <p className='text-lg text-[#6366F1] mb-2'>Created by shivanshu814</p>
      <p className='text-lg text-white/80 mb-4'>
        SnapVault is a modern, fast, and secure cloud storage platform for your
        images. Our mission is to make image uploading, sharing, and management
        effortless for everyone—developers, designers, and content creators.
      </p>
      <p className='text-white/70 mb-4'>
        Built on top of Vercel Blob Storage and Next.js, SnapVault delivers
        blazing fast CDN-powered image hosting with a beautiful, intuitive
        interface. Your privacy and security are our top priorities.
      </p>
      <p className='text-white/70 mb-4'>
        Whether you need to share screenshots, design assets, or memes,
        SnapVault is the easiest way to upload and share images instantly.
      </p>
      <h2 className='text-2xl font-semibold text-[#6366F1] mt-10 mb-2'>
        Contact
      </h2>
      <p className='text-white/70 mb-2'>
        Created by:{" "}
        <span className='font-semibold text-[#6366F1]'>shivanshu814</span>
      </p>
      <p className='text-white/70'>
        For support or feedback, email us at{" "}
        <a
          href='mailto:shivanshupathak814@gmail.com'
          className='underline text-[#6366F1]'
        >
          shivanshupathak814@gmail.com
        </a>
      </p>
    </main>
  );
}
