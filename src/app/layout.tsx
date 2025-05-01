import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnapVault - Instant Cloud Storage",
  description:
    "Modern, fast, and secure cloud storage for your images. Upload and share in seconds.",
  keywords: [
    "image upload",
    "cloud storage",
    "file sharing",
    "instant upload",
    "secure storage",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "SnapVault - Instant Cloud Storage",
    description:
      "Modern, fast, and secure cloud storage for your images. Upload and share in seconds.",
    type: "website",
    siteName: "SnapVault",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapVault - Instant Cloud Storage",
    description:
      "Modern, fast, and secure cloud storage for your images. Upload and share in seconds.",
  },
  metadataBase: new URL("https://snapvault.vercel.app"),
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
            <div className='flex items-center justify-center space-x-2 text-white/40 text-sm'>
              <div className='w-1.5 h-1.5 rounded-full bg-[#6366F1]'></div>
              <p>SnapVault Cloud Storage</p>
              <div className='w-1.5 h-1.5 rounded-full bg-[#6366F1]'></div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
