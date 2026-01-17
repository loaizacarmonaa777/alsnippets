"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/* =====================================================
   ThemeProvider
   - Maneja light / dark / system
   - Aplica la clase al <html>
   ===================================================== */

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
