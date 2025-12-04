import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "Bio Care Coaching",
  description: "Biology learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background">

        {/* Toaster for all notifications */}
        <Toaster richColors closeButton position="top-right" />

        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
