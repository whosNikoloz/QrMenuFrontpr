import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Divider,
  RadioGroup,
  Radio,
  cn,
  Chip,
  Checkbox,
  ModalFooter,
  Modal,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AddIcon, EditIcon } from "../icons";
import ProductNew from "@/models/ProductNew";
import { Locale } from "@/i18n.config";
import { Image } from "@nextui-org/react";
import { createOption, editOption } from "@/app/api/Options";

interface ProductOptionsCreatorProps {
  open: boolean;
  lang: string;
  product: ProductNew | null;
  productid: number;
}

const ProductOptionsCreator: React.FC<ProductOptionsCreatorProps> = ({
  open,
  product,
  lang,
  productid,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductNew | null>(
    null
  );

  const {
    isOpen: isOpenMainAddModal,
    onOpen: onOpenMainModal,
    onClose: onCloseMainModal,
    onOpenChange: onOpenMainChange,
  } = useDisclosure();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
    onOpenChange: onOpenEditChange,
  } = useDisclosure();

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
    onOpenChange: onOpenAddChange,
  } = useDisclosure();

  useEffect(() => {
    if (open) {
      setSelectedProduct(product);
      onOpenMainModal();
    }
  }, [product]);

  const [englishName, setEnglishName] = useState("");
  const [georgianName, setGeorgianName] = useState("");
  const [type, setType] = useState("");
  const [optionid, setOptionId] = useState(0);

  const [editType, setEditType] = useState("");

  const handleAddOption = (value: string) => {
    setType(value);
    onOpenAddModal();
  };

  const handleEditOption = (optionid: number) => {
    const option = selectedProduct?.options.find(
      (option) => option.id === optionid
    );

    if (option) {
      setEnglishName(option.name_En);
      setGeorgianName(option.name_Ka);
      setOptionId(option.id);
      setType(option.type);
      onOpenEditModal();
    }
  };
  const AddNewOption = async () => {
    if (selectedProduct) {
      const reposnse = await createOption({
        name_En: englishName,
        name_Ka: georgianName,
        product_Id: selectedProduct.id,
        type: type,
      });

      if (!reposnse) return;

      const newOption = {
        id: reposnse.id,
        name_En: reposnse.name_En,
        name_Ka: reposnse.name_Ka,
        type: type,
        product_Id: reposnse.product_Id,

        optionValues: [],
      };

      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;
        return {
          ...prevProduct,
          options: [...prevProduct.options, newOption],
          // Preserve all methods and any other properties that might be required
          incrementPrice: prevProduct.incrementPrice,
          decrementPrice: prevProduct.decrementPrice,
          getProductData: prevProduct.getProductData,
        };
      });
    }
    onCloseAddModal();
  };

  const EditOption = async () => {
    if (selectedProduct) {
      console.log(type);
      const response = await editOption(
        {
          name_En: englishName,
          name_Ka: georgianName,
          product_Id: selectedProduct.id,
          type: type,
        },
        optionid
      );
      if (!response) return;

      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;

        // Find the option in the array
        const optionIndex = prevProduct.options.findIndex(
          (option) => option.id === response.id
        );

        if (optionIndex !== -1) {
          prevProduct.options[optionIndex].name_En = response.name_En;
          prevProduct.options[optionIndex].name_Ka = response.name_Ka;
          prevProduct.options[optionIndex].type = response.type;
        }

        return {
          ...prevProduct,
          // Preserve all methods and any other properties that might be required
          incrementPrice: prevProduct.incrementPrice,
          decrementPrice: prevProduct.decrementPrice,
          getProductData: prevProduct.getProductData,
        };
      });
    }
    onCloseEditModal();
  };

  const handleOptionRadioToggle = (optionId: number, valueId: number) => {
    if (selectedProduct) {
      const option = selectedProduct.options.find(
        (option) => option.id === optionId
      );
      if (option) {
        const value = option.optionValues.find((value) => value.id === valueId);
        if (value) {
          value.selected = !value.selected;
          if (value.selected) {
            selectedProduct.incrementPrice(optionId, valueId);
          } else {
            selectedProduct.decrementPrice(optionId, valueId);
          }
        }
      }
    }
  };

  return (
    <>
      <Modal
        size="full"
        isOpen={isOpenMainAddModal}
        onClose={onCloseMainModal}
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
                <div className="flex justify-between">
                  <Image
                    src={selectedProduct.imageUrl ?? ""}
                    width="50%"
                    alt="Sample Image"
                    className="rounded-3xl"
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        color={"success"}
                        isIconOnly
                        size="lg"
                        className="bg-transparent text-white "
                      >
                        <AddIcon size={35} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dropdown Variants"
                      color={"success"}
                    >
                      <DropdownItem
                        key="Radio"
                        onClick={() => handleAddOption("Radio")}
                      >
                        Radio
                      </DropdownItem>
                      <DropdownItem
                        key="CheckBox"
                        onClick={() => handleAddOption("CheckBox")}
                      >
                        CheckBox
                      </DropdownItem>
                      <DropdownItem
                        key="NumField"
                        onClick={() => handleAddOption("NumField")}
                      >
                        NumField
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {selectedProduct.options.map((option) => (
                  <div key={option.id}>
                    <Divider className="my-3" />
                    <RadioGroup
                      label={lang === "en" ? option.name_En : option.name_Ka}
                    >
                      <>
                        <div className="flex justify-end">
                          <Button
                            className="flex bg-transparent"
                            onClick={() => handleEditOption(option.id)}
                            isIconOnly
                          >
                            <EditIcon size={25} />
                          </Button>

                          <Button isIconOnly className="flex bg-transparent">
                            <AddIcon size={25} />
                          </Button>
                        </div>

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
                                  // onChange={() =>
                                  //   handleOptionRadioToggle(option.id, value.id)
                                  // }
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
                                  // onChange={() =>
                                  //   handleOptionCheckboxToggle(
                                  //     option.id,
                                  //     value.id
                                  //   )
                                  // }
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
                                  // value={inputValues}
                                  // onValueChange={(value) => {
                                  //   handleOptionNumFieldChange(value);
                                  // }}
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
                      </>
                    </RadioGroup>
                  </div>
                ))}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onCloseMainModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenAddModal}
        onOpenChange={onCloseAddModal}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Option
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    autoFocus
                    label="English"
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    placeholder="Enter English"
                    value={englishName}
                    onChange={(e) => setEnglishName(e.target.value)}
                    required
                  />
                  <Input
                    autoFocus
                    label="ქართულად"
                    value={georgianName}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    onChange={(e) => setGeorgianName(e.target.value)}
                    placeholder="Enter ქართულად"
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onCloseAddModal}>
                  Close
                </Button>
                <Button color="success" onClick={() => AddNewOption()}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        onOpenChange={onCloseEditModal}
        placement="center"
      >
        <ModalContent>
          {(onCloseEditModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Option
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    autoFocus
                    label="English"
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    placeholder="Enter English"
                    value={englishName}
                    onChange={(e) => setEnglishName(e.target.value)}
                    required
                  />
                  <Input
                    autoFocus
                    label="ქართულად"
                    value={georgianName}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    onChange={(e) => setGeorgianName(e.target.value)}
                    placeholder="Enter ქართულად"
                    required
                  />
                  <Select label="Select Type" defaultSelectedKeys={[type]}>
                    <SelectItem
                      key={"Radio"}
                      onClick={() => setType("Radio")}
                      value={"Radio"}
                    >
                      Radio
                    </SelectItem>
                    <SelectItem
                      key={"CheckBox"}
                      onClick={() => setType("CheckBox")}
                      value={"Checkbox"}
                    >
                      Checkbox
                    </SelectItem>
                    <SelectItem
                      key={"NumField"}
                      onClick={() => setType("NumField")}
                      value={"NumField"}
                    >
                      NumField
                    </SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onCloseEditModal}
                >
                  Close
                </Button>
                <Button color="success" onClick={EditOption}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductOptionsCreator;
