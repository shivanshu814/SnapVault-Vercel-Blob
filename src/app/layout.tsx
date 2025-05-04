import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnapVault - Fast & Secure Image Upload & Cloud Storage",
  description:
    "Upload, store, and share your images instantly with SnapVault. Free cloud storage with fast CDN delivery, secure file handling, and easy sharing. Created by shivanshu814. Perfect for developers, designers, and content creators.",
  keywords: [
    "image upload",
    "cloud storage",
    "file sharing",
    "instant upload",
    "secure storage",
    "image hosting",
    "CDN storage",
    "free image upload",
    "image sharing",
    "cloud image storage",
    "vercel blob storage",
    "image CDN",
    "secure file upload",
    "drag and drop upload",
    "image management",
    "shivanshu814",
  ],
  authors: [{ name: "SnapVault Team" }],
  creator: "SnapVault",
  publisher: "SnapVault",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SnapVault - Fast & Secure Image Upload & Cloud Storage",
    description:
      "Upload, store, and share your images instantly with SnapVault. Free cloud storage with fast CDN delivery, secure file handling, and easy sharing. Created by shivanshu814.",
    type: "website",
    siteName: "SnapVault",
    locale: "en_US",
    url: "https://snapvault-vercel.vercel.app/",
    images: [
      {
        url: "https://snapvault-vercel.vercel.app/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SnapVault - Fast & Secure Image Upload & Cloud Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapVault - Fast & Secure Image Upload & Cloud Storage",
    description:
      "Upload, store, and share your images instantly with SnapVault. Free cloud storage with fast CDN delivery, secure file handling, and easy sharing. Created by shivanshu814.",
    creator: "@snapvault",
    images: ["https://snapvault-vercel.vercel.app/og-image.svg"],
  },
  metadataBase: new URL("https://snapvault-vercel.vercel.app/"),
  alternates: {
    canonical: "https://snapvault-vercel.vercel.app/",
  },
  verification: {
    google: "G-8f3k2j1h4l9z7x6c5v2b0n8m3q4w5e6r7t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2",
    other: {
      "bing-site-verification":
        "BING-2a4s6d8f0g1h3j5k7l9q2w4e6r8t0y1u3i5o7p9z1x3c5v7b9n0m2q4w6e8r0t2",
      "yandex-verification":
        "YANDEX-9z8x7c6v5b4n3m2a1s0d9f8g7h6j5k4l3q2w1e0r9t8y7u6i5o4p3a2s1d0f9g8",
      "p:domain_verify":
        "PINT-1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7q8w9e0r1t2y3",
      "facebook-domain-verification":
        "FACEBOOK-0m9n8b7v6c5x4z3l2k1j0h9g8f7d6s5a4p3o2i1u0y9t8r7e6w5q4z3x2c1",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={spaceGrotesk.variable}>
      <head>
        <meta name='theme-color' content='#0A0A0F' />
        <link rel='icon' href='/favicon.svg' />
      </head>
      <body className='font-sans antialiased bg-[#0A0A0F] selection:bg-[#6366F1]/30 selection:text-white'>
        <div className='min-h-screen relative'>
          <div className='fixed inset-0 bg-[#0A0A0F] z-0'>
            <div className='absolute inset-0 bg-gradient-to-tr from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F] animate-gradient-slow'></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
          </div>

          <div className='fixed inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute w-[1000px] h-[1000px] bg-[#6366F1]/5 rounded-full blur-3xl -top-[500px] -right-[500px] animate-pulse-slow'></div>
            <div className='absolute w-[800px] h-[800px] bg-[#6366F1]/3 rounded-full blur-3xl -bottom-[400px] -left-[400px] animate-pulse-slower'></div>
          </div>

          <main className='relative z-10'>{children}</main>

          <footer className='absolute bottom-0 w-full py-6 text-center'>
            <div className='flex flex-col items-center justify-center space-y-2 text-white/40 text-sm'>
              <div className='flex items-center space-x-2'>
                <div className='w-1.5 h-1.5 rounded-full bg-[#6366F1]'></div>
                <p>© {new Date().getFullYear()} SnapVault Cloud Storage</p>
                <span className='ml-2 text-[#6366F1]'>
                  Created by shivanshu814
                </span>
                <div className='w-1.5 h-1.5 rounded-full bg-[#6366F1]'></div>
              </div>
              <div className='flex space-x-4'>
                <a href='/about' className='underline hover:text-[#6366F1]'>
                  About
                </a>
                <a href='/blog' className='underline hover:text-[#6366F1]'>
                  Blog
                </a>
                <a
                  href='/sitemap.xml'
                  className='underline hover:text-[#6366F1]'
                >
                  Sitemap
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
