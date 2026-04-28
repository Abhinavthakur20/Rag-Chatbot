import { Inter } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata = {
  title: "RagBot Prompt Forge",
  description: "AI prompt generator and RAG chatbot for companionship app creative workflows."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bodyFont.variable}>
      <body>{children}</body>
    </html>
  );
}
