"use client";
import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState } from "react";
import CategorySectionAdmin, {
  CategorySectionRef,
} from "@/app/components/admin/admincategorysection";
import { MenuLayout } from "../layouts/MenuLayout";
import BottomCart from "@/app/components/Cart/bottomCart";
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
import CartItemNew from "@/models/CartItemNew";
import ProductNew from "@/models/ProductNew";
import AddGroup from "@/app/components/admin/addgroup";

export default function AdminPage({
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
      const updatedCartItems = prevCartItems.map((cartItem) => {
        if (cartItem.product?.id === product.id) {
          return { ...cartItem, quantity } as CartItemNew;
        }
        return cartItem;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
    if (product) {
      if (categorySectionRef.current) {
        categorySectionRef.current.handleAddToCartFromParent(product);
      }
    }
  };
  const handlenewGroupAdd = (newGroup: ProductGroup) => {
    setProductGroups((prevProductGroups) => [...prevProductGroups, newGroup]);
  };

  const updateGroup = (updatedGroup: ProductGroup) => {
    setProductGroups((prevProductGroups) => {
      const updatedGroups = prevProductGroups.map((group) =>
        group.id === updatedGroup.id
          ? {
              ...group,
              name_Ka: updatedGroup.name_Ka,
              name_En: updatedGroup.name_En,
            }
          : group
      );
      return updatedGroups;
    });
  };

  const updateProduct = (updatedProduct: ProductNew) => {
    setProductGroups((prevProductGroups) => {
      const updatedGroups = prevProductGroups.map((group) => {
        if (group.id === updatedProduct.group_Id) {
          const updatedProducts = group.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          return { ...group, products: updatedProducts };
        }
        return group;
      });
      return updatedGroups;
    });
  };
  const onDeleteGroup = (groupId: number) => {
    setProductGroups((prevProductGroups) =>
      prevProductGroups.filter((group) => group.id !== groupId)
    );
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
            <CategorySectionAdmin
              key={group.id}
              ref={categorySectionRef}
              biglayout={changelayout}
              title={lang === "en" ? group.name_En : group.name_Ka}
              groupid={group.id}
              name_en={group.name_En}
              name_ka={group.name_Ka}
              products={group.products}
              lang={lang}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              onDeleteGroup={onDeleteGroup}
              onUpdateGroup={updateGroup}
              onUpdateProduct={updateProduct}
              onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            />
          );
        })}

      <AddGroup lang={lang} onAddnewGroup={handlenewGroupAdd} />

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
                    alt="Sample Image"
                    className="rounded-lg"
                  />

                  <div className="ml-4  flex w-full flex-col justify-between">
                    <h1 className="text-md font-bold text-black dark:text-white ">
                      {lang === "en" ? product?.name_En : product?.name_Ka}
                    </h1>
                    <p className="text-xs/3 mt-2 dark:text-white/70 text-black/70">
                      {lang === "en"
                        ? product?.description_En
                        : product?.description_Ka}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="mr-2 text-sm text-black dark:text-white relative">
                        {product?.discount !== 0 ? (
                          <>
                            <span className="line-through">
                              {product?.price} {lang === "en" ? "GEL" : "₾"}
                            </span>

                            <span className="text-green-500 ml-1">
                              {product?.DiscountedPrice}{" "}
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
                              onClick={() => product && exonAddToCart(product)}
                              className="text-white text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <Button
                          size="sm"
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
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full"></ModalFooter>
        </ModalContent>
      </Modal>
    </MenuLayout>
  );
}