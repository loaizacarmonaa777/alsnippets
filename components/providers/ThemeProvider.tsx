"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Debe usar "export function", no "export default" según cómo lo llamaste en layout.tsx
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}