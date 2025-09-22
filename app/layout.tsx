import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "../context/AppContext";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "DrewShop - Your One-Stop Online Store",
  description: "Created by Andrew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-800`}>
          <Theme appearance="light">
            <Toaster />
            <div className="mx-auto ">
              <AppContextProvider>{children}</AppContextProvider>
            </div>
            {/* <ThemePanel /> */}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
