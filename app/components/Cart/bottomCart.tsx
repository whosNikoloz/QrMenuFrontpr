"use client";
import React, { useState } from "react";
import { LockIcon } from "@/app/components/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Badge,
  Image,
  ButtonGroup,
} from "@nextui-org/react";

interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ItemQuantities {
  [key: number]: number;
}

export const BottomCart = ({ lng }: { lng: string }) => {
  const staticData: { title: string; items: Item[] } = {
    title: "Sample Title",
    items: [
      {
        id: 1,
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 2,
        title: "Item 2",
        price: 20,
        description: "This is item 2",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 3,
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 4,
        title: "Item 2",
        price: 20,
        description: "This is item 2",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 5,
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 6,
        title: "Item 2",
        price: 20,
        description: "This is item 2",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
      {
        id: 7,
        title: "Item 1",
        price: 10,
        description: "This is item 1",
        imageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      },
    ],
  };

  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>(
    staticData.items.reduce((quantities: ItemQuantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {} as ItemQuantities)
  );

  // Function to handle incrementing item quantity
  const handleIncrement = (itemId: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  // Function to handle decrementing item quantity
  const handleDecrement = (itemId: number) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  // Calculate total price based on item quantities
  const totalPrice = staticData.items.reduce((total, item) => {
    return total + item.price * itemQuantities[item.id];
  }, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center w-11/12 max-w-screen-lg dark:bg-green-600 bg-white shadow-xl rounded-3xl p-2">
        <div className="flex justify-between w-full ml-3">
          <div className="flex items-center gap-2">
            <p className="text-black font-medium">სულ:</p>
            <div className="text-md text-black font-bold">
              {totalPrice.toFixed(2)} ₾
            </div>
          </div>
          <Badge
            content={Object.values(itemQuantities).reduce(
              (sum, qty) => sum + qty,
              0
            )}
            shape="circle"
            color="danger"
          >
            <Button
              color="success"
              size="md"
              onClick={onOpen}
              endContent={<LockIcon />}
            >
              შეკვეთა
            </Button>
          </Badge>
        </div>
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
          <ModalHeader className="flex flex-col gap-1">
            {lng === "en" ? "Your Cart" : "თქვენი კალათა"}
          </ModalHeader>
          <ModalBody>
            {staticData.items.map((item) => (
              <div
                className="flex justify-between bg-transparent p-2"
                key={item.id}
              >
                <Image
                  src={item.imageUrl}
                  width={150}
                  alt="Sample Image"
                  className="rounded-lg"
                />
                <div className="ml-4 flex w-full flex-col justify-between">
                  <h1 className="text-md font-bold text-black dark:text-white ">
                    {item.title}
                  </h1>
                  <p className="text-xs/3 text-white/70">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="mr-2 text-sm text-black dark:text-white">
                      {item.price}{" "}
                      <span className="text-xs ml-1">
                        {lng === "en" ? "GEL" : "₾"}
                      </span>
                    </p>
                    <ButtonGroup className="gap-2">
                      <Button
                        size="sm"
                        isIconOnly
                        onClick={() => handleDecrement(item.id)}
                        className="text-white text-3xl bg-transparent"
                      >
                        -
                      </Button>
                      <p>{itemQuantities[item.id]}</p>
                      <Button
                        size="sm"
                        isIconOnly
                        onClick={() => handleIncrement(item.id)}
                        className="text-white text-3xl bg-transparent"
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ))}
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full">
            <h1 className="font-bold text-lg flex justify-between p-1">
              სულ:{" "}
              <span>
                {totalPrice.toFixed(2)} {lng === "en" ? "GEL" : "₾"}
              </span>
            </h1>
            <Button color="primary" className="w-full" onClick={onClose}>
              შეკვეთა
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BottomCart;
