import React, { useEffect, useState } from "react";
import { ShoppingCart } from "@/app/components/icons";
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
import CartItem from "@/models/CartItem";

interface ItemQuantities {
  [key: number]: number;
}

const BottomCart: React.FC<{ lng: string; CartItems: CartItem[] }> = ({
  lng,
  CartItems,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});
  useEffect(() => {
    // Update cart items from props whenever they change
    if (CartItems.length > 0) {
      setCartItems(CartItems);
    }
  }, [CartItems]);

  useEffect(() => {
    // Initialize itemQuantities based on cartItems
    const initialQuantities: ItemQuantities = {};
    cartItems.forEach((cartitem) => {
      initialQuantities[cartitem.product.id] = 1; // You can set a default quantity here
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  // Function to handle incrementing item quantity
  const handleIncrement = (itemId: number) => {
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      };

      // Update cartItems with updated quantities
      const updatedCartItems = cartItems.map((cartitem) => ({
        ...cartitem,
        quantity: updatedQuantities[cartitem.product.id] || 0,
      }));

      // Save updated cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      console.log(updatedCartItems);

      return updatedQuantities;
    });
  };

  // Function to handle decrementing item quantity
  const handleDecrement = (itemId: number) => {
    if (itemQuantities[itemId] > 0) {
      // Decrease item quantity in itemQuantities
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));

      // If item quantity reaches zero, remove the item from cartItems
      if (itemQuantities[itemId] === 1) {
        // Filter out the item with matching itemId
        const updatedCartItems = cartItems.filter(
          (cartitem) => cartitem.product.id !== itemId
        );

        // Update cartItems state and localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      if (item.product.discount !== 0) {
        return (
          total +
          (item.product.price -
            (item.product.price * item.product.discount) / 100) *
            (itemQuantities[item.product.id] || 0)
        );
      }
      return (
        total + item.product.price * (itemQuantities[item.product.id] || 0)
      );
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
              className="text-white"
              onClick={onOpen}
              endContent={<ShoppingCart size={30} />}
            >
              {lng === "en" ? "Cart" : "კალათა"}
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
                {cartItems.map((cartitem, index) => (
                  <div
                    className="flex justify-between bg-transparent p-3 border-b border-gray-200 dark:border-gray-700"
                    key={index}
                  >
                    <Image
                      src={cartitem.product.imageUrl}
                      width={150}
                      alt="Sample Image"
                      className="rounded-lg"
                    />
                    <div className="ml-4 flex w-full flex-col justify-between">
                      <h1 className="text-md font-bold text-black dark:text-white">
                        {cartitem.product.name}
                      </h1>
                      <p className="text-xs text-white dark:text-white/70">
                        {cartitem.product.description}
                      </p>
                      <p className="text-xs mt-3 text-white dark:text-white/70">
                        {cartitem.customDescription}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="mr-2 text-sm text-black dark:text-white">
                          {cartitem.product.discount !== 0 ? (
                            <>
                              {/* Original price */}
                              <span className="line-through">
                                {cartitem.product.price}{" "}
                                {lng === "en" ? "GEL" : "₾"}
                              </span>

                              {/* Discounted price */}
                              <span className="text-green-500 ml-1">
                                {(cartitem.product.price *
                                  cartitem.product.discount) /
                                  100}{" "}
                                {lng === "en" ? "GEL" : "₾"}
                              </span>
                            </>
                          ) : (
                            <>
                              {cartitem.product.price}{" "}
                              {lng === "en" ? "GEL" : "₾"}
                            </>
                          )}
                        </p>
                        <ButtonGroup className="gap-2">
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() => handleDecrement(cartitem.product.id)}
                            className="text-white text-3xl bg-transparent"
                          >
                            -
                          </Button>
                          <p>{itemQuantities[cartitem.product.id]}</p>
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() => handleIncrement(cartitem.product.id)}
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
