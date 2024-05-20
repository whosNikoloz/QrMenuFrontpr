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
import { AddIcon, AddToShoppingCart, EditIcon } from "../icons";
import ProductNew from "@/models/ProductNew";
import ProductData from "@/models/ProductData";
import {
  deleteProduct,
  editProduct,
  fetchProductWithOptionsAndValues,
} from "@/app/api/Product";
import CartItemNew from "@/models/CartItemNew";
import { editProductGroup } from "@/app/api/ProductGroup";
import ProductGroup from "@/models/ProductGroup";
import AddProduct from "./AddProductFunc";

interface CategorySectionProps {
  groupid: number;
  name_ka: string;
  name_en: string;
  title: string;
  lang: string;
  biglayout?: boolean;
  products: ProductNew[];
  cartItems: CartItemNew[];
  onAddToCart: (cartItem: CartItemNew) => void;
  onUpdateGroup: (group: ProductGroup) => void;
  onDeleteGroup: (groupid: number) => void;
  onUpdateCartItemQuantity: (product: ProductNew, quantity: number) => void;
  onUpdateProduct: (product: ProductNew) => void;
}

export interface CategorySectionRef {
  handleAddToCartFromParent: (product: ProductNew) => void;
}

const CategorySectionAdmin = forwardRef<
  CategorySectionRef,
  CategorySectionProps
>(
  (
    {
      groupid,
      name_ka,
      name_en,
      title,
      products,
      biglayout,
      cartItems,
      lang,
      onAddToCart,
      onUpdateGroup,
      onDeleteGroup,
      onUpdateCartItemQuantity,
      onUpdateProduct,
    },
    ref
  ) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductNew | null>(
      null
    );
    const {
      isOpen: isOpenProductModal,
      onOpen: onOpenProductModal,
      onClose: onCloseProductModal,
    } = useDisclosure();
    const {
      isOpen: isOpenGroupModal,
      onOpen: onOpenGroupModal,
      onClose: onCloseGroupModal,
      onOpenChange: onOpenGroupChange,
    } = useDisclosure();

    const {
      isOpen: isOpenProductAddModal,
      onOpen: onOpenProductAddModal,
      onClose: onCloseProductAddModal,
      onOpenChange: onOpenProductAddChange,
    } = useDisclosure();

    const [customDescription, setCustomDescription] = useState("");
    const [extras, setExtras] = useState<{ [key: string]: string[] }>({});
    const handleAddToCart = (product: ProductData) => {
      const fetchData = async () => {
        try {
          const data = await fetchProductWithOptionsAndValues(product.id);
          setSelectedProduct(data);
          setImage(data?.imageUrl ?? "");
          setEnglishNameProduct(data?.name_En ?? "");
          setGeorgianNameProduct(data?.name_Ka ?? "");
          setPrice(data?.price ?? 0);
          setDiscount(data?.discount ?? 0);
          setDescriptionEnglish(data?.description_En ?? "");
          setDescriptionGeorgian(data?.description_Ka ?? "");
          setGroupId(data?.group_Id ?? groupid);
        } catch (error) {
          console.error("Error fetching product groups:", error);
        }
      };

      fetchData();
      onOpenProductModal();
    };
    const AddeddProduct = (product: ProductNew) => {
      products.push(product);
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
        console.log("Selected Product:", selectedProduct);
        setCustomDescription("");
        setExtras({});
        onCloseProductModal();
        if (lang === "en") {
          toast.success("Successfully Added to Cart!");
        } else {
          toast.success("დამატებულია კალათში !");
        }
      }
    };

    const handleIncreaseQuantity = async (product: ProductNew) => {
      const fetchData = async () => {
        try {
          const data = await fetchProductWithOptionsAndValues(product.id);
          setSelectedProduct(data); // Set the selected item
        } catch (error) {
          console.error("Error fetching product groups:", error);
        }
      };

      fetchData();
      onOpenProductModal();
    };

    const handleDecreaseQuantity = (product: ProductNew) => {
      const existingCartItem = cartItems.find(
        (item) => item.product?.id === product.id
      );
      if (existingCartItem && existingCartItem.quantity > 1) {
        onUpdateCartItemQuantity(product, existingCartItem.quantity - 1);
      }
    };

    const handleOptionRadioToggle = (optionId: number, valueId: number) => {
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
          selectedProduct.DiscountedPrice ?? 0
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
        newSelectedProduct.incrementPrice(optionId, valueId);

        // Add the newly selected value to extras
        setExtras((prevExtras) => ({
          ...prevExtras,
          ["en"]: [...(prevExtras["en"] || []), selectedValue.name_En],
          ["ka"]: [...(prevExtras["ka"] || []), selectedValue.name_Ka],
        }));

        setSelectedProduct(newSelectedProduct);
      }
    };

    const handleOptionCheckboxToggle = (optionId: number, valueId: number) => {
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
          selectedProduct.DiscountedPrice ?? 0
        );

        const selectedOption = newSelectedProduct.options.find(
          (option) => option.id === optionId
        );
        const selectedValue = selectedOption?.optionValues.find(
          (value) => value.id === valueId
        );

        if (!selectedOption || !selectedValue) return;

        const isCurrentlySelected = selectedValue.selected;

        newSelectedProduct.options = newSelectedProduct.options.map(
          (option) => {
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
          }
        );

        if (isCurrentlySelected) {
          newSelectedProduct.decrementPrice(optionId, valueId);
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
          newSelectedProduct.incrementPrice(optionId, valueId);
          // Add the newly selected value to extras
          setExtras((prevExtras) => ({
            ...prevExtras,
            ["en"]: [...(prevExtras["en"] || []), selectedValue.name_En],
            ["ka"]: [...(prevExtras["ka"] || []), selectedValue.name_Ka],
          }));
        }

        setSelectedProduct(newSelectedProduct);
      }
    };

    const [inputValues, setInputValues] = useState("");

    const handleOptionNumFieldChange = (quantity: string) => {
      setInputValues(quantity);
      if (!selectedProduct) return;
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
        selectedProduct.DiscountedPrice ?? 0
      );

      if (quantity === "") return;
      var value = parseInt(quantity);
      if (selectedProduct.discount !== 0) {
        newSelectedProduct.DiscountedPrice =
          (newSelectedProduct?.StaticPrice ?? 0) * value;
      } else {
        newSelectedProduct.price =
          (newSelectedProduct?.StaticPrice ?? 0) * value;
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
      setSelectedProduct(newSelectedProduct);
    };

    const [georgianName, setGeorgianName] = useState(name_ka);
    const [englishName, setEnglishName] = useState(name_en);

    const onEditGroup = () => {
      setGeorgianName(name_ka);
      setEnglishName(name_en);
      onOpenGroupModal();
    };

    const hanldeAddProduct = () => {
      onOpenProductAddModal();
    };

    const handleSaveGroup = async () => {
      const data = {
        name_En: englishName,
        name_Ka: georgianName,
      };
      const APIData = await editProductGroup(
        groupid,
        data.name_En,
        data.name_Ka
      );
      if (!APIData) {
        toast.error("Failed to add group");
        return;
      }
      const newGroup = new ProductGroup(
        groupid,
        APIData.name_En,
        APIData.name_Ka,
        APIData.imageUrl,
        []
      );
      toast.success("Group Updated successfully");
      onUpdateGroup(newGroup);
      onCloseGroupModal();
    };

    const [englishNameProduct, setEnglishNameProduct] = useState("");
    const [georgianNameProduct, setGeorgianNameProduct] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [descriptionEnglish, setDescriptionEnglish] = useState("");
    const [descriptionGeorgian, setDescriptionGeorgian] = useState("");
    const [image, setImage] = useState("");
    const [groupId, setGroupId] = useState(groupid);

    const handleSaveProduct = async () => {
      const response = await editProduct(
        selectedProduct?.id ?? 0,
        englishNameProduct,
        georgianNameProduct,
        price,
        image,
        discount,
        descriptionEnglish,
        descriptionGeorgian,
        groupId
      );
      if (response) {
        const newproduct = new ProductNew(
          response.id,
          response.name_En,
          response.name_Ka,
          response.price,
          response.imageUrl,
          response.discount,
          response.description_En,
          response.description_Ka,
          response.group_Id,
          response.options,
          response.DiscountedPrice ?? 0
        );
        onUpdateProduct(newproduct);
        toast.success("Product Updated successfully");
        onCloseProductModal();
        return;
      } else {
        toast.error("Failed to update product");
        onCloseProductModal();
        return;
      }
    };

    const handleProductDelete = async () => {
      if (selectedProduct) {
        const product = selectedProduct;

        const reposnse = await deleteProduct(product.id);
        if (!reposnse) {
          toast.error("Failed to delete product");
          onCloseProductModal();
          return;
        }
        const index = products.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          products.splice(index, 1);
          onDeleteGroup(product.id);
          toast.success("Product Deleted successfully");
          onCloseProductModal();
          return;
        } else {
          toast.error("Failed to delete product");
          onCloseProductModal();
          return;
        }
      }
    };

    return (
      <>
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="ml-4 text-black dark:text-white font-bold text-3xl">
              {title}
            </h1>
            <div className="flex gap-3 ">
              <Button
                size="sm"
                isIconOnly
                onClick={onEditGroup}
                color="success"
                className="dark:text-white text-black text-3xl bg-transparent"
              >
                <EditIcon size={24} />
              </Button>

              <Button
                size="sm"
                isIconOnly
                onClick={hanldeAddProduct}
                color="success"
                className="dark:text-green-600 text-black text-3xl bg-transparent"
              >
                <AddIcon size={26} />
              </Button>
            </div>
          </div>

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
                              onClick={() => handleDecreaseQuantity(product)}
                              className="text-white text-3xl bg-red-600"
                            >
                              -
                            </Button>
                            <p className="text-lg">{cartItem.quantity}</p>
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleIncreaseQuantity(product)}
                              className="text-white text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <Button
                          size="md"
                          onClick={() => handleAddToCart(formatedPr)}
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
                              onClick={() => handleDecreaseQuantity(product)}
                              className="text-white  text-3xl bg-red-600"
                            >
                              -
                            </Button>
                            <p className="text-lg">{cartItem.quantity}</p>
                            <Button
                              size="sm"
                              isIconOnly
                              onClick={() => handleIncreaseQuantity(product)}
                              className="text-white  text-3xl bg-green-600"
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-row gap-2">
                            <Button
                              size="md"
                              onClick={() => handleAddToCart(formatedPr)}
                              className="text-white text-sm bg-transparent"
                              isIconOnly
                            >
                              <EditIcon size={30} />
                            </Button>
                            <Button
                              size="md"
                              onClick={() => handleAddToCart(formatedPr)}
                              isIconOnly
                              className="text-green-600 text-sm bg-transparent"
                            >
                              <AddIcon size={30} />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Modal
          isOpen={isOpenGroupModal}
          onOpenChange={onOpenGroupChange}
          placement="center"
        >
          <ModalContent>
            {(onCloseGroupModal) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Group
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input
                      autoFocus
                      label="English"
                      placeholder="Enter English"
                      value={englishName}
                      onChange={(e) => setEnglishName(e.target.value)}
                      variant="bordered"
                      required
                    />
                    <Input
                      autoFocus
                      label="ქართულად"
                      value={georgianName}
                      onChange={(e) => setGeorgianName(e.target.value)}
                      placeholder="Enter ქართულად"
                      variant="bordered"
                      required
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onCloseGroupModal}
                  >
                    Close
                  </Button>
                  <Button color="success" onClick={handleSaveGroup}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="full"
          isOpen={isOpenProductModal}
          onClose={onCloseProductModal}
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
                  {image && (
                    <Image
                      src={image ?? ""}
                      width="100%"
                      alt="Sample Image"
                      className="rounded-3xl"
                    />
                  )}
                  <Input
                    label={lang === "en" ? "Image URL" : "სურათის URL"}
                    placeholder={
                      lang === "en"
                        ? "Enter Image URL"
                        : "შეიყვანეთ სურათის URL"
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Input
                    label={lang === "en" ? "English Name" : "ინგლისური სახელი"}
                    placeholder={
                      lang === "en"
                        ? "Enter English Name"
                        : "შეიყვანეთ ინგლისური სახელი"
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    value={englishNameProduct}
                    onChange={(e) => setEnglishNameProduct(e.target.value)}
                  />
                  <Input
                    label={lang === "en" ? "Georgian Name" : "ქართული სახელი"}
                    placeholder={
                      lang === "en"
                        ? "Enter Georgian Name"
                        : "შეიყვანეთ ქართული სახელი"
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    value={georgianNameProduct}
                    onChange={(e) => setGeorgianNameProduct(e.target.value)}
                  />
                  <Input
                    label={lang === "en" ? "Price" : "ფასი"}
                    placeholder={
                      lang === "en" ? "Enter Price" : "შეიყვანეთ ფასი"
                    }
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    type="number"
                    value={price.toString()}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />

                  <Input
                    label={lang === "en" ? "Discount" : "ფასდაკლება"}
                    placeholder="0.00"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    type="number"
                    value={discount.toString()}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                  <Textarea
                    label={
                      lang === "en"
                        ? "Description (English)"
                        : "აღწერა (ინგლისურად)"
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    placeholder={
                      lang === "en"
                        ? "Enter English Description"
                        : "შეიყვანეთ ინგლისური აღწერა"
                    }
                    value={descriptionEnglish}
                    onChange={(e) => setDescriptionEnglish(e.target.value)}
                  />
                  <Textarea
                    label={
                      lang === "en"
                        ? "Description (Georgian)"
                        : "აღწერა (ქართულად)"
                    }
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    placeholder={
                      lang === "en"
                        ? "Enter Georgian Description"
                        : "შეიყვანეთ ქართული აღწერა"
                    }
                    value={descriptionGeorgian}
                    onChange={(e) => setDescriptionGeorgian(e.target.value)}
                  />
                  {/* {selectedProduct.options.map((option) => (
                    <div key={option.id}>
                      <Divider className="my-3" />
                      <RadioGroup
                        label={lang === "en" ? option.name_En : option.name_Ka}
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
                                    handleOptionRadioToggle(option.id, value.id)
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
                                    +{value.price} {lang === "en" ? "GEL" : "₾"}
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
                  ))} */}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={handleProductDelete}
              >
                Delete
              </Button>
              <Button color="success" onClick={handleSaveProduct}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <AddProduct
          lang={lang}
          isOpen={isOpenProductAddModal}
          onClose={onCloseProductAddModal}
          groupid={groupid}
          onAdeddProduct={AddeddProduct}
        />

        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  }
);

CategorySectionAdmin.displayName = "CategorySection";

export default CategorySectionAdmin;
