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
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});

  useEffect(() => {
    // Fetch cart items from localStorage when component mounts
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedCartItems)) {
          // Ensure parsed data is an array
          setCartItems(parsedCartItems);
        } else {
          // If not an array, handle it accordingly (e.g., set to an empty array)
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        // If parsing fails, set cartItems to an empty array
        setCartItems([]);
      }
    } else {
      // If no cart items found in localStorage, initialize cartItems as an empty array
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    // Update cart items from props whenever they change
    if (items.length > 0) {
      setCartItems(items);
    }
  }, [items]);

  useEffect(() => {
    // Initialize itemQuantities based on cartItems
    const initialQuantities: ItemQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = 1; // You can set a default quantity here
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  // Function to handle incrementing item quantity
  const handleIncrement = (itemId: number) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
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
    return 0;
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
            {cartItems && (
              <>
                {cartItems.map((item, index) => (
                  <div
                    className="flex justify-between bg-transparent p-2"
                    key={index}
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
              </>
            )}
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
