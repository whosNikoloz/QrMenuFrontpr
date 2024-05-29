"use client";
import { Locale } from "@/i18n.config";
import React, { Suspense, useEffect, useRef, useState } from "react";
import CategorySection, {
  CategorySectionRef,
} from "@/app/components/menu/categorysection";
import { MenuLayout } from "../layouts/MenuLayout";
import BottomCart from "@/app/components/Cart/bottomCart";
import SkeletonCard from "@/app/components/CardSkeletons";
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
  Card,
  CardHeader,
} from "@nextui-org/react";
import {
  AddToShoppingCart,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "@/app/components/icons";
import { fetchProductGroups } from "@/app/api/ProductGroup";
import ProductGroup from "@/models/ProductGroup";
import CartItemNew from "@/models/CartItemNew";
import ProductNew from "@/models/ProductNew";
import NextImage from "next/image";

export default function MenuPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductGroups();
        console.log(data);
        setProductGroups(data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching product groups:", error);
      }
    };
    fetchData();
  }, []);

  const [changelayout, setChangelayout] = React.useState(false);
  function toggleLayout(arg: boolean) {
    setChangelayout(arg);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cartItems, setCartItems] = useState<CartItemNew[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      try {
        const parsedCartItems: CartItemNew[] = JSON.parse(storedCartItems);

        setCartItems(parsedCartItems); // Set cart items in state
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }
  }, []);

  const sortExtras = (extras: { [key: string]: string[] }): string => {
    const sortedExtras: { [key: string]: string[] } = {};
    const keys = Object.keys(extras).sort();

    keys.forEach((key) => {
      sortedExtras[key] = [...extras[key]].sort();
    });

    return JSON.stringify(sortedExtras);
  };

  const handleAddToCart = (cartItem: CartItemNew) => {
    setCartItems((prevCartItems: CartItemNew[]) => {
      const itemIndex = prevCartItems.findIndex(
        (item) =>
          item.product.id === cartItem.product.id &&
          item.comment === cartItem.comment &&
          sortExtras(item.extras) === sortExtras(cartItem.extras)
      );

      let newCartItems: CartItemNew[];
      if (itemIndex > -1) {
        // Item exists, update the quantity
        newCartItems = prevCartItems.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                quantity: item.quantity + cartItem.quantity,
              }
            : item
        );
      } else {
        // Item does not exist, add as new item
        newCartItems = [...prevCartItems, cartItem];
      }

      localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // Store updated items in localStorage
      return newCartItems; // Update state with new items
    });
  };

  function handleUpdateCartItemQuantity(product: ProductNew, quantity: number) {
    setCartItems((prevCartItems: CartItemNew[]) => {
      const updatedCartItems = prevCartItems
        .map((cartItem) => {
          if (cartItem.product?.id === product.id) {
            return { ...cartItem, quantity } as CartItemNew;
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity !== 0);

      return updatedCartItems;
    });
  }

  const combinedProducts = productGroups
    .map((group) => {
      if (!group || !group.id || !group.products) {
        return null; // Skip this iteration if group, group.id, or group.products is undefined
      }
      return group.products;
    })
    .flat();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = combinedProducts.filter(
    (product) =>
      product?.name_En.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.name_Ka.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorySectionRef = useRef<CategorySectionRef>(null);

  const exonAddToCart = (product: ProductNew) => {
    setSearchButtonLoading(true);
    if (product) {
      if (categorySectionRef.current) {
        console.log("categorySectionRef", categorySectionRef);
        categorySectionRef.current.handleAddToCartFromParent(product);
      }
    }
  };

  const handleonCartItemsChange = (cartItems: CartItemNew[]) => {
    setCartItems(cartItems);
  };

  const [serachButtonLoading, setSearchButtonLoading] = useState(false);
  function handleSearchLoading(isLoadingAdd: boolean) {
    setSearchButtonLoading(isLoadingAdd);
  }

  return (
    <MenuLayout
      lang={lang}
      toggleLayout={toggleLayout}
      eopenSearch={() => onOpen()}
    >
      {isFetching ? (
        <SkeletonCard lng={lang} />
      ) : (
        Array.isArray(productGroups) &&
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
              onSearchLoading={handleSearchLoading}
            />
          );
        })
      )}
      <div className="justify-center bg-transparent items-center flex mb-24">
        <BottomCart
          lng={lang}
          CartItems={cartItems}
          onCartItemsChange={handleonCartItemsChange}
        />{" "}
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
                    "h-full font-normal  text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder={lang === "en" ? "Type to search..." : "ძებნა..."}
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <div>
              {filteredProducts.map((product, index) => {
                const cartItem = cartItems.find(
                  (item) => item.product?.id === product?.id
                );

                return (
                  <div
                    className="flex justify-between dark:bg-[#313638]/85 bg-white shadow-2xl p-4 mt-2 rounded-2xl"
                    key={index}
                  >
                    <Image
                      src={product?.imageUrl ?? ""}
                      width={200}
                      height={200}
                      isZoomed
                      as={NextImage}
                      alt="Sample Image"
                      className="rounded-lg h-28"
                    />

                    <div className="ml-4  flex w-full flex-col justify-between">
                      <h1 className="text-md uppercase font-bold text-black dark:text-white ">
                        {lang === "en" ? product?.name_En : product?.name_Ka}
                      </h1>
                      <p className="text-[11px] mt-1 leading-tight dark:text-white/70 text-black/70">
                        {lang === "en"
                          ? product?.description_En
                          : product?.description_Ka}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="mr-2  text-black dark:text-white relative">
                          {product?.discount !== 0 ? (
                            <>
                              <span className="line-through text-xs text-slate-400">
                                {product?.price} {lang === "en" ? " GEL" : "₾"}
                              </span>

                              <span className="text-green-500 ml-1">
                                <span className="text-sm">
                                  {product?.DiscountedPrice?.toFixed(2)}
                                </span>
                                <span className="text-xs">
                                  {lang === "en" ? " GEL" : " ₾"}
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm">{product.price}</span>
                              <span className="text-xs">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </>
                          )}
                        </p>

                        {cartItem ? (
                          <div className="flex items-center">
                            <div className="flex flex-row gap-4 items-center bg-white rounded-lg mt-4">
                              <Button
                                size="sm"
                                isIconOnly
                                // onClick={() => handleDecreaseQuantity(product)}
                                className="text-white text-3xl bg-green-600"
                              >
                                <MinusIcon size={20} />
                              </Button>
                              <p className="text-lg text-black">
                                {cartItem.quantity}
                              </p>
                              <Button
                                size="sm"
                                isIconOnly
                                isLoading={serachButtonLoading}
                                onClick={() =>
                                  product && exonAddToCart(product)
                                }
                                className="text-white  text-3xl bg-green-600"
                              >
                                <PlusIcon size={20} />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            isLoading={serachButtonLoading}
                            onClick={() => product && exonAddToCart(product)}
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
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full"></ModalFooter>
        </ModalContent>
      </Modal>
    </MenuLayout>
  );
}
