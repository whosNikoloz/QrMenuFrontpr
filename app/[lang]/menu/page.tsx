"use client";
import { Locale } from "@/i18n.config";
import React, { useEffect, useState } from "react";
import CategorySection from "@/app/components/menu/categorysection";
import { MenuLayout } from "../layouts/MenuLayout";
import BottomCart from "@/app/components/Cart/bottomCart";
import Product from "@/models/Product";
import CartItem from "@/models/CartItem";

export default function MenuPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const staticData = {
    title: "ბურგერი",
    products: [
      new Product(
        1,
        "6 ყველის ბურგერი",
        24,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/42fc72c2-596d-6dd6-ae10-b2a78c018d39_2.webp",
        50
      ),
      new Product(
        2,
        "ბეკონ ბურგერი",
        20,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/3f2b9c52-9291-19d8-0ac7-6cd73b4bd9ef_2.webp",
        20
      ),
      new Product(
        3,
        "ჩიზბურგერი",
        10,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/418df878-fdee-c1cf-5744-7139ed1b824a_3.webp",
        30
      ),
      new Product(
        4,
        "გრანდ ბურგერი",
        27,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/e7848a08-977f-a52d-fa23-fd1af15fb834_2.webp",
        15
      ),
    ],
  };

  const secondstaticData = {
    title: "პიცა",
    products: [
      new Product(
        5,
        "4 ყველის პიცა",
        15,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/1dae5380-42a7-462f-ef6d-14d0a4d241db_2.webp",
        80
      ),
      new Product(
        6,
        "კაპრიჩოზა",
        20,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/3f2b9c52-9291-19d8-0ac7-6cd73b4bd9ef_2.webp",
        40
      ),
      new Product(
        7,
        "საფირმო პიცა",
        27,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/d5b064b5-2b24-f6f6-628f-855b9ea675fc_2.webp"
      ),
      new Product(
        8,
        "სამარხვო პიცა",
        14,
        "This is item 1",
        "https://bonee.blob.core.windows.net/images/2ae44866-0a4b-87ff-46d4-3184c522c178_2.webp"
      ),
    ],
  };

  const [changelayout, setChangelayout] = React.useState(false);
  function toggleLayout(arg: boolean) {
    setChangelayout(arg);
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      try {
        const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems); // Set cart items in state
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }
  }, []);

  function handleAddToCart(cartItem: CartItem) {
    setCartItems((prevCartItems: CartItem[]) => {
      const itemIndex = prevCartItems.findIndex(
        (item) =>
          item.product?.id === cartItem.product?.id &&
          item.customDescription === cartItem.customDescription
      );
      let newCartItems: CartItem[];
      if (itemIndex > -1) {
        // Item exists, update the quantity
        newCartItems = prevCartItems.map((item, index) =>
          index === itemIndex
            ? ({
                ...item,
                quantity: item.quantity + cartItem.quantity,
              } as CartItem)
            : item
        );
      } else {
        // Item does not exist, add as new item
        newCartItems = [...prevCartItems, cartItem];
      }

      localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // Store updated items in localStorage
      return newCartItems; // Update state with new items
    });
  }

  function handleUpdateCartItemQuantity(product: Product, quantity: number) {
    setCartItems((prevCartItems: CartItem[]) => {
      const updatedCartItems = prevCartItems.map((cartItem) => {
        if (cartItem.product?.id === product.id) {
          return { ...cartItem, quantity } as CartItem;
        }
        return cartItem;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  }

  function arraysAreEqual(arr1: any[], arr2: string | any[]) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item: any, index: number) => item === arr2[index]);
  }

  return (
    <MenuLayout lang={lang} toggleLayout={toggleLayout}>
      <CategorySection
        biglayout={changelayout}
        title={staticData.title}
        products={staticData.products}
        lang={lang}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <CategorySection
        cartItems={cartItems}
        biglayout={changelayout}
        title={secondstaticData.title}
        products={secondstaticData.products}
        lang={lang}
        onAddToCart={handleAddToCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <div className="justify-center bg-transparent items-center flex mb-24">
        <BottomCart lng={lang} CartItems={cartItems} />{" "}
      </div>
    </MenuLayout>
  );
}
