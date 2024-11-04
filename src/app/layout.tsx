import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blind Code | Code in the Dark Challenge",
  description:
    "Desafie suas habilidades de programação codificando sem ver o resultado. Um experimento inspirado no Code in the Dark.",
  keywords: [
    "code challenge",
    "programming",
    "blind coding",
    "code in the dark",
    "developer challenge",
  ],
  authors: [{ name: "Seu Nome" }],
  openGraph: {
    title: "Blind Code Challenge",
    description: "Teste suas habilidades de programação no escuro",
    images: ["/og-image.png"], // Adicione uma imagem OG depois
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blind Code Challenge",
    description: "Programe sem ver o resultado. Teste suas habilidades!",
    images: ["/og-image.png"], // Adicione uma imagem para Twitter depois
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoCondensed.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
