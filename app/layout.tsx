import type { Metadata } from "next";
import { Kreon, Poppins } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Geauxhack 2025",
  description: "winning"
}

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const kreon = Kreon({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kreon',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${kreon.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
