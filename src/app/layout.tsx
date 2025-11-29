import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/redux/provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: "AnonChat - Free Anonymous Chat Rooms | Talk to Strangers Online",
  description: "Join free anonymous chat rooms and talk to strangers online safely. No registration required. Connect with people worldwide in our secure, moderated chat platform. 18+ only.",
  keywords: [
    "anonymous chat",
    "free chat rooms", 
    "talk to strangers",
    "online chat",
    "random chat",
    "stranger chat",
    "anonymous talking",
    "free chatting",
    "online friends",
    "meet new people",
    "chat online free",
    "anonymous chatting",
    "stranger chatting",
    "free online chat",
    "chat without registration",
    "anonymous messaging"
  ].join(", "),
  authors: [{ name: "AnonChat Team" }],
  creator: "AnonChat",
  publisher: "AnonChat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://anonchat.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AnonChat - Free Anonymous Chat Rooms | Talk to Strangers Online",
    description: "Join free anonymous chat rooms and talk to strangers online safely. No registration required. Connect with people worldwide in our secure, moderated chat platform.",
    url: 'https://anonchat.app',
    siteName: 'AnonChat',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AnonChat - Free Anonymous Chat Rooms',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AnonChat - Free Anonymous Chat Rooms",
    description: "Talk to strangers online safely in our free anonymous chat rooms. No registration required. Join now!",
    images: ['/twitter-image.png'],
    creator: '@anonchat',
  },
  robots: {
    index: false, // Keep false for now due to robots.txt
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <FirebaseClientProvider>
          <StoreProvider>
            {children}
            <Toaster />
          </StoreProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
