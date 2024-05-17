"use client";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
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
  Avatar,
  Checkbox,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import Product from "@/models/Product";
import toast, { Toaster } from "react-hot-toast";
import CartItem from "@/models/CartItem";
import { AddToShoppingCart } from "../icons";
import ProductNew from "@/models/ProductNew";
import ProductData from "@/models/ProductData";
import { fetchProductWithOptionsAndValues } from "@/app/api/Product";

interface CategorySectionProps {
  title: string;
  lang: string;
  biglayout?: boolean;
  products: ProductNew[];
  cartItems: CartItem[];
  onAddToCart: (cartItem: CartItem) => void;
  onUpdateCartItemQuantity: (product: Product, quantity: number) => void;
}

export interface CategorySectionRef {
  handleAddToCartFromParent: (product: Product) => void;
}

const CategorySection = forwardRef<CategorySectionRef, CategorySectionProps>(
  (
    {
      title,
      products,
      biglayout,
      cartItems,
      lang,
      onAddToCart,
      onUpdateCartItemQuantity,
    },
    ref
  ) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductNew | null>(
      null
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [customDescription, setCustomDescription] = useState("");
    const handleAddToCart = (product: ProductData) => {
      const fetchData = async () => {
        try {
          const data = await fetchProductWithOptionsAndValues(product.id);
          console.log(data);
          setSelectedProduct(data);
        } catch (error) {
          console.error("Error fetching product groups:", error);
        }
      };

      fetchData();
      onOpen();
    };

    useImperativeHandle(ref, () => ({
      handleAddToCartFromParent(product: Product) {
        //handleAddToCart(product);
      },
    }));

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
        if (lang === "en") {
          toast.success("Successfully Added to Cart!");
        } else {
          toast.success("დამატებულია კალათში !");
        }
      }
    };

    const handleIncreaseQuantity = async (product: Product) => {
      //setSelectedProduct(product); // Set the selected item
      onOpen();
    };

    const handleDecreaseQuantity = (product: Product) => {
      const existingCartItem = cartItems.find(
        (item) => item.product?.id === product.id
      );
      if (existingCartItem && existingCartItem.quantity > 1) {
        onUpdateCartItemQuantity(product, existingCartItem.quantity - 1);
      }
    };

    const handleOptionToggle = (optionId: number, valueId: number) => {
      if (selectedProduct) {
        const newSelectedProduct = new ProductNew(
          selectedProduct.id,
          selectedProduct.name_En,
          selectedProduct.name_Ka,
          selectedProduct.price,
          selectedProduct.imageUrl,
          selectedProduct.discount,
          selectedProduct.description_En,
          selectedProduct.description_Ka,
          selectedProduct.group_Id,
          selectedProduct.options,
          selectedProduct.tempDiscountedPrice ?? 0
        );

        // Find the selected option and its value
        const selectedOption = newSelectedProduct.options.find(
          (option) => option.id === optionId
        );
        const selectedValue = selectedOption?.optionValues.find(
          (value) => value.id === valueId
        );

        if (!selectedOption || !selectedValue) return; // Exit if option or value not found

        // Find the previously selected value
        const previouslySelectedValue = selectedOption.optionValues.find(
          (value) => value.selected
        );

        // Toggle the selection status
        newSelectedProduct.options = newSelectedProduct.options.map(
          (option) => {
            if (option.id === optionId) {
              return {
                ...option,
                optionValues: option.optionValues.map((value) =>
                  value.id === valueId
                    ? { ...value, selected: true }
                    : { ...value, selected: false }
                ),
              };
            }
            return option;
          }
        );

        // Decrement the price of the previously selected value if exists
        if (previouslySelectedValue) {
          newSelectedProduct.decrementPrice(
            optionId,
            previouslySelectedValue.id
          );
        }

        // Increment the price of the newly selected value
        newSelectedProduct.incrementPrice(optionId, valueId);

        setSelectedProduct(newSelectedProduct);
      }
    };

    return (
      <>
        <div className="p-2">
          <h1 className="ml-4 text-black dark:text-white font-bold text-3xl">
            {title}
          </h1>

          {biglayout ? (
            <div className="mt-4 grid  grid-cols-2 gap-4">
              {products.map((product, index) => {
                const cartItem = cartItems.find(
                  (item) => item.product?.id === product.id
                );
                const formatedPr: ProductData = product.getProductData(
                  lang === "en" ? "en" : "ka"
                );
                return (
                  <div key={index} className="w-full">
                    <div className="max-w-[200px] h-[350px] rounded-3xl border dark:bg-[#313638]/85 bg-white shadow-2xl text-center font-semibold ">
                      <Image
                        src={formatedPr.imageUrl ?? ""}
                        width={200}
                        alt="Sample Image"
                        className="rounded-3xl"
                      />
                      <h1 className="text-lg text-white">{formatedPr.price}</h1>
                      <h3 className="text-sm text-gray-400">
                        {formatedPr.description}
                      </h3>
                      <h3 className="text-sm mt-5">
                        {formatedPr.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through text-black dark:text-white">
                              {formatedPr.price} {lang === "en" ? "GEL" : "₾"}
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {formatedPr.discountedPrice}
                              {lang === "en" ? "GEL" : "₾"}
                            </span>
                          </>
                        ) : (
                          <>
                            <p className="text-black dark:text-white">
                              {formatedPr.price} {lang === "en" ? "GEL" : "₾"}
                            </p>
                          </>
                        )}
                      </h3>
                      {cartItem ? (
                        <div className="flex justify-center mt-4">
                          <ButtonGroup className="gap-2">
                            <Button
                              size="sm"
                              isIconOnly
                              //   onClick={() => handleDecreaseQuantity(product)}
                              className="text-white text-3xl bg-red-600"
                            >
                              -
                            </Button>
                            <p className="text-lg">{cartItem.quantity}</p>
                            <Button
                              size="sm"
                              isIconOnly
                              // onClick={() => handleIncreaseQuantity(product)}
                              className="text-white text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <Button
                          size="md"
                          //  onClick={() => handleAddToCart(product)}
                          endContent={<AddToShoppingCart size={24} />}
                          className="text-white text-sm mb-4 mt-4  rounded-3xl px-8 py-2 font-bold  bg-green-600"
                        >
                          {lang === "en" ? "Add" : "დამატება"}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            products.map((product, index) => {
              const cartItem = cartItems.find(
                (item) => item.product?.id === product.id
              );

              const formatedPr: ProductData = product.getProductData(
                lang === "en" ? "en" : "ka"
              );
              return (
                <div
                  className="flex justify-between dark:bg-[#313638]/85 bg-white shadow-2xl p-4 mt-2 rounded-2xl"
                  key={index}
                >
                  <Image
                    src={formatedPr.imageUrl ?? ""}
                    width={200}
                    alt="Sample Image"
                    className="rounded-lg"
                  />

                  <div className="ml-4  flex w-full flex-col justify-between">
                    <h1 className="text-md font-bold text-black dark:text-white ">
                      {formatedPr.name}
                    </h1>
                    <p className="text-xs/3 mt-2  dark:text-white/70 text-black/70">
                      {formatedPr.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="mr-2 text-sm text-black dark:text-white relative">
                        {formatedPr.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through">
                              {formatedPr.price} {lang === "en" ? "GEL" : "₾"}
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {formatedPr.discountedPrice}
                              {lang === "en" ? "GEL" : "₾"}
                            </span>
                          </>
                        ) : (
                          <>
                            {formatedPr.price} {lang === "en" ? "GEL" : "₾"}
                          </>
                        )}
                      </p>

                      {cartItem ? (
                        <div className="flex items-center">
                          <ButtonGroup className="gap-2">
                            <Button
                              size="sm"
                              isIconOnly
                              // onClick={() => handleDecreaseQuantity(product)}
                              className="text-white  text-3xl bg-red-600"
                            >
                              -
                            </Button>
                            <p className="text-lg">{cartItem.quantity}</p>
                            <Button
                              size="sm"
                              isIconOnly
                              //onClick={() => handleIncreaseQuantity(product)}
                              className="text-white  text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(formatedPr)}
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
            })
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
            <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
              {lang === "en" ? "Detail" : "დეტალები"}
            </ModalHeader>
            <ModalBody>
              {selectedProduct && (
                <>
                  <Image
                    src={selectedProduct.imageUrl ?? ""}
                    width="100%"
                    alt="Sample Image"
                    className="rounded-3xl"
                  />
                  <h1 className="text-lg font-bold text-black dark:text-white">
                    {lang === "en"
                      ? selectedProduct.name_Ka
                      : selectedProduct.name_Ka}
                  </h1>
                  <p className="text-sm text-black dark:text-white">
                    {lang === "en"
                      ? selectedProduct.description_En
                      : selectedProduct.description_Ka}
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
                          {selectedProduct.tempDiscountedPrice?.toFixed(2)}
                          {lang === "en" ? "GEL" : "₾"}
                        </span>
                      </>
                    ) : (
                      <>
                        {selectedProduct.price} {lang === "en" ? "GEL" : "₾"}
                      </>
                    )}
                  </p>

                  {selectedProduct.options.map((option) => (
                    <div key={option.id}>
                      <Divider className="my-3" />
                      <RadioGroup
                        label={lang === "en" ? option.name_En : option.name_Ka}
                      >
                        {option.type === "Radio"
                          ? option.optionValues.map((value, index) => (
                              <div
                                key={value.id}
                                className="flex items-center flex-col justify-between "
                              >
                                <Radio
                                  color="success"
                                  classNames={{
                                    base: cn(
                                      "inline-flex w-full max-w-md bg-content1",
                                      "hover:bg-content2 items-center justify-start",
                                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                      "data-[selected=true]:border-green-600"
                                    ),
                                    label: "w-full",
                                  }}
                                  description="არწერა შეიძლება"
                                  value={
                                    lang === "en"
                                      ? value.name_En
                                      : value.name_Ka
                                  }
                                  onChange={() =>
                                    handleOptionToggle(option.id, value.id)
                                  }
                                >
                                  {lang === "en"
                                    ? value.name_En
                                    : value.name_Ka}
                                </Radio>
                              </div>
                            ))
                          : option.optionValues.map((value) => (
                              <div
                                key={value.id}
                                className="flex items-center justify-between p-3"
                              >
                                <Checkbox
                                  defaultSelected={value.selected}
                                  size="lg"
                                  color="success"
                                  onChange={() =>
                                    handleOptionToggle(option.id, value.id)
                                  }
                                >
                                  {lang === "en"
                                    ? value.name_En
                                    : value.name_Ka}
                                </Checkbox>
                                <label className="ml-2 text-black dark:text-white">
                                  +{value.price} {lang === "en" ? "GEL" : "₾"}
                                </label>
                              </div>
                            ))}
                      </RadioGroup>
                    </div>
                  ))}

                  <Divider className="my-3" />

                  <h1 className="font-bold text-lg dark:text-white text-black">
                    {lang === "en"
                      ? "Add special instructions"
                      : "დაამატეთ განსაკუთრებული მითითებები"}
                  </h1>
                  <Textarea
                    variant="bordered"
                    size="lg"
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder={
                      lang === "ka"
                        ? "ალერგია,მნიშვნელოვანი დეტალები"
                        : "Allergies, important details"
                    }
                    className=" col-span-12 md:col-span-6 mb-64 "
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter className="flex flex-col justify-center w-full">
              <Button
                className="w-full bg-green-600 text-white"
                onClick={handleAddToCartModal}
                endContent={<AddToShoppingCart size={23} />}
              >
                {lang === "en" ? "Add" : "დამატება"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  }
);

CategorySection.displayName = "CategorySection";

export default CategorySection;
