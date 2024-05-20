import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { AddToShoppingCart, AddIcon } from "../icons";
import toast, { Toaster } from "react-hot-toast";
import { createProductGroup } from "@/app/api/ProductGroup";
import {
  Avatar,
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

  const handleSave = async () => {
    // Prepare the data to be sent to the API
    const data = {
      name_En: englishName,
      name_Ka: georgianName,
    };
    const APidata = await createProductGroup(data.name_En, data.name_Ka);
    if (!APidata) {
      toast.error("Failed to add group");
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
    onClose();
  };

  return (
    <>
      <div className="flex w-full justify-center mt-10">
        <Button
          size="lg"
          endContent={<AddIcon size={23} />}
          className="text-white text-sm bg-green-600"
          onClick={onOpen}
        >
          {lang === "en" ? "Add" : "დამატება"}
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Group
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
                    variant="bordered"
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
                    variant="bordered"
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddGroup;
