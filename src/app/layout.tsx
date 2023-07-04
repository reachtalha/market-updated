import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";

const alpina = localFont({
  src: [
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Bold-Italic.otf",
      weight: "700",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Light-Italic.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Light.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Medium-Italic.otf",
      weight: "600",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Medium.otf",
      weight: "600",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Regular-Italic.otf",
      weight: "500",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Regular.otf",
      weight: "500",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Thin-Italic.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Thin.otf",
      weight: "400",
    },
  ],
  variable: "--font-alpina",
});

const america = localFont({
  src: [
    {
      path: "../../public/GT-America/GT-America-Standard-Bold-Italic.woff2",
      weight: "800",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Bold.woff2",
      weight: "800",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Light-Italic.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Light.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Medium-Italic.woff2",
      weight: "600",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Medium.woff2",
      weight: "600",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Regular-Italic.woff2",
      weight: "500",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Regular.woff2",
      weight: "500",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Thin-Italic.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Thin.woff2",
      weight: "400",
    },
  ],
  variable: "--font-america",
});

export const metadata = {
  title: "All Organics",
  description: "Organic living, simplied",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${america.variable} ${alpina.variable} `}>
      <body className="font-america">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
