// import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "@/globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Landrup Dans",
  description: "Landrup Dans – a dance school in Aarhus, Denmark, offering a variety of dance classes for all ages and skill levels. Join us to experience the joy of dance and connect with a vibrant community of dancers.",
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
