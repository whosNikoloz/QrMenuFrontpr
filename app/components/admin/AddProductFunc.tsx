import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  RadioGroup,
  Radio,
  cn,
  Chip,
  Checkbox,
  Textarea,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AddToShoppingCart } from "../icons";
import ProductGroup from "@/models/ProductGroup";
import { GetProductGroup } from "@/app/api/ProductGroup";
import { createProduct } from "@/app/api/Product";
import toast from "react-hot-toast";
import ProdactNew from "@/models/ProductNew";
import ProductNew from "@/models/ProductNew";
import Image from "next/image";
import NextImage from "next/image";

interface AddProductInterface {
  lang: string;
  isOpen: boolean;
  onClose: () => void;
  groupid: number;
  onAdeddProduct: (product: ProdactNew) => void;
}

const AddProduct = ({
  lang,
  isOpen,
  onClose,
  groupid,
  onAdeddProduct,
}: AddProductInterface) => {
  const [englishName, setEnglishName] = useState("");
  const [georgianName, setGeorgianName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [descriptionEnglish, setDescriptionEnglish] = useState("");
  const [descriptionGeorgian, setDescriptionGeorgian] = useState("");
  const [image, setImage] = useState("");
  const [groupId, setGroupId] = useState(groupid);

  const handleSave = async () => {
    // Add save logic here
    console.log({
      englishName,
      georgianName,
      price,
      discount,
      descriptionEnglish,
      descriptionGeorgian,
      image,
      groupId,
    });
    try {
      const product = await createProduct({
        name_En: englishName,
        name_Ka: georgianName,
        price: price,
        discount: discount,
        description_En: descriptionEnglish,
        description_Ka: descriptionGeorgian,
        imageUrl: image,
        group_Id: groupId,
      });
      if (product) {
        var newproduct = new ProductNew(
          product.id,
          product.name_En,
          product.name_Ka,
          product.price,
          product.imageUrl,
          product.discount,
          product.description_En,
          product.description_Ka,
          product.group_Id,
          product.options,
          product.DiscountedPrice ?? price - (price * discount) / 100
        );
        onAdeddProduct(newproduct);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
    toast.success("Product added successfully");
    onClose();
  };
  const [groups, setGroups] = useState<ProductGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProductGroup();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching product groups:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal
      size="5xl"
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
          {lang === "en" ? "Create Product" : "პროდუქტის დამატება"}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
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
                value={englishName}
                onChange={(e) => setEnglishName(e.target.value)}
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
                value={georgianName}
                onChange={(e) => setGeorgianName(e.target.value)}
              />
              <Input
                label={lang === "en" ? "Price" : "ფასი"}
                placeholder={lang === "en" ? "Enter Price" : "შეიყვანეთ ფასი"}
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
                  lang === "en" ? "Description (Georgian)" : "აღწერა (ქართულად)"
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

              <div className="flex gap-4 p-3">
                <Input
                  label={lang === "en" ? "Image URL" : "სურათის URL"}
                  placeholder={
                    lang === "en" ? "Enter Image URL" : "შეიყვანეთ სურათის URL"
                  }
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                {image && (
                  <Image
                    src={image}
                    width={100}
                    alt="Product"
                    height={100}
                    className="rounded-2xl"
                  />
                )}
              </div>

              <Select
                size="md"
                label={lang === "en" ? "Select a group" : "აირჩიეთ ჯგუფი"}
                onChange={(e) => setGroupId(Number(e.target.value))}
                defaultSelectedKeys={[groupId.toString()]}
                value={groupId.toString()}
                required
              >
                {groups.map((group) => (
                  <SelectItem
                    key={group.id.toString()}
                    value={group.id.toString()}
                  >
                    {lang === "en" ? group.name_En : group.name_Ka}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col justify-center w-full">
          <Button onClick={onClose}>
            {lang === "en" ? "Cancel" : "გაუქმება"}
          </Button>
          <Button color="success" onClick={handleSave}>
            {lang === "en" ? "Save" : "შენახვა"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
