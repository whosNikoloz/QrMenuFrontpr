"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const path = usePathname();

  return (
    <>
      <NextThemesProvider {...themeProps}>
        <NextUIProvider>
          {/* <motion.div
            key={path}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={{
              pageInitial: {
                opacity: 0,
                x: "100vw",
              },
              pageAnimate: {
                opacity: 1,
                x: 0,
              },
              pageExit: {
                opacity: 0,
                x: "-100vw",
              },
            }}
            transition={{
              type: "spring",
              stiffness: 20,
              duration: 0.5,
            }}
          > */}
          {children}
          {/* </motion.div> */}
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
