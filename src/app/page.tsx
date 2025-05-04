"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiUpload, FiCopy, FiCheck, FiImage, FiLink } from "react-icons/fi";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => {
        clearInterval(interval);
        setUploadProgress(0);
      };
    }
  }, [isUploading]);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const timestamp = new Date().getTime();
      const fileExtension = file.name.split(".").pop();
      const uniqueFilename = `${
        file.name.split(".")[0]
      }_${timestamp}.${fileExtension}`;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/upload?filename=${uniqueFilename}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedImage(data.url);
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer?.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleCopyLink = async () => {
    if (uploadedImage) {
      try {
        await navigator.clipboard.writeText(uploadedImage);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          handleUpload(file);
        }
      }
    }
  };

  return (
    <main className='min-h-screen bg-[#0A0A0F] p-8 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute w-[800px] h-[800px] bg-[#6366F1]/10 rounded-full blur-3xl -top-96 -right-96 animate-pulse'></div>
        <div className='absolute w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-3xl -bottom-64 -left-64 animate-pulse delay-1000'></div>
      </div>

      <div className='max-w-4xl mx-auto relative'>
        <div className='text-center mb-12 relative'>
          <h1 className='text-6xl font-bold text-white pb-2'>
            SnapVault: Fast & Secure Image Upload & Cloud Storage
          </h1>
          <p className='text-lg text-[#6366F1] mt-2'>Created by shivanshu814</p>
          <div className='h-1 w-32 bg-[#6366F1] mx-auto mt-4 rounded-full'></div>
        </div>

        <div className='backdrop-blur-2xl bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden group'>
          <div
            className={`relative ${
              dragActive
                ? "border-[#6366F1] bg-[#6366F1]/5"
                : "border-white/10 hover:border-[#6366F1]/50"
            } border-2 border-dashed rounded-2xl transition-all duration-300 ease-out group/upload`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onPaste={handlePaste}
            tabIndex={0}
          >
            <label className='flex flex-col items-center justify-center w-full min-h-[400px] cursor-pointer p-8'>
              <div className='flex flex-col items-center justify-center space-y-6'>
                <div className='relative transform group-hover/upload:scale-110 transition-transform duration-300'>
                  <div className='absolute inset-0 bg-[#6366F1]/20 rounded-full blur-xl opacity-75 group-hover/upload:opacity-100 transition-all duration-300'></div>
                  <div className='relative bg-[#6366F1]/10 p-8 rounded-full backdrop-blur-xl border border-[#6366F1]/20'>
                    <FiUpload
                      className={`w-16 h-16 ${
                        dragActive ? "text-[#6366F1]" : "text-white"
                      } transition-colors duration-300`}
                    />
                  </div>
                </div>
                <div className='text-center space-y-2'>
                  <p className='text-2xl'>
                    <span className='font-semibold text-[#6366F1]'>
                      Click to upload
                    </span>
                    <span className='text-white/80'> or drag and drop</span>
                  </p>
                  <p className='text-white/60'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
                disabled={isUploading}
                tabIndex={-1}
              />
            </label>
          </div>

          {isUploading && (
            <div className='mt-8'>
              <div className='flex items-center justify-center text-white mb-4'>
                <div className='relative'>
                  <div className='w-20 h-20 border-4 border-white/10 rounded-full animate-spin'>
                    <div className='absolute inset-0 border-t-4 border-[#6366F1] rounded-full'></div>
                  </div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <FiImage className='w-8 h-8 text-[#6366F1]' />
                  </div>
                </div>
                <span className='ml-6 text-xl'>Processing your image...</span>
              </div>
              {/* Progress bar */}
              <div className='relative h-2 bg-white/10 rounded-full overflow-hidden'>
                <div
                  className='absolute inset-y-0 left-0 bg-[#6366F1] transition-all duration-300 rounded-full'
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className='mt-6 bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center backdrop-blur-sm animate-fade-in'>
              <div className='flex items-center justify-center space-x-2'>
                <span className='text-lg'>{error}</span>
              </div>
            </div>
          )}

          {uploadedImage && (
            <div className='mt-8 space-y-6 animate-fade-in'>
              <div className='relative aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-xl group/image'>
                <Image
                  src={uploadedImage}
                  alt={
                    uploadedImage
                      ? `Uploaded image to SnapVault cloud storage: ${uploadedImage}`
                      : "Uploaded image"
                  }
                  fill
                  className='object-contain transform group-hover/image:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300'></div>
              </div>

              <div className='bg-black/20 backdrop-blur-xl p-6 rounded-2xl border border-white/10 relative group/url'>
                <div className='absolute inset-0 bg-[#6366F1]/5 rounded-2xl opacity-0 group-hover/url:opacity-100 transition-opacity duration-300'></div>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    <FiLink className='w-5 h-5 text-[#6366F1]' />
                    <p className='text-white/80 font-medium'>CDN URL</p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      copySuccess
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "hover:bg-[#6366F1]/10 text-white/60 hover:text-white border-[#6366F1]/20"
                    } border backdrop-blur-xl`}
                    title='Copy link'
                  >
                    {copySuccess ? (
                      <FiCheck className='w-5 h-5' />
                    ) : (
                      <FiCopy className='w-5 h-5' />
                    )}
                  </button>
                </div>
                <div className='bg-black/30 p-4 rounded-xl border border-white/10 group-hover/url:border-[#6366F1]/20 transition-colors duration-300'>
                  <p className='text-sm text-white/60 break-all font-mono'>
                    {uploadedImage}
                  </p>
                </div>
                {copySuccess && (
                  <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-full text-sm backdrop-blur-xl animate-fade-in-down'>
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          )}
          <p className='text-white/40 text-sm mt-4'>
            Tip: You can also{" "}
            <span className='text-[#6366F1] font-semibold'>paste an image</span>{" "}
            from your clipboard here!
          </p>
        </div>
      </div>

      {/* FAQ Section for SEO */}
      <section className='mt-20 max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 border border-white/10'>
        <h2 className='text-3xl font-bold text-[#6366F1] mb-6 text-center'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              How do I upload an image?
            </h3>
            <p className='text-white/70'>
              Click the upload area or drag and drop your image. Supported
              formats: PNG, JPG, GIF up to 10MB.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              Is SnapVault free to use?
            </h3>
            <p className='text-white/70'>
              Yes! SnapVault is completely free for uploading and sharing
              images.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              How secure is my data?
            </h3>
            <p className='text-white/70'>
              All images are stored securely and delivered via a fast CDN. Only
              those with the link can access your image.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              Can I share my uploaded images?
            </h3>
            <p className='text-white/70'>
              Absolutely! After upload, you get a unique CDN link to share
              anywhere.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              Who created SnapVault?
            </h3>
            <p className='text-white/70'>
              SnapVault was created by shivanshu814 to make image uploading and
              sharing super easy and secure for everyone.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ & Organization Schema for SEO */}
      <script type='application/ld+json' suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I upload an image?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Click the upload area or drag and drop your image. Supported formats: PNG, JPG, GIF up to 10MB."
              }
            },
            {
              "@type": "Question",
              "name": "Is SnapVault free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! SnapVault is completely free for uploading and sharing images."
              }
            },
            {
              "@type": "Question",
              "name": "How secure is my data?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All images are stored securely and delivered via a fast CDN. Only those with the link can access your image."
              }
            },
            {
              "@type": "Question",
              "name": "Can I share my uploaded images?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! After upload, you get a unique CDN link to share anywhere."
              }
            },
            {
              "@type": "Question",
              "name": "Who created SnapVault?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SnapVault was created by shivanshu814 to make image uploading and sharing super easy and secure for everyone."
              }
            }
          ]
        }
      `}</script>
      <script type='application/ld+json' suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SnapVault",
          "url": "https://snapvault-vercel.vercel.app/",
          "logo": "https://snapvault-vercel.vercel.app/og-image.svg",
          "sameAs": [
            "https://twitter.com/snapvault",
            "https://github.com/snapvault"
          ]
        }
      `}</script>
    </main>
  );
}
