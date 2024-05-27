import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { AddToShoppingCart, AddIcon } from "../icons";
import toast, { Toaster } from "react-hot-toast";
import { createProductGroup, deleteProductGroup } from "@/app/api/ProductGroup";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ProductGroup from "@/models/ProductGroup";

interface AddGroupInterface {
  lang: string;
  onAddnewGroup: (cartItem: ProductGroup) => void;
}

const AddGroup = ({ lang, onAddnewGroup }: AddGroupInterface) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [englishName, setEnglishName] = useState("");
  const [georgianName, setGeorgianName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    // Prepare the data to be sent to the API
    setIsLoading(true);
    const data = {
      name_En: englishName,
      name_Ka: georgianName,
    };
    const APidata = await createProductGroup(data.name_En, data.name_Ka);
    if (!APidata) {
      toast.error("Failed to add group");
      setIsLoading(false);
      return;
    }
    const newGroup = new ProductGroup(
      APidata.id,
      APidata.name_En,
      APidata.name_Ka,
      APidata.imageUrl,
      []
    );
    onAddnewGroup(newGroup);
    toast.success("Group added successfully");
    setIsLoading(false);
    onClose();
  };

  const handleDeleteGroup = async (id: number) => {
    const response = await deleteProductGroup(id);

    if (response) {
    } else {
      console.log("Failed to delete product group.");
    }
  };

  return (
    <>
      <div className="flex w-full justify-center mt-7 mb-3">
        <Button
          size="lg"
          endContent={<AddIcon size={23} />}
          className="text-white text-sm bg-green-600"
          onClick={onOpen}
        >
          {lang === "en" ? "Add" : "დამატება"}
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                {lang === "en" ? "Create Group" : "ჯგუფის შექმნა"}
              </ModalHeader>
              <form onSubmit={handleSave}>
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
                  <Button color="danger" variant="flat" onPress={onClose}>
                    {lang === "en" ? "Close" : "დახურვა"}
                  </Button>
                  <Button
                    color="success"
                    type="submit"
                    isLoading={isLoading}
                    onPress={handleSave}
                  >
                    {lang === "en" ? "Save" : "შენახვა"}
                  </Button>
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddGroup;
