import { authClient } from '@/lib/auth/client'; 
import { NeonAuthUIProvider } from '@neondatabase/auth/react'; 
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from "@/providers/ReactQueryProvider"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PoupaMais - Organize suas finanças",
  description: "Organize suas finanças gratuitamente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <NeonAuthUIProvider
          authClient={authClient} 
          redirectTo="/dashboard"
          emailOTP
        >
          <Toaster richColors position='bottom-right'/>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </ThemeProvider>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
