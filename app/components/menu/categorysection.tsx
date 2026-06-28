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
       

        const selectedOption = selectedProduct.options.find(
          (option) => option.id === optionId
        );
        const selectedValue = selectedOption?.optionValues.find(
          (value) => value.id === valueId
        );
        if (!selectedOption || !selectedValue) return; 

        const previouslySelectedValue = selectedOption.optionValues.find(
          (value) => value.selected
        );

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

        if (previouslySelectedValue) {
          selectedProduct.decrementPrice(optionId, previouslySelectedValue.id);
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

        selectedProduct.incrementPrice(optionId, valueId);

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
        <div className="w-full flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="w-full max-w-7xl">
            {biglayout ? (
              <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-black dark:text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-5 lg:mb-6 tracking-tight">
                  {title}
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {products.map((product, index) => {
                const cartItem = cartItems.find(
                  (item) => item.product?.id === product.id
                );
                const formatedPr: ProductData = product.getProductData(
                  lang === "en" ? "en" : "ka"
                );

                return (
                  <div key={index} className="w-full max-w-[200px] group">
                    <div className="w-full h-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]
                     hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={formatedPr.imageUrl ?? ""}
                          width={200}
                          isZoomed
                          height={200}
                          as={NextImage}
                          alt="Sample Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 flex flex-col flex-grow">
                        <h1 className="text-sm font-bold text-black dark:text-white line-clamp-2 mb-1">
                          {formatedPr.name}
                        </h1>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {formatedPr.description}
                        </p>
                        <div className="mt-auto space-y-2">
                          <div className="text-center">
                            {formatedPr.discount !== 0 ? (
                              <div className="space-y-0.5">
                                <div className="line-through text-xs text-gray-400">
                                  {formatedPr.price.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                                </div>
                                <div className="text-green-600 dark:text-green-500 text-base font-bold">
                                  {formatedPr.discountedPrice} {lang === "en" ? "GEL" : "₾"}
                                </div>
                              </div>
                            ) : (
                              <div className="text-black dark:text-white text-base font-bold">
                                {formatedPr.price.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                              </div>
                            )}
                          </div>
                          {cartItem ? (
                            <div className="flex justify-center">
                              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1">
                                <Button
                                  size="sm"
                                  isIconOnly
                                  onClick={() => handleDecreaseQuantity(product)}
                                  className="text-white bg-green-600 hover:bg-green-700 min-w-6 h-6"
                                >
                                  <MinusIcon size={12} />
                                </Button>
                                <span className="text-sm font-semibold text-black dark:text-white min-w-[1.25rem] text-center">
                                  {cartItem.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  isIconOnly
                                  onClick={() => handleIncreaseQuantity(product)}
                                  className="text-white bg-green-600 hover:bg-green-700 min-w-6 h-6"
                                >
                                  <PlusIcon size={12} />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(formatedPr)}
                              startContent={<AddToShoppingCart size={14} />}
                              className="w-full text-white text-xs font-semibold rounded-lg py-1.5 bg-green-600 hover:bg-green-700 transition-colors"
                            >
                              {lang === "en" ? "Add" : "დამატება"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              <h1 className="text-black dark:text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-5 lg:mb-6 tracking-tight">
                {title}
              </h1>
              <div className="space-y-2 sm:space-y-3">
              {products.map((product, index) => {
                const cartItem = cartItems.find(
                  (item) => item.product?.id === product.id
                );
                const formatedPr: ProductData = product.getProductData(
                  lang === "en" ? "en" : "ka"
                );
                return (
                  <div
                    className="flex justify-between dark:bg-[#313638]/85 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-3 sm:p-4 lg:p-5 rounded-2xl"
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

                  <div className="ml-4 flex w-full flex-col justify-between">
                    <h1 className="font-bold text-black dark:text-white">
                      {formatedPr.name}
                    </h1>
                    <p className="text-xs/3 mt-2 leading-tight dark:text-white/70 text-black/70">
                      {formatedPr.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="mr-2 text-md font-bold text-black dark:text-white relative">
                        {formatedPr.discount !== 0 ? (
                          <p className="flex flex-col">
                            <span className="line-through text-slate-400">
                              {formatedPr.price.toFixed(2)} {lang === "en" ? " GEL" : " ₾"}
                            </span>
                            <span className="text-green-500">
                              {Number(formatedPr.discountedPrice).toFixed(2)}
                              <span className="text-sm">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>
                          </p>
                        ) : (
                          <>
                            {formatedPr.price.toFixed(2)}
                            <span className="text-sm">
                              {lang === "en" ? " GEL" : " ₾"}
                            </span>
                          </>
                        )}
                      </p>
                      <div className="flex flex-row">
                        {cartItem ? (
                          <div className="flex flex-row gap-2 items-center bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleDecreaseQuantity(product)}
                              className="text-white bg-green-600 hover:bg-green-700 min-w-7 h-7"
                            >
                              <MinusIcon size={14} />
                            </Button>
                            <p className="text-sm font-bold text-black dark:text-white min-w-[1.25rem] text-center">
                              {cartItem.quantity}
                            </p>
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleIncreaseQuantity(product)}
                              className="text-white bg-green-600 hover:bg-green-700 min-w-7 h-7"
                            >
                              <PlusIcon size={14} />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(formatedPr)}
                            startContent={<AddToShoppingCart size={16} />}
                            className="text-white text-xs bg-green-600 hover:bg-green-700 transition-colors px-3"
                          >
                            {lang === "en" ? "Add" : "დამატება"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
              </div>
            </div>
          )}
          </div>
        </div>
        <Modal
          size="5xl"
          isOpen={isOpen}
          onClose={onClose}
          radius="lg"
          scrollBehavior="inside"
          backdrop="blur"
          className="mx-2 sm:mx-4 lg:mx-6"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 dark:text-white text-black px-4 sm:px-6 lg:px-8 text-lg sm:text-xl lg:text-2xl font-bold">
              {lang === "en" ? "Product Details" : "პროდუქტის დეტალები"}
            </ModalHeader>
            <ModalBody className="px-4 sm:px-6 lg:px-8 pb-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-6xl mx-auto w-full">
                {selectedProduct && (
                  <>
                    {/* Image Section - Left side on desktop */}
                    <div className="lg:w-2/5 lg:flex-shrink-0">
                      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:sticky lg:top-0">
                        <Image
                          src={selectedProduct.imageUrl ?? ""}
                          width={500}
                          isZoomed
                          height={500}
                          alt="Sample Image"
                          as={NextImage}
                          className="w-full max-h-[250px] sm:max-h-[350px] lg:max-h-[500px] object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Section - Right side on desktop */}
                    <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white uppercase tracking-tight">
                          {lang === "en"
                            ? selectedProduct.name_En
                            : selectedProduct.name_Ka}
                        </h1>
                        <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 leading-relaxed">
                          {lang === "en"
                            ? selectedProduct.description_En
                            : selectedProduct.description_Ka}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 py-2 sm:py-3 border-y dark:border-gray-700">
                        <span className="text-sm sm:text-base text-black/60 dark:text-white/60">
                          {lang === "en" ? "Price:" : "ფასი:"}
                        </span>
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-black dark:text-white">
                        {selectedProduct.discount !== 0 ? (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="line-through text-slate-400 text-sm sm:text-base">
                              {selectedProduct.originalPrice?.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                            </span>
                            <span className="text-green-500 text-lg sm:text-xl lg:text-2xl">
                              {selectedProduct.originalDiscountPrice?.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                            </span>
                          </div>
                        ) : (
                          <>
                            {selectedProduct.originalPrice?.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                          </>
                        )}
                      </p>
                      </div>

                    {selectedProduct.options.map((option) => (
                      <div key={option.id} className="space-y-3 sm:space-y-4">
                        <Divider className="my-2 sm:my-3" />
                        <RadioGroup
                          classNames={{
                            label: "text-base sm:text-lg font-semibold dark:text-white text-black"
                          }}
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

                    <Divider className="my-3 sm:my-4" />

                      <div className="space-y-2 sm:space-y-3">
                        <h1 className="font-bold text-base sm:text-lg lg:text-xl dark:text-white text-black">
                          {lang === "en"
                            ? "Add special instructions"
                            : "დაამატეთ განსაკუთრებული მითითებები"}
                        </h1>
                        <Textarea
                          variant="bordered"
                          size="lg"
                          minRows={3}
                          maxRows={6}
                          classNames={{
                            input: "text-sm sm:text-base",
                            inputWrapper: "py-2"
                          }}
                          onChange={(e) => setCustomDescription(e.target.value)}
                          placeholder={
                            lang === "ka"
                              ? "ალერგია, მნიშვნელოვანი დეტალები"
                              : "Allergies, important details"
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col justify-center w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-t dark:border-gray-700">
              <div className="flex flex-col sm:flex-row w-full max-w-6xl mx-auto gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex items-center justify-between sm:justify-start gap-2 px-4 py-3 sm:py-0 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:bg-transparent sm:dark:bg-transparent">
                  <span className="font-semibold dark:text-white text-black text-sm sm:text-base">
                    {lang === "en" ? "Total:" : "სულ:"}
                  </span>
                  <span className="font-bold dark:text-white text-black text-lg sm:text-xl lg:text-2xl">
                    {selectedProduct?.discount !== 0 ? (
                      <span className="text-green-500">
                        {selectedProduct?.DiscountedPrice?.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                      </span>
                    ) : (
                      <>
                        {selectedProduct?.price.toFixed(2)} {lang === "en" ? "GEL" : "₾"}
                      </>
                    )}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base py-6 sm:py-7 transition-colors"
                  onClick={handleAddToCartModal}
                  endContent={<AddToShoppingCart size={20} />}
                >
                  {lang === "en" ? "Add to Cart" : "კალათში დამატება"}
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
