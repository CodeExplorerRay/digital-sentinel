import "./globals.css";
import { ReactNode } from "react";
import Layout from "@/components/Layout";
import EmotionRegistry from "@/components/EmotionRegistry";

export const metadata = {
  title: "Digital Sentinel",
  description: "Cybersecurity tools and insights",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <Layout>{children}</Layout> {/* Global Header + Footer */}
        </EmotionRegistry>
      </body>
    </html>
  );
}
