"use client";
import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState } from "react";
import CategorySection, {
  CategorySectionRef,
} from "@/app/components/menu/categorysection";
import { MenuLayout } from "../layouts/MenuLayout";
import BottomCart from "@/app/components/Cart/bottomCart";
import Product from "@/models/Product";
import CartItem from "@/models/CartItem";
import {
  Avatar,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Image,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { AddToShoppingCart, SearchIcon } from "@/app/components/icons";
import { fetchProductGroups } from "@/app/api/ProductGroup";
import ProductGroup from "@/models/ProductGroup";

export default function MenuPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductGroups();
        setProductGroups(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product groups:", error);
      }
    };

    fetchData();
  }, []);

  const staticData = {
    en: {
      title: "Burgers",
      products: [
        new Product(
          1,
          "6 cheese burgers",
          24,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/42fc72c2-596d-6dd6-ae10-b2a78c018d39_2.webp"
        ),
        new Product(
          2,
          "Bacon burger",
          20,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/3f2b9c52-9291-19d8-0ac7-6cd73b4bd9ef_2.webp",
          20
        ),
        new Product(
          3,
          "Cheeseburger",
          10,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/418df878-fdee-c1cf-5744-7139ed1b824a_3.webp",
          30
        ),
        new Product(
          4,
          "Grand Burger",
          27,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/e7848a08-977f-a52d-fa23-fd1af15fb834_2.webp",
          15
        ),
      ],
    },
    ka: {
      title: "ბურგერი",
      products: [
        new Product(
          1,
          "6 ყველის ბურგერი",
          24,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/42fc72c2-596d-6dd6-ae10-b2a78c018d39_2.webp"
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
    },
  };

  const secondstaticData = {
    en: {
      title: "Pizza",
      products: [
        new Product(
          5,
          "4 cheese pizza",
          15,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/1dae5380-42a7-462f-ef6d-14d0a4d241db_2.webp",
          80
        ),
        new Product(
          6,
          "Caprichosa",
          20,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/3f2b9c52-9291-19d8-0ac7-6cd73b4bd9ef_2.webp",
          40
        ),
        new Product(
          7,
          "Signature pizza",
          27,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/d5b064b5-2b24-f6f6-628f-855b9ea675fc_2.webp"
        ),
        new Product(
          8,
          "Fasting pizza",
          14,
          "This is item 1",
          "https://bonee.blob.core.windows.net/images/2ae44866-0a4b-87ff-46d4-3184c522c178_2.webp"
        ),
      ],
    },
    ka: {
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
    },
  };

  const [changelayout, setChangelayout] = React.useState(false);
  function toggleLayout(arg: boolean) {
    setChangelayout(arg);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const combinedProducts = [
    ...staticData[lang].products,
    ...secondstaticData[lang].products,
  ];

  combinedProducts.map((product, index) => {
    const cartItem = cartItems.find((item) => item.product?.id === product.id);

    // ... rest of your code
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = combinedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorySectionRef = useRef<CategorySectionRef>(null);

  const exonAddToCart = (product: Product) => {
    if (product) {
      if (categorySectionRef.current) {
        categorySectionRef.current.handleAddToCartFromParent(product);
      }
    }
  };

  return (
    <MenuLayout
      lang={lang}
      toggleLayout={toggleLayout}
      eopenSearch={() => onOpen()}
    >
      {Array.isArray(productGroups) &&
        productGroups.map((group) => {
          if (!group || !group.id || !group.products) {
            return null; // Skip this iteration if group, group.id or group.products is undefined
          }
          return (
            <CategorySection
              key={group.id}
              ref={categorySectionRef}
              biglayout={changelayout}
              title={lang === "en" ? group.name_En : group.name_Ka}
              products={group.products}
              lang={lang}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            />
          );
        })}
      <div className="justify-center bg-transparent items-center flex mb-24">
        <BottomCart lng={lang} CartItems={cartItems} />{" "}
      </div>

      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        radius="md"
        scrollBehavior="inside"
        isDismissable={false}
        backdrop="blur"
        shouldBlockScroll={true}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 ">
            <div className="px-10">
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[10rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-[16px]",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder={lang === "en" ? "Search" : "ძებნა"}
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            {filteredProducts.map((product, index) => {
              const cartItem = cartItems.find(
                (item) => item.product?.id === product.id
              );

              return (
                <div
                  className="flex justify-between dark:bg-[#313638]/85 bg-white shadow-2xl p-4 mt-2 rounded-2xl"
                  key={index}
                >
                  <Image
                    src={product.imageUrl}
                    width={200}
                    alt="Sample Image"
                    className="rounded-lg"
                  />

                  <div className="ml-4  flex w-full flex-col justify-between">
                    <h1 className="text-md font-bold text-black dark:text-white ">
                      {product.name}
                    </h1>
                    <p className="text-xs/3 mt-2 dark:text-white/70 text-black/70">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="mr-2 text-sm text-black dark:text-white relative">
                        {product.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through">
                              {product.price} {lang === "en" ? "GEL" : "₾"}
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {product.getDiscountedPrice()}{" "}
                              {lang === "en" ? "GEL" : "₾"}
                            </span>
                          </>
                        ) : (
                          <>
                            {product.price} {lang === "en" ? "GEL" : "₾"}
                          </>
                        )}
                      </p>

                      {cartItem ? (
                        <div className="flex items-center">
                          <ButtonGroup className="gap-2">
                            <Button
                              size="sm"
                              isIconOnly
                              //onClick={() => handleDecreaseQuantity(product)}
                              className="text-white text-3xl bg-red-600"
                            >
                              -
                            </Button>
                            <p className="text-lg">{cartItem.quantity}</p>
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => exonAddToCart(product)}
                              className="text-white text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => exonAddToCart(product)}
                          endContent={<AddToShoppingCart size={23} />}
                          className="text-white text-sm bg-green-600"
                        >
                          {lang === "en" ? "Add" : "დამატება"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full"></ModalFooter>
        </ModalContent>
      </Modal>
    </MenuLayout>
  );
}
