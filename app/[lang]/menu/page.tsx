"use client";
import { Locale } from "@/i18n.config";
import React, { useEffect, useState } from "react";
import CategorySection from "@/app/components/menu/categorysection";
import { MenuLayout } from "../layouts/MenuLayout";
import BottomCart from "@/app/components/Cart/bottomCart";

export default function MenuPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  interface Item {
    id: number;
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity?: number;
  }

  interface ItemQuantities {
    [key: number]: number;
  }
  const staticData: { title: string; items: Item[] } = {
    title: "ბურგერი",
    items: [
      {
        id: 1,
        title: "6 ყველის ბურგერი",
        price: 24,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/42fc72c2-596d-6dd6-ae10-b2a78c018d39_2.webp",
        quantity: 1,
      },
      {
        id: 2,
        title: "ბეკონ ბურგერი",
        price: 20,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/3f2b9c52-9291-19d8-0ac7-6cd73b4bd9ef_2.webp",
        quantity: 1,
      },
      {
        id: 3,
        title: "ჩიზბურგერი",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/418df878-fdee-c1cf-5744-7139ed1b824a_3.webp",
        quantity: 1,
      },
      {
        id: 4,
        title: "გრანდ ბურგერი",
        price: 27,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/e7848a08-977f-a52d-fa23-fd1af15fb834_2.webp",
        quantity: 1,
      },
    ],
  };

  const SecondstaticData: { title: string; items: Item[] } = {
    title: "პიცა",
    items: [
      {
        id: 5,
        title: "4 ყველის პიცა",
        price: 15,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/1dae5380-42a7-462f-ef6d-14d0a4d241db_2.webp",
        quantity: 1,
      },
      {
        id: 6,
        title: "კაპრიჩოზა",
        price: 20,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/2343fb4b-71cb-4b60-41ba-827874bdb189_2.webp",
        quantity: 1,
      },
      {
        id: 7,
        title: "საფირმო პიცა",
        price: 27,
        description: "This is item 1",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/d5b064b5-2b24-f6f6-628f-855b9ea675fc_2.webp",
        quantity: 1,
      },
      {
        id: 8,
        title: "სამარხვო პიცა",
        price: 14,
        description: "",
        imageUrl:
          "https://bonee.blob.core.windows.net/images/2ae44866-0a4b-87ff-46d4-3184c522c178_2.webp",
        quantity: 1,
      },
    ],
  };

  const [changelayout, setChangelayout] = React.useState(false);
  function toggleLayout(arg: boolean) {
    setChangelayout(arg);
  }

  const [cartItems, setCartItems] = useState<Item[]>([]);

  function handleAddToCart(item: Item) {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, item];
      return newCartItems;
    });
    console.log("Cart Items: ", cartItems);
  }

  return (
    <MenuLayout lang={lang} toggleLayout={toggleLayout}>
      <CategorySection
        biglayout={changelayout}
        title={staticData.title}
        items={staticData.items}
        lang={lang}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
      <CategorySection
        cartItems={cartItems}
        biglayout={changelayout}
        title={SecondstaticData.title}
        items={SecondstaticData.items}
        lang={lang}
        onAddToCart={handleAddToCart}
      />
      <div className="justify-center bg-transparent items-center flex mb-24">
        <BottomCart lng={lang} items={cartItems} />{" "}
      </div>
    </MenuLayout>
  );
}
