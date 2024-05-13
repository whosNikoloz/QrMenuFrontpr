"use client";
import { Locale } from "@/i18n.config";
import React from "react";
import CategorySection from "@/app/components/menu/categorysection";
import { MenuLayout } from "../layouts/MenuLayout";

export default function MenuPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const staticData = {
    title: "Sample Title",
    items: [
      {
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        title: "Item 2",
        price: 20,
        description: "This is item 2",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
    ],
  };

  const [changelayout, setChangelayout] = React.useState(false);
  function toggleLayout(arg: boolean) {
    setChangelayout(arg);
  }

  return (
    <MenuLayout lang={lang} toggleLayout={toggleLayout}>
      <CategorySection
        biglayout={changelayout}
        title={staticData.title}
        items={staticData.items}
        lang={lang}
      />
      <CategorySection
        biglayout={changelayout}
        title={staticData.title}
        items={staticData.items}
        lang={lang}
      />
    </MenuLayout>
  );
}
