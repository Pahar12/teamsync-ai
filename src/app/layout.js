import "./globals.css";

export const metadata = {
  title: {
    default: "TeamSync AI — Student Project Team Formation & Contribution Platform",
    template: "%s | TeamSync AI",
  },
  description:
    "Intelligent, explainable student team formation based on skills, availability, and interests, paired with verifiable contribution intelligence.",
  keywords: [
    "team formation",
    "student projects",
    "contribution intelligence",
    "peer review",
    "academic collaboration",
  ],
  authors: [{ name: "TeamSync AI CSE Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
