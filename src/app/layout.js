import "./globals.css";

export const metadata = {
  title: "My Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}