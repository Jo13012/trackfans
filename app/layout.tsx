import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Track Fans",
  description: "AI Tracking App to manage MYM messages",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConvexClientProvider>
                    <Toaster />
                    <ModalProvider />
                    {children}
                </ConvexClientProvider>
            </body>
        </html>
    )
}