import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ParuvaKaala | பருவகாலம்',
  description: 'AI agent framework for Tamil Nadu farmers based on Panchangam and Satellite data.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
