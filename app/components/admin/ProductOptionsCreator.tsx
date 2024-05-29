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
  User,
} from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { AddIcon, EditIcon } from "../icons";
import ProductNew from "@/models/ProductNew";
import { createOption, editOption } from "@/app/api/Options";
import {
  createOptionValue,
  editOptionValue,
  deleteOptionValue,
} from "@/app/api/OptionValue";
import { deleteOption } from "@/app/api/Options";
import toast from "react-hot-toast";

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

  const {
    isOpen: isOpenOptionValueModal,
    onOpen: onOpenOptionValueModal,
    onClose: onCloseOptionValueModal,
    onOpenChange: onOpenOptionValueChange,
  } = useDisclosure();

  const {
    isOpen: isOpenOptionValueEditModal,
    onOpen: onOpenOptionValueEditModal,
    onClose: onCloseOptionValueEditModal,
    onOpenChange: onOpenOptionValueEditChange,
  } = useDisclosure();

  useEffect(() => {
    if (open) {
      setSelectedProduct(product);
      onOpenMainModal();
    }
  }, [onOpenMainModal, open, product]);

  const [englishName, setEnglishName] = useState("");
  const [georgianName, setGeorgianName] = useState("");
  const [type, setType] = useState("");
  const [optionid, setOptionId] = useState(0);

  const [valueEnglishName, setValueEnglishName] = useState("");
  const [valueGeorgianName, setValueGeorgianName] = useState("");
  const [valueprice, setValueprice] = useState(0);

  const [optionValueId, setOptionValueId] = useState(0);

  const handleAddOption = (value: string) => {
    setEnglishName("");
    setGeorgianName("");
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

  const [newOptionLoading, setNewOptionLoading] = useState(false);

  const AddNewOption = async () => {
    setNewOptionLoading(true);
    if (selectedProduct) {
      const reposnse = await createOption({
        name_En: englishName,
        name_Ka: georgianName,
        product_Id: selectedProduct.id,
        type: type,
      });

      if (!reposnse) {
        setNewOptionLoading(false);
        toast.error("Option Creation Failed");
        return;
      }

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
    toast.success("Option Created Successfully");
    setNewOptionLoading(false);
    onCloseAddModal();
  };
  const [optionEditLoading, setOptionEditLoading] = useState(false);

  const EditOption = async () => {
    setOptionEditLoading(true);
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
      if (!response) {
        setOptionEditLoading(false);
        toast.error("Option Update Failed");
        return;
      }

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
      setOptionEditLoading(false);
      toast.success("Option Updated Successfully");
    }
    onCloseEditModal();
  };

  const hanldeAddValueButton = (optionid: number) => {
    console.log(optionid);
    setValueEnglishName("");
    setValueGeorgianName("");
    setValueprice(0);
    setOptionId(optionid);
    onOpenOptionValueModal();
  };

  const [optionValueAddLoading, setOptionValueAddLoading] = useState(false);

  const handleOptionValueAdd = async () => {
    setOptionValueAddLoading(true);
    const response = await createOptionValue({
      name_En: valueEnglishName,
      name_Ka: valueGeorgianName,
      price: valueprice,
      option_Id: optionid,
    });

    if (response) {
      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;

        const optionIndex = prevProduct.options.findIndex(
          (option) => option.id === optionid
        );

        if (optionIndex !== -1) {
          // Create a copy of the options array and update the specific option directly inside the map function
          const updatedOptions = prevProduct.options.map((option, idx) => {
            if (idx === optionIndex) {
              return {
                ...option,
                optionValues: [
                  ...option.optionValues,
                  {
                    id: response.id,
                    name_En: response.name_En,
                    name_Ka: response.name_Ka,
                    selected: undefined,
                    price: response.price,
                    option_Id: response.option_Id,
                  },
                ],
              };
            }
            return option;
          });
          return {
            ...prevProduct,
            options: updatedOptions,
            incrementPrice: prevProduct.incrementPrice,
            decrementPrice: prevProduct.decrementPrice,
            getProductData: prevProduct.getProductData,
          };
        }
        return prevProduct;
      });

      toast.success("Option Value Added Successfully");
      setOptionValueAddLoading(false);
      onCloseOptionValueModal();
    } else {
      setOptionValueAddLoading(false);
      toast.error("Option Value Added Failed");
    }
  };

  const handleEditOptionValue = (optionid: number, valueid: number) => {
    const option = selectedProduct?.options.find(
      (option) => option.id === optionid
    );

    if (option) {
      const value = option.optionValues.find((value) => value.id === valueid);
      if (value) {
        setOptionValueId(value.id);
        setValueEnglishName(value.name_En);
        setValueGeorgianName(value.name_Ka);
        setValueprice(value.price);
        setOptionId(optionid);
        onOpenOptionValueEditModal();
      }
    }
  };

  const [updateOptionValueLoading, setUpdateOptionValueLoading] =
    useState(false);

  const handleOptionValueUpdate = async () => {
    setUpdateOptionValueLoading(true);
    const response = await editOptionValue(
      {
        name_En: valueEnglishName,
        name_Ka: valueGeorgianName,
        price: valueprice,
        option_Id: optionid,
      },
      optionValueId
    );

    if (response) {
      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;

        const optionIndex = prevProduct.options.findIndex(
          (option) => option.id === optionid
        );

        if (optionIndex !== -1) {
          const updatedOptions = prevProduct.options.map((option, idx) => {
            if (idx === optionIndex) {
              const updatedOptionValues = option.optionValues.map((value) => {
                if (value.id === response.id) {
                  return {
                    ...value,
                    name_En: response.name_En,
                    name_Ka: response.name_Ka,
                    price: response.price,
                  };
                }
                return value;
              });

              return {
                ...option,
                optionValues: updatedOptionValues,
              };
            }
            return option;
          });

          return {
            ...prevProduct,
            options: updatedOptions,
            incrementPrice: prevProduct.incrementPrice,
            decrementPrice: prevProduct.decrementPrice,
            getProductData: prevProduct.getProductData,
          };
        }
        return prevProduct;
      });
      setUpdateOptionValueLoading(false);

      toast.success("Option Value Updated Successfully");
      onCloseOptionValueEditModal();
    } else {
      setUpdateOptionValueLoading(false);
      toast.error("Option Value Update Failed");
    }
  };

  const [deleteOptionValueLoading, setDeleteOptionValueLoading] =
    useState(false);

  const handledeleteOptionValue = async () => {
    setDeleteOptionValueLoading(true);
    const response = await deleteOptionValue(optionValueId);

    if (response) {
      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;

        const optionIndex = prevProduct.options.findIndex(
          (option) => option.id === optionid
        );

        if (optionIndex !== -1) {
          const updatedOptions = prevProduct.options.map((option, idx) => {
            if (idx === optionIndex) {
              const updatedOptionValues = option.optionValues.filter(
                (value) => value.id !== optionValueId
              );

              return {
                ...option,
                optionValues: updatedOptionValues,
              };
            }
            return option;
          });

          return {
            ...prevProduct,
            options: updatedOptions,
            incrementPrice: prevProduct.incrementPrice,
            decrementPrice: prevProduct.decrementPrice,
            getProductData: prevProduct.getProductData,
          };
        }
        return prevProduct;
      });

      toast.success("Option Value Deleted Successfully");
      setDeleteOptionValueLoading(false);
      onCloseOptionValueEditModal();
    } else {
      setDeleteOptionValueLoading(false);
      toast.error("Option Value Delete Failed");
    }
  };

  const [deleteOptionLoading, setDeleteOptionLoading] = useState(false);

  const handledeleteOption = async () => {
    setDeleteOptionLoading(true);
    const response = await deleteOption(optionid);

    if (response) {
      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return null;

        const updatedOptions = prevProduct.options.filter(
          (option) => option.id !== optionid
        );

        return {
          ...prevProduct,
          options: updatedOptions,
          incrementPrice: prevProduct.incrementPrice,
          decrementPrice: prevProduct.decrementPrice,
          getProductData: prevProduct.getProductData,
        };
      });
      toast.success("Option Deleted Successfully");
      setDeleteOptionLoading(false);
      onCloseEditModal();
    } else {
      setDeleteOptionLoading(false);
      toast.error("Option Delete Failed");
    }
  };

  return (
    <>
      <Modal
        size="5xl"
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
            {lang === "en" ? "Manage Options" : "ვარიანტების მართვა"}
          </ModalHeader>
          <ModalBody>
            <div>
              {selectedProduct && (
                <>
                  <div className="flex justify-between">
                    <User
                      name={
                        lang === "en"
                          ? selectedProduct.name_Ka
                          : selectedProduct.name_Ka
                      }
                      description={selectedProduct.price.toString()}
                      avatarProps={{
                        size: "lg",
                        src: selectedProduct.imageUrl ?? "",
                      }}
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
                      <RadioGroup>
                        <>
                          <div className="flex font-bold text-md justify-between ">
                            <h1>
                              {lang === "en" ? option.name_En : option.name_Ka}
                            </h1>
                            <Button
                              className="flex bg-transparent"
                              onClick={() => handleEditOption(option.id)}
                              isIconOnly
                            >
                              <EditIcon size={25} />
                            </Button>
                          </div>

                          {option.type === "Radio"
                            ? option.optionValues.map((value, index) => (
                                <div
                                  key={value.id}
                                  className="flex items-center flex-row p-1  justify-between"
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
                                  <Button
                                    className="flex bg-transparent ml-5"
                                    onClick={() =>
                                      handleEditOptionValue(option.id, value.id)
                                    }
                                    isIconOnly
                                  >
                                    <EditIcon size={25} />
                                  </Button>
                                </div>
                              ))
                            : option.type === "CheckBox"
                            ? option.optionValues.map((value) => (
                                <div
                                  key={value.id}
                                  className="flex items-center justify-between p-2"
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
                                  <div className="flex flex-row items-end ">
                                    <Chip
                                      color="success"
                                      size="sm"
                                      variant="flat"
                                      className="mb-2"
                                    >
                                      +{value.price}{" "}
                                      {lang === "en" ? "GEL" : "₾"}
                                    </Chip>
                                    <Button
                                      className="flex bg-transparents "
                                      onClick={() =>
                                        handleEditOptionValue(
                                          option.id,
                                          value.id
                                        )
                                      }
                                      isIconOnly
                                    >
                                      <EditIcon size={25} />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            : option.type === "NumField"
                            ? option.optionValues.map((value) => (
                                <div
                                  key={value.id}
                                  className="flex flex-row items-end"
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
                                  <div className="flex flex-row items-end ">
                                    <Chip
                                      color="success"
                                      size="sm"
                                      variant="flat"
                                      className="mb-2"
                                    >
                                      +{value.price}{" "}
                                      {lang === "en" ? "GEL" : "₾"}
                                    </Chip>
                                    <Button
                                      className="flex bg-transparents "
                                      onClick={() =>
                                        handleEditOptionValue(
                                          option.id,
                                          value.id
                                        )
                                      }
                                      isIconOnly
                                    >
                                      <EditIcon size={25} />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            : null}
                        </>
                        <div className="flex items-center justify-center ">
                          <Button
                            color="success"
                            isIconOnly
                            onClick={() => hanldeAddValueButton(option.id)}
                            className="flex  mt-2 text-white bg-transparent"
                          >
                            <AddIcon size={35} />
                          </Button>
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onCloseMainModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenAddModal}
        onOpenChange={onCloseAddModal}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {lang === "en" ? "Add Option" : "ვარიანტის დამატება"}
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
                <Button color="danger" onPress={onCloseAddModal}>
                  Close
                </Button>
                <Button
                  color="success"
                  isLoading={newOptionLoading}
                  onClick={() => AddNewOption()}
                >
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
        placement="top-center"
      >
        <ModalContent>
          {(onCloseEditModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {lang === "en" ? "Edit Option" : "ვარიანტის რედაქტირება"}
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
                  isLoading={deleteOptionLoading}
                  onPress={handledeleteOption}
                >
                  Delete
                </Button>
                <Button
                  color="success"
                  isLoading={optionEditLoading}
                  onClick={EditOption}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenOptionValueModal}
        onOpenChange={onCloseOptionValueModal}
        placement="top-center"
      >
        <ModalContent>
          {(onCloseOptionValueModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {lang === "en"
                  ? "Add Option Value"
                  : "ვარიანტის მნიშვნელობის დამატება"}
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
                    value={valueEnglishName}
                    onChange={(e) => setValueEnglishName(e.target.value)}
                    required
                  />
                  <Input
                    autoFocus
                    label="ქართულად"
                    value={valueGeorgianName}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    onChange={(e) => setValueGeorgianName(e.target.value)}
                    placeholder="Enter ქართულად"
                    required
                  />
                  <Input
                    autoFocus
                    type="number"
                    label="Price"
                    value={valueprice.toString()}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    onChange={(e) => setValueprice(Number(e.target.value))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onCloseOptionValueModal}>
                  Close
                </Button>
                <Button
                  color="success"
                  isLoading={optionValueAddLoading}
                  onClick={handleOptionValueAdd}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenOptionValueEditModal}
        onOpenChange={onCloseOptionValueEditModal}
        placement="top-center"
      >
        <ModalContent>
          {(onCloseOptionValueEditModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {lang === "en"
                  ? "Edit OptionValue"
                  : "ვარიანტის რედაქტირება Value"}
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
                    value={valueEnglishName}
                    onChange={(e) => setValueEnglishName(e.target.value)}
                    required
                  />
                  <Input
                    autoFocus
                    label="ქართულად"
                    value={valueGeorgianName}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    onChange={(e) => setValueGeorgianName(e.target.value)}
                    placeholder="Enter ქართულად"
                    required
                  />
                  <Input
                    autoFocus
                    type="number"
                    label="Price"
                    value={valueprice.toString()}
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    onChange={(e) => setValueprice(Number(e.target.value))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isLoading={deleteOptionValueLoading}
                  onPress={handledeleteOptionValue}
                >
                  {lang === "en" ? "Delete" : "წაშლა"}
                </Button>
                <Button
                  color="success"
                  isLoading={updateOptionValueLoading}
                  onClick={handleOptionValueUpdate}
                >
                  {lang === "en" ? "Save" : "შენახვა"}
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
