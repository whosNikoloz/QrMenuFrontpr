"use client";
import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState } from "react";
import CategorySectionAdmin, {
  CategorySectionAdminRef,
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
import {
  AddIcon,
  AddToShoppingCart,
  EditIcon,
  SearchIcon,
} from "@/app/components/icons";
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

  const categorySectionRef = useRef<CategorySectionAdminRef>(null);

  const exonEditProduct = (product: ProductNew) => {
    if (product) {
      if (categorySectionRef.current) {
        categorySectionRef.current.onEditProductOptions(product);
      }
    }
  };

  const exonEditProductOptions = (product: ProductNew) => {
    if (product) {
      if (categorySectionRef.current) {
        categorySectionRef.current.onEditProduct(product);
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
              onDeleteGroup={onDeleteGroup}
              onUpdateGroup={updateGroup}
              onUpdateProduct={updateProduct}
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

                      <div className="flex flex-row gap-2">
                        <Button
                          size="md"
                          onClick={() => product && exonEditProduct(product)}
                          className="text-white text-sm bg-transparent"
                          isIconOnly
                        >
                          <EditIcon size={30} />
                        </Button>
                        <Button
                          size="md"
                          onClick={() =>
                            product && exonEditProductOptions(product)
                          }
                          isIconOnly
                          className="text-green-600 text-sm bg-transparent"
                        >
                          <AddIcon size={30} />
                        </Button>
                      </div>
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
