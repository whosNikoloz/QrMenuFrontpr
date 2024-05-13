import React, { useEffect, useState } from "react";
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
  quantity?: number;
}

interface ItemQuantities {
  [key: number]: number;
}

const BottomCart: React.FC<{ lng: string; items: Item[] }> = ({
  lng,
  items,
}) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>(
    cartItems.reduce((quantities: ItemQuantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {} as ItemQuantities)
  );

  useEffect(() => {
    setCartItems(items);
    // Initialize itemQuantities based on items
    const initialQuantities = items.reduce(
      (quantities: ItemQuantities, item) => {
        quantities[item.id] = item.quantity || 0;
        return quantities;
      },
      {}
    );
    setItemQuantities(initialQuantities);
  }, [items]);

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

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (itemQuantities[item.id] || 0);
    }, 0);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Cart display section */}
      <div className="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center w-11/12 max-w-screen-lg dark:bg-green-600 bg-white shadow-xl rounded-3xl p-2">
        {/* Display total price and order button */}
        <div className="flex justify-between w-full ml-3">
          <div className="flex items-center gap-2">
            <p className="font-bold">{lng === "en" ? "Total:" : "სულ:"}</p>
            <div className="text-md  font-bold">
              {getTotalPrice().toFixed(2)} {lng === "en" ? "GEL" : "₾"}
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
              className="text-gray-800"
              onClick={onOpen}
              endContent={<LockIcon />}
            >
              {lng === "en" ? "Order" : "შეკვეთა"}
            </Button>
          </Badge>
        </div>
      </div>

      {/* Cart modal */}
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
            {cartItems.map((item) => (
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
                  <h1 className="text-md font-bold text-black dark:text-white">
                    {item.title}
                  </h1>
                  <p className="text-xs text-white dark:text-white/70">
                    {item.description}
                  </p>
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
              {lng === "en" ? "Total:" : "სულ:"}{" "}
              <span>
                {getTotalPrice().toFixed(2)} {lng === "en" ? "GEL" : "₾"}
              </span>
            </h1>
            <Button className="w-full bg-green-600" onClick={onClose}>
              {lng === "en" ? "Order" : "შეკვეთა"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BottomCart;
