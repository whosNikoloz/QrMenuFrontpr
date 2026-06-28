"use client";

import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import AutoScrollCarousel from "@/app/components/carusel";
import { Locale } from "@/i18n.config";
import ProductCategory from "../components/CategoryList";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import React from "react";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <MainLayout lang={lang}>
      <div className="w-full flex flex-col min-h-screen">
        <HeroSection lang={lang} />

        <div className="w-full space-y-12 sm:space-y-16 lg:space-y-20 py-12 sm:py-16 lg:py-20">
          <FeaturesSection lang={lang} />

          <ProductCategory items={[]} lang={lang} />
        </div>

        <Footer lang={lang} />
      </div>
    </MainLayout>
  );
}
