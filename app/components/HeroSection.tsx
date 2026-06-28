"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { SearchIcon } from "./icons";
import SearchBar from "./SearchBar";
import { restaurantConfig } from "@/config/restaurant";

interface HeroSectionProps {
  lang: Locale;
}

const translations = {
  en: {
    welcome: "Welcome to",
    viewMenuButton: "View Menu",
    searchPlaceholder: "Search for dishes, categories...",
  },
  ka: {
    welcome: "კეთილი იყოს თქვენი მობრძანება",
    viewMenuButton: "ნახეთ მენიუ",
    searchPlaceholder: "მოძებნეთ კერძები, კატეგორიები...",
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const router = useRouter();
  const t = translations[lang];
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleViewMenu = () => {
    router.push(`/${lang}/menu`);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full min-h-[450px] lg:min-h-[60vh] flex items-center justify-center overflow-hidden py-8 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 z-10" />

        <div className="absolute inset-0 dark:opacity-30 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22c55e,transparent)]" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-7">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              {t.welcome}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 dark:from-green-300 dark:via-emerald-400 dark:to-green-500 animate-gradient leading-tight sm:leading-tight lg:leading-tight py-2">
              {restaurantConfig.name[lang]}
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed py-1">
              {restaurantConfig.tagline[lang]}
            </h2>

            <div className="max-w-2xl mx-auto w-full pt-4">
              <Input
                placeholder={t.searchPlaceholder}
                size="lg"
                startContent={<SearchIcon size={24} />}
                onClick={openSearch}
                readOnly
                classNames={{
                  base: "w-full cursor-pointer",
                  input: "cursor-pointer text-base",
                  inputWrapper:
                    "bg-white/90 dark:bg-black/50 backdrop-blur-md border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl h-14",
                }}
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center items-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={handleViewMenu}
              >
                {t.viewMenuButton}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchBar
        lang={lang}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
