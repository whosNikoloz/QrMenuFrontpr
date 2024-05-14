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
  [key: string]: number;
}

const BottomCart: React.FC<{ lng: string; CartItems: CartItem[] }> = ({
  lng,
  CartItems,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});

  useEffect(() => {
    if (CartItems.length > 0) {
      setCartItems(CartItems);
    }
  }, [CartItems]);

  useEffect(() => {
    const initialQuantities: ItemQuantities = {};
    cartItems.forEach((cartItem) => {
      const key = `${cartItem.product?.id}-${cartItem.customDescription}`;
      initialQuantities[key] = cartItem.quantity;
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  const handleIncrement = (productId: string, customDescription: string) => {
    const key = `${productId}-${customDescription}`;

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [key]: (prevQuantities[key] || 0) + 1,
      };
      // Update cartItems with updated quantities
      const updatedCartItems = cartItems.map((cartitem) =>
        `${cartitem.product?.id}-${cartitem.customDescription}` === key
          ? { ...cartitem, quantity: updatedQuantities[key] }
          : cartitem
      );
      // Save updated cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedQuantities;
    });
  };

  const handleDecrement = (productId: string, customDescription: string) => {
    const key = `${productId}-${customDescription}`;

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [key]: (prevQuantities[key] || 0) - 1,
      };

      let updatedCartItems;

      if (updatedQuantities[key] <= 0) {
        // If quantity is 0 or less, remove item from cartItems
        updatedCartItems = cartItems.filter(
          (cartitem) =>
            `${cartitem.product?.id}-${cartitem.customDescription}` !== key
        );
      } else {
        // Otherwise, update quantity in cartItems
        updatedCartItems = cartItems.map((cartitem) =>
          `${cartitem.product?.id}-${cartitem.customDescription}` === key
            ? { ...cartitem, quantity: updatedQuantities[key] }
            : cartitem
        ) as CartItem[]; // Cast to ensure all items are CartItem instances
      }

      // Update cartItems state
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Filter out zero or negative quantities from updatedQuantities
      const filteredQuantities = { ...updatedQuantities };
      if (filteredQuantities[key] <= 0) {
        delete filteredQuantities[key];
      }

      return filteredQuantities;
    });
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      const key = `${item.product?.id}-${item.customDescription}`;

      const price =
        item.product?.discount !== 0
          ? item.product?.price -
            (item.product?.price * item.product?.discount) / 100
          : item.product?.price;
      return total + price * (itemQuantities[key] || 0);
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
            content={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
            {cartItems.length != 0 ? (
              <>
                {cartItems.map((cartitem, index) => (
                  <div
                    className="flex justify-between bg-transparent p-3 border-b border-gray-200 dark:border-gray-700"
                    key={index}
                  >
                    <Image
                      src={cartitem.product?.imageUrl}
                      width={150}
                      alt="Sample Image"
                      className="rounded-lg"
                    />
                    <div className="ml-4 flex w-full flex-col justify-between">
                      <h1 className="text-md font-bold text-black dark:text-white">
                        {cartitem.product?.name}
                      </h1>
                      <p className="text-xs text-white dark:text-white/70">
                        {cartitem.product?.description}
                      </p>
                      <p className="text-xs mt-3 text-white dark:text-white/70">
                        {cartitem.customDescription}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="mr-2 text-sm text-black dark:text-white">
                          {cartitem.product?.discount !== 0 ? (
                            <>
                              {/* Original price */}
                              <span className="line-through">
                                {cartitem.product?.price}{" "}
                                {lng === "en" ? "GEL" : "₾"}
                              </span>

                              {/* Discounted price */}
                              <span className="text-green-500 ml-1">
                                {(cartitem.product?.price *
                                  cartitem.product?.discount) /
                                  100}{" "}
                                {lng === "en" ? "GEL" : "₾"}
                              </span>
                            </>
                          ) : (
                            <>
                              {cartitem.product?.price}{" "}
                              {lng === "en" ? "GEL" : "₾"}
                            </>
                          )}
                        </p>
                        <ButtonGroup className="gap-2">
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() =>
                              handleDecrement(
                                cartitem.product?.id,
                                cartitem.customDescription
                              )
                            }
                            className="text-white text-3xl bg-red-600"
                          >
                            -
                          </Button>
                          <p className="text-lg">
                            {
                              itemQuantities[
                                `${cartitem.product?.id}-${cartitem.customDescription}`
                              ]
                            }
                          </p>
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() =>
                              handleIncrement(
                                cartitem.product?.id,
                                cartitem.customDescription
                              )
                            }
                            className="text-white text-3xl bg-green-600"
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col p-3 justify-center items-center ">
                <Image
                  src="/shopping-cart-com.png" // Convert StaticImageData to string
                  width={300}
                  alt="logo"
                  className="p-10"
                />
                <p className="text-lg text-gray-500">
                  {lng === "en" ? "No items in cart" : "კალათა ცარიელია"}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center w-full">
            {cartItems.length != 0 ? (
              <>
                <h1 className="font-bold text-lg flex justify-between p-1">
                  {lng === "en" ? "Total:" : "სულ:"}{" "}
                  <span>
                    {getTotalPrice().toFixed(2)} {lng === "en" ? "GEL" : "₾"}
                  </span>
                </h1>
                <Button
                  className="w-full font-bold bg-green-600"
                  onClick={onClose}
                >
                  {lng === "en" ? "Order" : "შეკვეთა"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full bg-green-600 font-bold"
                  onClick={onClose}
                >
                  {lng === "en" ? "Back To Menu" : "მენიუში გადასვლა"}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BottomCart;
