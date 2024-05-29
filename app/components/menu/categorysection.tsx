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
  Chip,
  Input,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { AddToShoppingCart, MinusIcon, PlusIcon } from "../icons";
import ProductNew from "@/models/ProductNew";
import ProductData from "@/models/ProductData";
import { fetchProductWithOptionsAndValues } from "@/app/api/Product";
import CartItemNew from "@/models/CartItemNew";
import NextImage from "next/image";

interface CategorySectionProps {
  title: string;
  lang: string;
  biglayout?: boolean;
  products: ProductNew[];
  cartItems: CartItemNew[];
  onAddToCart: (cartItem: CartItemNew) => void;
  onUpdateCartItemQuantity: (product: ProductNew, quantity: number) => void;
  onSearchLoading: (isLoading: boolean) => void;
}

export interface CategorySectionRef {
  handleAddToCartFromParent: (product: ProductNew) => void;
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
      onSearchLoading,
    },
    ref
  ) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductNew | null>(
      null
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [customDescription, setCustomDescription] = useState("");
    const [extras, setExtras] = useState<{ [key: string]: string[] }>({});
    const handleAddToCart = (product: ProductData) => {
      setSelectedProduct(null); // Reset the selected item

      const selectedProduct = products.find((p) => p.id === product.id);
      if (selectedProduct) {
        onSearchLoading(false);
        setSelectedProduct(selectedProduct);
        onOpen();
      } else {
        const fetchData = async () => {
          try {
            const data = await fetchProductWithOptionsAndValues(product.id);
            setSelectedProduct(data);
            onSearchLoading(false);
            onOpen();
          } catch (error) {
            console.error("Error fetching product groups:", error);
          }
        };
        fetchData();
      }
    };

    useImperativeHandle(ref, () => ({
      handleAddToCartFromParent(product: ProductNew) {
        if (product) {
          const ConvertProductData: ProductData = {
            id: product.id,
            name: lang === "en" ? product.name_En : product.name_Ka,
            description:
              lang === "en" ? product.description_En : product.description_Ka,
            formattedPrice: product.price.toFixed(2),
            discountedPrice: product.DiscountedPrice?.toFixed(2) ?? "",
            price: product.price,
            imageUrl: product.imageUrl ?? "",
            discount: product.discount,
            options: product.options,
          };
          setCustomDescription("");
          setExtras({});
          handleAddToCart(ConvertProductData);
        }
      },
    }));

    const handleAddToCartModal = () => {
      if (selectedProduct) {
        onAddToCart({
          product: selectedProduct,
          quantity: 1,
          comment: customDescription,
          extras: extras,
          finalPrice:
            selectedProduct.discount !== 0
              ? selectedProduct.DiscountedPrice ?? 0
              : selectedProduct.price,
        });
        setCustomDescription("");
        setExtras({});
        onClose();
        if (lang === "en") {
          toast.success("Successfully Added to Cart!");
        } else {
          toast.success("დამატებულია კალათში !");
        }
      }
    };

    const handleIncreaseQuantity = async (product: ProductNew) => {
      setSelectedProduct(null);
      // const fetchData = async () => {
      //   try {
      //     const data = await fetchProductWithOptionsAndValues(product.id);
      //     setSelectedProduct(data); // Set the selected item
      //   } catch (error) {
      //     console.error("Error fetching product groups:", error);
      //   }
      // };

      // fetchData();
      const selectedProduct = products.find((p) => p.id === product.id);
      if (selectedProduct) {
        setSelectedProduct(selectedProduct);
        onOpen();
      }
    };

    const handleDecreaseQuantity = (product: ProductNew) => {
      const cartItem = cartItems.find(
        (item) => item.product?.id === product.id
      );

      if (cartItem) {
        if (cartItem.quantity > 1) {
          onUpdateCartItemQuantity(product, cartItem.quantity - 1);
        } else {
          const updatedCartItems = cartItems.filter(
            (item) => item.product?.id !== product.id
          );
          onUpdateCartItemQuantity(product, cartItem.quantity - 1);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      }
    };

    const handleOptionRadioToggle = (optionId: number, valueId: number) => {
      if (selectedProduct) {
<<<<<<< HEAD
=======
        // const newSelectedProduct = new ProductNew(
        //   selectedProduct.id,
        //   selectedProduct.name_En,
        //   selectedProduct.name_Ka,
        //   selectedProduct.price,
        //   selectedProduct.imageUrl,
        //   selectedProduct.discount,
        //   selectedProduct.description_En,
        //   selectedProduct.description_Ka,
        //   selectedProduct.group_Id,
        //   selectedProduct.options,
        //   selectedProduct.DiscountedPrice ?? 0
        // );

>>>>>>> ed1f625c9b893de1e181e76b3d26aecf7dfeb9ca
        // Find the selected option and its value
        const selectedOption = selectedProduct.options.find(
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
        selectedProduct.options = selectedProduct.options.map((option) => {
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
        });

        // Decrement the price of the previously selected value if exists
        if (previouslySelectedValue) {
          selectedProduct.decrementPrice(optionId, previouslySelectedValue.id);
          // Remove the previously selected value from extras
          setExtras((prevExtras) => ({
            ...prevExtras,
            ["en"]: prevExtras["en"]?.filter(
              (extra) => extra !== previouslySelectedValue.name_En
            ),
            ["ka"]: prevExtras["ka"]?.filter(
              (extra) => extra !== previouslySelectedValue.name_Ka
            ),
          }));
        }

        // Increment the price of the newly selected value
        selectedProduct.incrementPrice(optionId, valueId);

        // Add the newly selected value to extras
        setExtras((prevExtras) => ({
          ...prevExtras,
          ["en"]: [...(prevExtras["en"] || []), selectedValue.name_En],
          ["ka"]: [...(prevExtras["ka"] || []), selectedValue.name_Ka],
        }));

        setSelectedProduct(selectedProduct);
      }
    };

    const handleOptionCheckboxToggle = (optionId: number, valueId: number) => {
      if (selectedProduct) {
<<<<<<< HEAD
=======
        // const newSelectedProduct = new ProductNew(
        //   selectedProduct.id,
        //   selectedProduct.name_En,
        //   selectedProduct.name_Ka,
        //   selectedProduct.price,
        //   selectedProduct.imageUrl,
        //   selectedProduct.discount,
        //   selectedProduct.description_En,
        //   selectedProduct.description_Ka,
        //   selectedProduct.group_Id,
        //   selectedProduct.options,
        //   selectedProduct.DiscountedPrice ?? 0
        // );

>>>>>>> ed1f625c9b893de1e181e76b3d26aecf7dfeb9ca
        const selectedOption = selectedProduct.options.find(
          (option) => option.id === optionId
        );
        const selectedValue = selectedOption?.optionValues.find(
          (value) => value.id === valueId
        );

        if (!selectedOption || !selectedValue) return;

        const isCurrentlySelected = selectedValue.selected;

        selectedProduct.options = selectedProduct.options.map((option) => {
          if (option.id === optionId) {
            return {
              ...option,
              optionValues: option.optionValues.map((value) =>
                value.id === valueId
                  ? { ...value, selected: !value.selected }
                  : value
              ),
            };
          }
          return option;
        });

        if (isCurrentlySelected) {
          selectedProduct.decrementPrice(optionId, valueId);
          // Remove the deselected value from extras
          setExtras((prevExtras) => ({
            ...prevExtras,
            ["en"]: prevExtras["en"]?.filter(
              (extra) => extra !== selectedValue.name_En
            ),
            ["ka"]: prevExtras["ka"]?.filter(
              (extra) => extra !== selectedValue.name_Ka
            ),
          }));
        } else {
          selectedProduct.incrementPrice(optionId, valueId);
          // Add the newly selected value to extras
          setExtras((prevExtras) => ({
            ...prevExtras,
            ["en"]: [...(prevExtras["en"] || []), selectedValue.name_En],
            ["ka"]: [...(prevExtras["ka"] || []), selectedValue.name_Ka],
          }));
        }

        setSelectedProduct(selectedProduct);
      }
    };

    const [inputValues, setInputValues] = useState("");

    const handleOptionNumFieldChange = (quantity: string) => {
      setInputValues(quantity);
      if (!selectedProduct) return;
      // const newSelectedProduct = new ProductNew(
      //   selectedProduct.id,
      //   selectedProduct.name_En,
      //   selectedProduct.name_Ka,
      //   selectedProduct.price,
      //   selectedProduct.imageUrl,
      //   selectedProduct.discount,
      //   selectedProduct.description_En,
      //   selectedProduct.description_Ka,
      //   selectedProduct.group_Id,
      //   selectedProduct.options,
      //   selectedProduct.DiscountedPrice ?? 0
      // );

      if (quantity === "") return;
      var value = parseInt(quantity);
      if (selectedProduct.discount !== 0) {
        selectedProduct.DiscountedPrice =
          (selectedProduct?.StaticPrice ?? 0) * value;
      } else {
        selectedProduct.price = (selectedProduct?.StaticPrice ?? 0) * value;
      }
      setExtras((prevExtras) => ({
        ...prevExtras,
        en: prevExtras.en
          ?.filter((extra) => !extra.endsWith("x"))
          .concat([value.toString() + "x"]) || [value.toString() + "x"],
        ka: prevExtras.ka
          ?.filter((extra) => !extra.endsWith(" ცალი"))
          .concat([value.toString() + " ცალი"]) || [value.toString() + " ცალი"],
      }));
      setSelectedProduct(selectedProduct);
    };

    return (
      <>
        <div className="p-2">
          <h1 className="ml-4 text-black dark:text-white font-bold text-2xl">
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
                    <div className="max-w-[200px] h-auto rounded-3xl border dark:bg-[#313638]/85 bg-white shadow-2xl text-center font-semibold ">
                      <Image
                        src={formatedPr.imageUrl ?? ""}
                        width={200}
                        isZoomed
                        height={200}
                        as={NextImage}
                        alt="Sample Image"
                        className="rounded-3xl"
                      />
                      <h1 className="text-sm uppercase font-bold mt-3 mx-1">
                        {formatedPr.name}
                      </h1>
                      <h3 className="text-xs mt-3 mx-3 text-gray-400">
                        {formatedPr.description}
                      </h3>
                      <h3 className=" mt-5">
                        {formatedPr.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through text-xs text-slate-400">
                              {formatedPr.price.toFixed(2)}
                              <span className="">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {formatedPr.discountedPrice}
                              <span className="text-xs">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <p className="text-black dark:text-white">
                              {formatedPr.price.toFixed(2)}
                              <span className="text-xs">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </p>
                          </>
                        )}
                      </h3>
                      {cartItem ? (
                        <div className="flex justify-center  mb-4">
                          <div className="flex flex-row gap-4 items-center bg-white rounded-lg mt-4">
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleDecreaseQuantity(product)}
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
                              onClick={() => handleIncreaseQuantity(product)}
                              className="text-white  text-3xl bg-green-600"
                            >
                              <PlusIcon size={20} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="md"
                          onClick={() => handleAddToCart(formatedPr)}
                          startContent={<AddToShoppingCart size={24} />}
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
                    isZoomed
                    height={200}
                    as={NextImage}
                    alt="Sample Image"
                    className="rounded-lg h-28"
                  />

                  <div className="ml-4  flex w-full flex-col justify-between">
                    <h1 className="text-md uppercase font-bold text-black dark:text-white ">
                      {formatedPr.name}
                    </h1>
                    <p className="text-[11px] mt-1 leading-tight dark:text-white/70 text-black/70">
                      {formatedPr.description}
                    </p>

                    <div className="mt-auto  flex items-center justify-between">
                      <p className="mr-2 mt-4 text-black dark:text-white relative">
                        {formatedPr.discount !== 0 ? (
                          <p className="flex flex-col font-bold">
                            {/* Original price */}
                            <span className="line-through text-slate-400">
                              <span className="text-sm">
                                {formatedPr.price.toFixed(2)}
                              </span>
                              <span className="text-sm">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ">
                              {Number(formatedPr.discountedPrice).toFixed(2)}
                              <span className="text-xs">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>
                          </p>
                        ) : (
                          <>
                            <span className="text-md font-bold">
                              {formatedPr.price.toFixed(2)}
                            </span>{" "}
                            <span className="text-xs">
                              {lang === "en" ? "GEL" : "₾"}
                            </span>
                          </>
                        )}
                      </p>

                      {cartItem ? (
                        <div className="flex flex-row gap-4 items-center bg-white rounded-lg mt-4">
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() => handleDecreaseQuantity(product)}
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
                            onClick={() => handleIncreaseQuantity(product)}
                            className="text-white  text-3xl bg-green-600"
                          >
                            <PlusIcon size={20} />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(formatedPr)}
                          startContent={<AddToShoppingCart size={23} />}
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
          size="5xl"
          isOpen={isOpen}
          onClose={onClose}
          radius="md"
          scrollBehavior="inside"
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
              {lang === "en" ? "Detail" : "დეტალები"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                {selectedProduct && (
                  <>
                    <Image
                      src={selectedProduct.imageUrl ?? ""}
                      width={500}
                      isZoomed
                      height={500}
                      alt="Sample Image"
                      as={NextImage}
                      className="rounded-3xl"
                    />
                    <h1 className="text-lg font-bold text-black dark:text-white">
                      {lang === "en"
                        ? selectedProduct.name_Ka
                        : selectedProduct.name_Ka}
                    </h1>
                    <p className="text-sm text-black dark:text-white/50">
                      {lang === "en"
                        ? selectedProduct.description_En
                        : selectedProduct.description_Ka}
                    </p>
                    <p className="text-sm text-black dark:text-white">
                      {selectedProduct.discount !== 0 ? (
                        <>
                          {/* Original price */}
                          <span className="line-through text-slate-400">
<<<<<<< HEAD
                            {selectedProduct.originalPrice.toFixed(2)}{" "}
=======
                            {selectedProduct.originalPrice?.toFixed(2)}{" "}
>>>>>>> ed1f625c9b893de1e181e76b3d26aecf7dfeb9ca
                            {lang === "en" ? "GEL" : "₾"}
                          </span>

                          {/* Discounted price */}
                          <span className="text-green-500 ml-1">
<<<<<<< HEAD
                            {selectedProduct.originalDiscountedPrice?.toFixed(
                              2
                            )}
=======
                            {selectedProduct.originalDiscountPrice?.toFixed(2)}
>>>>>>> ed1f625c9b893de1e181e76b3d26aecf7dfeb9ca
                            {lang === "en" ? "GEL" : "₾"}
                          </span>
                        </>
                      ) : (
                        <>
<<<<<<< HEAD
                          {selectedProduct.originalPrice.toFixed(2)}{" "}
=======
                          {selectedProduct.originalPrice?.toFixed(2)}
>>>>>>> ed1f625c9b893de1e181e76b3d26aecf7dfeb9ca
                          {lang === "en" ? "GEL" : "₾"}
                        </>
                      )}
                    </p>

                    {selectedProduct.options.map((option) => (
                      <div key={option.id}>
                        <Divider className="my-3" />
                        <RadioGroup
                          label={
                            lang === "en" ? option.name_En : option.name_Ka
                          }
                        >
                          {option.type === "Radio"
                            ? option.optionValues.map((value, index) => (
                                <div
                                  key={value.id}
                                  className="flex items-center flex-col p-1 justify-between"
                                >
                                  <Radio
                                    color="success"
                                    classNames={{
                                      base: cn(
                                        "inline-flex w-full max-w-md bg-content1",
                                        "hover:bg-content2 items-center justify-start",
                                        "cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
                                        "data-[selected=true]:border-primary"
                                      ),
                                      label: "w-full",
                                    }}
                                    value={
                                      lang === "en"
                                        ? value.name_En
                                        : value.name_Ka
                                    }
                                    onChange={() =>
                                      handleOptionRadioToggle(
                                        option.id,
                                        value.id
                                      )
                                    }
                                  >
                                    <div className="w-full flex justify-between gap-2">
                                      {lang === "en"
                                        ? value.name_En
                                        : value.name_Ka}
                                      <div className="flex flex-col items-end gap-1">
                                        <Chip
                                          color="success"
                                          size="sm"
                                          variant="flat"
                                        >
                                          +{value.price}{" "}
                                          {lang === "en" ? "GEL" : "₾"}
                                        </Chip>
                                      </div>
                                    </div>
                                  </Radio>
                                </div>
                              ))
                            : option.type === "CheckBox"
                            ? option.optionValues.map((value) => (
                                <div
                                  key={value.id}
                                  className="flex items-center justify-between p-3"
                                >
                                  <Checkbox
                                    defaultSelected={value.selected}
                                    size="lg"
                                    color="success"
                                    onChange={() =>
                                      handleOptionCheckboxToggle(
                                        option.id,
                                        value.id
                                      )
                                    }
                                  >
                                    {lang === "en"
                                      ? value.name_En
                                      : value.name_Ka}
                                  </Checkbox>
                                  <div className="flex flex-col items-end gap-1">
                                    <Chip
                                      color="success"
                                      size="sm"
                                      variant="flat"
                                    >
                                      +{value.price}{" "}
                                      {lang === "en" ? "GEL" : "₾"}
                                    </Chip>
                                  </div>
                                </div>
                              ))
                            : option.type === "NumField"
                            ? option.optionValues.map((value) => (
                                <div
                                  key={value.id}
                                  className="flex items-center justify-between p-3"
                                >
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    className="mr-2"
                                    classNames={{
                                      base: "max-w-full sm:max-w-[10rem] h-10",
                                      mainWrapper: "h-full",
                                      input: "text-[16px]",
                                    }}
                                    inputMode="numeric"
                                    value={inputValues}
                                    onValueChange={(value) => {
                                      handleOptionNumFieldChange(value);
                                    }}
                                  />
                                  <div className="flex flex-col items-end gap-1">
                                    <Chip
                                      color="success"
                                      size="sm"
                                      variant="flat"
                                    >
                                      +
                                      {(
                                        selectedProduct?.StaticPrice ?? 0
                                      ).toFixed(2)}
                                      {lang === "en" ? "GEL" : "₾"}
                                    </Chip>
                                  </div>
                                </div>
                              ))
                            : null}
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
                      classNames={{
                        input: "text-[16px]",
                      }}
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
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col justify-center w-full">
              <div className="flex">
                <h1 className="font-bold dark:text-white text-black text-sm flex flex-col justify-between p-1">
                  {lang === "en" ? "Total:" : "სულ:"}{" "}
                  <span>
                    {selectedProduct?.discount !== 0 ? (
                      <>
                        <span className="text-green-500 text-sm mr-4 flex gap-1">
                          {selectedProduct?.DiscountedPrice?.toFixed(2)}
                          <span>{lang === "en" ? "GEL" : "₾"}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm mr-4 flex flex-row gap-1">
                          {selectedProduct.price.toFixed(2)}
                          <span>{lang === "en" ? "GEL" : "₾"}</span>
                        </span>
                      </>
                    )}
                  </span>
                </h1>
                <Button
                  className="w-full bg-green-600 text-white"
                  onClick={handleAddToCartModal}
                  endContent={<AddToShoppingCart size={23} />}
                >
                  {lang === "en" ? "Add" : "დამატება"}
                </Button>
              </div>
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
