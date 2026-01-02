import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Azure LearnHub - Learn and Advance Your Career",
  description: "Build skills for your future. Learn to get the most from Azure products with our labs, courses and live training. Azure LearnHub University offers certifications and skill paths.",
  keywords: "azure learning platform, online courses, certifications, skill development, professional training, azure",
  authors: [{ name: "Azure LearnHub" }],
  openGraph: {
    title: "Azure LearnHub - Learn and Advance Your Career",
    description: "Build skills for your future with our labs, courses and live training.",
    type: "website",
    images: [
      {
        url: "/favicon_io/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Azure LearnHub Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AzureLearnHub",
    images: ["/favicon_io/android-chrome-512x512.png"],
  },
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    shortcut: "/favicon_io/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://azure-learnhub.dev" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
