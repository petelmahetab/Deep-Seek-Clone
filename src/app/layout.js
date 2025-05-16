import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: " DeepSeek",
  description: "Clone of the Actual DeepSeek",
};

export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-inder antialiased">
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
