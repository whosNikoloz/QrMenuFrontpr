"use client";

import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import AutoScrollCarousel from "@/app/components/carusel";
import { Locale } from "@/i18n.config";
import ProductCategory from "../components/CategoryList";
import React from "react";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <MainLayout lang={lang}>
      <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16 pb-12 sm:pb-16 lg:pb-20">
        <AutoScrollCarousel lng={""} />
        <ProductCategory items={[]} lang={lang} />
      </div>
    </MainLayout>
  );
}
