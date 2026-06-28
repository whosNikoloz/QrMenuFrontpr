import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/[lang]/providers";
import { Locale, i18n } from "@/i18n.config";
import { restaurantConfig } from "@/config/restaurant";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${restaurantConfig.name.en} - Authentic Georgian Restaurant`,
  description: `${restaurantConfig.name.en} - ${restaurantConfig.tagline.en}. Experience exceptional dining with fresh ingredients and warm hospitality.`,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      lang={params.lang}
      className={`$scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="icon"
        href="/favicon.png"
        sizes="any"
      />
      <body className={inter.className}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            children: children,
          }}
        >
          <main className="h-min-screen   dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
