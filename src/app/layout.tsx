import "./globals.css";
import localFont from "next/font/local";

const alpina = localFont({
  src: [
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Bold-Italic-Trial.otf",
      weight: "700",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Bold-Trial.otf",
      weight: "700",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Light-Italic-Trial.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Light-Trial.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Medium-Italic-Trial.otf",
      weight: "600",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Medium-Trial.otf",
      weight: "600",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Regular-Italic-Trial.otf",
      weight: "500",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Regular-Trial.otf",
      weight: "500",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Thin-Italic-Trial.otf",
      weight: "400",
    },
    {
      path: "../../public/GT-Alpina/GT-Alpina-Condensed-Thin-Trial.otf",
      weight: "400",
    },
  ],
  variable: "--font-alpina",
});

const america = localFont({
  src: [
    {
      path: "../../public/GT-America/GT-America-Standard-Bold-Italic-Trial.woff2",
      weight: "800",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Bold-Trial.woff2",
      weight: "800",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Light-Italic-Trial.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Light-Trial.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Medium-Italic-Trial.woff2",
      weight: "600",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Medium-Trial.woff2",
      weight: "600",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Regular-Italic-Trial.woff2",
      weight: "500",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Regular-Trial.woff2",
      weight: "500",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Thin-Italic-Trial.woff2",
      weight: "400",
    },
    {
      path: "../../public/GT-America/GT-America-Standard-Thin-Trial.woff2",
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
      <body className="font-america">{children}</body>
    </html>
  );
}
