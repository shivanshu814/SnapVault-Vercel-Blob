import React from "react";

export default function Blog() {
  return (
    <main className='max-w-3xl mx-auto py-20 px-4'>
      <h1 className='text-4xl font-bold text-[#6366F1] mb-6'>SnapVault Blog</h1>
      <article className='mb-10'>
        <h2 className='text-2xl font-semibold text-white mb-2'>
          How to Upload Images Securely and Instantly
        </h2>
        <p className='text-white/70 mb-2'>
          Uploading images online should be fast, secure, and hassle-free. With
          SnapVault, you can drag and drop your images, get a CDN-powered link,
          and share it anywhere in seconds. All uploads are encrypted and
          delivered via a global CDN for maximum speed and privacy.
        </p>
        <a href='#' className='underline text-[#6366F1]'>
          Read more
        </a>
      </article>
      <article>
        <h2 className='text-2xl font-semibold text-white mb-2'>
          Why Use Cloud Storage for Images?
        </h2>
        <p className='text-white/70 mb-2'>
          Cloud storage ensures your images are always available, backed up, and
          easy to share. SnapVault leverages Vercel Blob Storage for reliability
          and performance, so your files are safe and accessible from anywhere.
        </p>
        <a href='#' className='underline text-[#6366F1]'>
          Read more
        </a>
      </article>
    </main>
  );
}
