// import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Landrup Dans",
  description: "Landrup Dans – en web app til en danseskole",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-full max-w-4xl mx-auto ${ubuntu.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
