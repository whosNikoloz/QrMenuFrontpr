"use client";
import React, { useEffect, useState } from "react";
import {
  Image,
  Button,
  Card,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Divider,
  Textarea,
} from "@nextui-org/react";
import Product from "@/models/Product";
import CartItem from "@/models/CartItem";

interface CategorySectionProps {
  title: string;
  lang: string;
  biglayout?: boolean;
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (cartItem: CartItem) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  products,
  biglayout,
  lang,
  onAddToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customDescription, setCustomDescription] = useState("");

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product); // Set the selected item
    onOpen();
    // if (onAddToCart) {
    //   onAddToCart(item);
    //   setSelectedItem(item); // Set the selected item
    //   onOpen(); // Open the modal
    // }
  };

  const handleAddToCartModal = () => {
    if (selectedProduct) {
      onAddToCart({
        product: selectedProduct,
        quantity: 1,
        customDescription: customDescription,
        extraItems: [],
        getItemInfo: function (): {
          product: any;
          quantity: number;
          customDescription: string;
          extraItems: any[];
        } {
          throw new Error("Function not implemented.");
        },
      });
      onClose();
    }
  };

  return (
    <>
      <div className="p-2">
        <h1 className="ml-4 text-black dark:text-white font-bold text-xl">
          {title}
        </h1>

        {biglayout ? (
          <div className="mt-4 grid  grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div key={index} className="w-full">
                <div className="max-w-[200px] h-[320px] rounded-3xl border bg-[#313638]/85 text-center font-semibold shadow-lg">
                  <Image
                    src={product.imageUrl}
                    width={200}
                    alt="Sample Image"
                    className="rounded-3xl"
                  />
                  <h1 className="text-lg text-white">{product.name}</h1>
                  <h3 className="text-sm text-gray-400">
                    {product.description}
                  </h3>
                  <h3 className="text-sm mt-5">
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
                  </h3>
                  <Button
                    size="md"
                    onClick={() => handleAddToCart(product)}
                    className="text-white text-sm mb-4 mt-4  rounded-3xl px-8 py-2 font-bold  bg-green-600"
                  >
                    დამატება
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          products.map((product, index) => (
            <div
              className="flex justify-between bg-[#313638]/85 p-4 mt-2 rounded-2xl"
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
                <p className="text-xs/3 text-white/70">{product.description}</p>

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

                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="text-white text-xs bg-green-600"
                  >
                    დამატება
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
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
          <ModalHeader className="flex flex-col gap-1">
            {lang === "en" ? "Detail" : "დეტალები"}
          </ModalHeader>
          <ModalBody>
            {selectedProduct && (
              <>
                <Image
                  src={selectedProduct.imageUrl}
                  width="100%"
                  alt="Sample Image"
                  className="rounded-3xl"
                />
                <h1 className="text-lg font-bold text-black dark:text-white">
                  {selectedProduct.name}
                </h1>
                <p className="text-sm text-black dark:text-white">
                  {selectedProduct.description}
                </p>
                <p className="text-sm text-black dark:text-white">
                  {selectedProduct.discount !== 0 ? (
                    <>
                      {/* Original price */}
                      <span className="line-through">
                        {selectedProduct.price} {lang === "en" ? "GEL" : "₾"}
                      </span>

                      {/* Discounted price */}
                      <span className="text-green-500 ml-1">
                        {selectedProduct.getDiscountedPrice()}{" "}
                        {lang === "en" ? "GEL" : "₾"}
                      </span>
                    </>
                  ) : (
                    <>
                      {selectedProduct.price} {lang === "en" ? "GEL" : "₾"}
                    </>
                  )}
                </p>
                <Divider className="my-3" />

                <h1 className="font-bold text-lg">
                  დაამატეთ განსაკუთრებული მითითებები
                </h1>
                <Textarea
                  variant="bordered"
                  size="lg"
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="ალერგია,მნისშვნელოვანი დეტალები"
                  className=" col-span-12 md:col-span-6 mb-64 "
                />
              </>
            )}
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full">
            <Button
              className="w-full bg-green-600"
              onClick={handleAddToCartModal}
            >
              {lang === "en" ? "Add" : "დამატება"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategorySection;
