"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  Image,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { AddIcon, EditIcon } from "../icons";
import ProductNew from "@/models/ProductNew";
import ProductData from "@/models/ProductData";
import {
  deleteProduct,
  editProduct,
  fetchProductWithOptionsAndValues,
} from "@/app/api/Product";
import { deleteProductGroup, editProductGroup } from "@/app/api/ProductGroup";
import ProductGroup from "@/models/ProductGroup";
import AddProduct from "./AddProductFunc";
import ProductOptionsCreator from "./ProductOptionsCreator";
import NextImage from "next/image";

interface CategorySectionProps {
  groupid: number;
  name_ka: string;
  name_en: string;
  title: string;
  lang: string;
  biglayout?: boolean;
  products: ProductNew[];
  onUpdateGroup: (group: ProductGroup) => void;
  onDeleteGroup: (groupid: number) => void;
  onUpdateProduct: (product: ProductNew) => void;
}

export interface CategorySectionAdminRef {
  onEditProductOptions: (product: ProductNew) => void;
  onEditProduct: (product: ProductNew) => void;
}

const CategorySectionAdmin = forwardRef<
  CategorySectionAdminRef,
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
      lang,
      onUpdateGroup,
      onDeleteGroup,
      onUpdateProduct,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      onEditProductOptions: (product: ProductNew) => {
        var formatedProduct = product.getProductData(
          lang === "en" ? "en" : "ka"
        );
        handleProductEditModel(formatedProduct);
      },
      onEditProduct: (product: ProductNew) => {
        var formatedProduct = product.getProductData(
          lang === "en" ? "en" : "ka"
        );
        handleEditProductOptionsModal(formatedProduct);
      },
    }));

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

    const {
      isOpen: isOpenProductOptionsModal,
      onOpen: onOpenProductOptionsModal,
      onClose: onCloseProductOptionsModal,
      onOpenChange: onOpenProductOptionsChange,
    } = useDisclosure();

    const handleEditProductOptionsModal = (product: ProductData) => {
      setSelectedProduct(null);
      // const fetchData = async () => {
      //   try {
      //     const data = await fetchProductWithOptionsAndValues(product.id);
      //     setSelectedProduct(data);
      //     onOpenProductOptionsModal();
      //   } catch (error) {
      //     console.error("Error fetching product groups:", error);
      //   }
      // };
      // fetchData();

      const selectedProduct = products.find((p) => p.id === product.id);
      if (selectedProduct) {
        setSelectedProduct(selectedProduct);
        onOpenProductOptionsModal();
      }
    };
    const handleProductEditModel = (product: ProductData) => {
      onCloseProductOptionsModal();
      setSelectedProduct(null);
      // const fetchData = async () => {
      //   try {
      //     const data = await fetchProductWithOptionsAndValues(product.id);
      //     setSelectedProduct(data);
      //     setImage(data?.imageUrl ?? "");
      //     setEnglishNameProduct(data?.name_En ?? "");
      //     setGeorgianNameProduct(data?.name_Ka ?? "");
      //     setPrice(data?.price ?? 0);
      //     setDiscount(data?.discount ?? 0);
      //     setDescriptionEnglish(data?.description_En ?? "");
      //     setDescriptionGeorgian(data?.description_Ka ?? "");
      //     setGroupId(data?.group_Id ?? groupid);
      //   } catch (error) {
      //     console.error("Error fetching product groups:", error);
      //   }
      // };

      // fetchData();
      // onOpenProductModal();

      const selectedProduct = products.find((p) => p.id === product.id);
      if (selectedProduct) {
        setSelectedProduct(selectedProduct);
        setImage(selectedProduct.imageUrl ?? "");
        setEnglishNameProduct(selectedProduct.name_En);
        setGeorgianNameProduct(selectedProduct.name_Ka);
        setPrice(selectedProduct.price);
        setDiscount(selectedProduct.discount);
        setDescriptionEnglish(selectedProduct.description_En);
        setDescriptionGeorgian(selectedProduct.description_Ka);
        setGroupId(selectedProduct.group_Id);
        onOpenProductModal();
      }
    };

    const AddeddProduct = (product: ProductNew) => {
      products.push(product);
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

    const handleDeleteGroup = async (id: number) => {
      const response = await deleteProductGroup(id);

      if (response) {
        toast.success("Group Deleted successfully");
        onDeleteGroup(id);
        onCloseGroupModal();
      } else {
        console.log("Failed to delete product group.");
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
                const formatedPr: ProductData = product.getProductData(
                  lang === "en" ? "en" : "ka"
                );

                return (
                  <div key={index} className="w-full">
                    <div className="max-w-[200px] h-auto rounded-3xl border dark:bg-[#313638]/85 bg-white shadow-2xl text-center font-semibold ">
                      <Image
                        src={formatedPr.imageUrl ?? ""}
                        width={200}
                        height={200}
                        as={NextImage}
                        alt="Sample Image"
                        className="rounded-3xl"
                      />
                      <h1 className="text-md uppercase font-bold mt-3 mx-1">
                        {formatedPr.name}
                      </h1>
                      <h3 className="text-sm text-gray-400">
                        {formatedPr.description}
                      </h3>
                      <h3 className="text-sm mt-5">
                        {formatedPr.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through text-slate-400">
                              {formatedPr.price} {lang === "en" ? " GEL" : " ₾"}
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {formatedPr.discountedPrice}
                              {lang === "en" ? " GEL" : " ₾"}
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

                      <Button
                        size="md"
                        onClick={() => handleProductEditModel(formatedPr)}
                        endContent={<EditIcon size={24} />}
                        className="text-white text-sm  mt-4  rounded-3xl px-8 py-2 font-bold  bg-green-600"
                      >
                        {lang === "en" ? "Edit" : "რედაქტირ"}
                      </Button>
                      <Button
                        size="md"
                        onClick={() =>
                          handleEditProductOptionsModal(formatedPr)
                        }
                        endContent={<AddIcon size={24} />}
                        className="text-white text-sm mb-4 mt-4   rounded-3xl px-8 py-2 font-bold  bg-green-600"
                      >
                        {lang === "en" ? "Add" : "დამატება"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            products.map((product, index) => {
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
                    width={211}
                    height={211}
                    as={NextImage}
                    isZoomed
                    alt="Sample Image"
                    className="rounded-lg"
                  />

                  <div className="ml-4  flex w-full flex-col justify-between">
                    <h1 className="text-md font-bold uppercase text-black dark:text-white ">
                      {formatedPr.name}
                    </h1>
                    <p className="text-xs/3 mt-2  dark:text-white/70 text-black/70">
                      {formatedPr.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="mr-2 text-md text-black dark:text-white relative">
                        {formatedPr.discount !== 0 ? (
                          <>
                            {/* Original price */}
                            <span className="line-through text-slate-400">
                              {formatedPr.price} {lang === "en" ? " GEL" : " ₾"}
                            </span>

                            {/* Discounted price */}
                            <span className="text-green-500 ml-1">
                              {formatedPr.discountedPrice}
                              <span className="text-sm">
                                {lang === "en" ? " GEL" : " ₾"}
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            {formatedPr.price}
                            <span className="text-sm">
                              {lang === "en" ? " GEL" : " ₾"}
                            </span>
                          </>
                        )}
                      </p>
                      <div className="flex flex-row gap-2">
                        <Button
                          size="md"
                          onClick={() => handleProductEditModel(formatedPr)}
                          className="text-white text-sm bg-transparent"
                          isIconOnly
                        >
                          <EditIcon size={30} />
                        </Button>
                        <Button
                          size="md"
                          onClick={() =>
                            handleEditProductOptionsModal(formatedPr)
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
                  {lang === "en" ? "Edit Group" : "ჯგუფის რედაქტირება"}
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input
                      autoFocus
                      label="English"
                      placeholder="Enter English"
                      value={englishName}
                      onChange={(e) => setEnglishName(e.target.value)}
                      required
                    />
                    <Input
                      autoFocus
                      label="ქართულად"
                      value={georgianName}
                      onChange={(e) => setGeorgianName(e.target.value)}
                      placeholder="Enter ქართულად"
                      required
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={() => handleDeleteGroup(groupid)}
                  >
                    {lang === "en" ? "Delete" : "წაშლა"}
                  </Button>
                  <Button color="success" onClick={handleSaveGroup}>
                    {lang === "en" ? "Save" : "შენახვა"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="5xl"
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
              {lang === "en" ? "Edit Product" : "პროდუქტის რედაქტირება"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
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
                      label={
                        lang === "en" ? "English Name" : "ინგლისური სახელი"
                      }
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
                  </>
                )}
              </div>
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

        <ProductOptionsCreator
          lang={lang}
          product={selectedProduct}
          open={isOpenProductOptionsModal}
          productid={selectedProduct?.id ?? 0}
        />

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
