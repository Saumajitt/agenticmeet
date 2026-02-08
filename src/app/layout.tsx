import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";

import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Meet",
  description: "AI-powered meeting assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <TRPCReactProvider>
              <Toaster />
              {children}
            </TRPCReactProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}