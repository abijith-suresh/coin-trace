'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary:
            "bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800",
          card: "shadow-lg border dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm",
          headerTitle: "text-xl font-semibold",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "border dark:border-gray-800 hover:bg-accent transition-colors",
          socialButtonsBlockButtonText: "text-foreground font-medium",
          formFieldLabel: "text-foreground font-medium",
          formFieldInput:
            "border dark:border-gray-800 bg-background dark:bg-input/30 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-600 transition-colors",
          footerActionText: "text-muted-foreground",
          footerActionLink:
            "text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400",
          dividerLine: "bg-border dark:bg-gray-800",
          dividerText: "text-muted-foreground bg-background dark:bg-gray-900/50 px-2",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}