"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
