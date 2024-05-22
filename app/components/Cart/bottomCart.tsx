import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, ShoppingCart } from "@/app/components/icons";
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
// import ProductNew from "@models/ProductNew";
import CartItemNew from "@/models/CartItemNew";

interface ItemQuantities {
  [key: string]: number;
}

interface BottomCartProps {
  lng: string;
  CartItems: CartItemNew[];
  onCartItemsChange: (newCartItems: CartItemNew[]) => void;
}

const BottomCart: React.FC<BottomCartProps> = ({
  lng,
  CartItems,
  onCartItemsChange,
}) => {
  const [cartItems, setCartItems] = useState<CartItemNew[]>([]);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});

  useEffect(() => {
    setCartItems(CartItems);
  }, [CartItems]);

  const sortExtras = (extras: { [key: string]: string[] }): string => {
    const sortedExtras: { [key: string]: string[] } = {};
    const keys = Object.keys(extras).sort();

    keys.forEach((key) => {
      sortedExtras[key] = [...extras[key]].sort();
    });

    return JSON.stringify(sortedExtras);
  };

  useEffect(() => {
    const initialQuantities: ItemQuantities = {};
    cartItems.forEach((cartItem) => {
      const sortedExtras = sortExtras(cartItem.extras);
      const key = `${cartItem.product.id}-${sortedExtras}-${cartItem.comment}`;
      initialQuantities[key] = cartItem.quantity;
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  const handleIncrement = (
    productId: string,
    extras: { [key: string]: string[] },
    comment: string
  ) => {
    const sortedExtras = sortExtras(extras);
    const key = `${productId}-${sortedExtras}-${comment}`;

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [key]: (prevQuantities[key] || 0) + 1,
      };

      // Update cartItems with updated quantities
      const updatedCartItems = cartItems.map((cartItem) =>
        `${cartItem.product.id}-${sortExtras(cartItem.extras)}-${
          cartItem.comment
        }` === key
          ? { ...cartItem, quantity: updatedQuantities[key] }
          : cartItem
      );

      // Save updated cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);

      return updatedQuantities;
    });

    // Ensure onCartItemsChange is called after updating cartItems
    setCartItems((currentCartItems) => {
      onCartItemsChange(currentCartItems);
      return currentCartItems;
    });
  };

  const handleDecrement = (
    productId: string,
    extras: { [key: string]: string[] },
    comment: string
  ) => {
    const sortedExtras = sortExtras(extras);
    const key = `${productId}-${sortedExtras}-${comment}`;

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [key]: (prevQuantities[key] || 0) - 1,
      };

      let updatedCartItems;

      if (updatedQuantities[key] <= 0) {
        // If quantity is 0 or less, remove item from cartItems
        updatedCartItems = cartItems.filter(
          (cartItem) =>
            `${cartItem.product.id}-${sortExtras(cartItem.extras)}-${
              cartItem.comment
            }` !== key
        );
      } else {
        // Otherwise, update quantity in cartItems
        updatedCartItems = cartItems.map((cartItem) =>
          `${cartItem.product.id}-${sortExtras(cartItem.extras)}-${
            cartItem.comment
          }` === key
            ? { ...cartItem, quantity: updatedQuantities[key] }
            : cartItem
        ) as CartItemNew[]; // Cast to ensure all items are CartItemNew instances
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
      const sortedExtras = sortExtras(item.extras);
      const key = `${item.product?.id}-${sortedExtras}-${item.comment}`;
      const price = item.finalPrice ?? item.product?.price;
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
          <div className="flex items-center gap-2 dark:text-white text-black">
            <p className="font-bold">{lng === "en" ? "Total:" : "სულ:"}</p>
            <div className="text-md  font-bold dark:text-white text-black">
              {getTotalPrice().toFixed(2)}{" "}
              <span className="text-xs">{lng === "en" ? " GEL" : " ₾"}</span>
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
          <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
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
                      src={cartitem.product?.imageUrl ?? ""}
                      width={150}
                      alt="Sample Image"
                      className="rounded-lg"
                    />
                    <div className="ml-4 flex w-full flex-col justify-between">
                      <h1 className="text-md font-bold text-black dark:text-white">
                        {lng === "en"
                          ? cartitem.product?.name_En
                          : cartitem.product?.name_Ka}
                      </h1>
                      <p className="text-xs text-white dark:text-white/70">
                        {Object.entries(cartitem.extras).map(
                          ([key, values]: [string, string[]]) =>
                            key === lng && (
                              <div key={key}>{values.join(", ")}</div>
                            )
                        )}
                      </p>
                      <p className="text-xs mt-3 text-white dark:text-white/70">
                        {cartitem.comment}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="mr-2 text-sm text-black dark:text-white">
                          <span className="text-white ml-1">
                            {cartitem.finalPrice?.toFixed(2) ??
                              cartitem.product?.price.toFixed(2)}
                          </span>
                          <span className="text-[11px]">
                            {lng === "en" ? " GEL" : " ₾"}
                          </span>
                        </p>
                        <div className="flex flex-row gap-4 items-center bg-white rounded-lg">
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() =>
                              handleDecrement(
                                cartitem.product?.id.toString(),
                                cartitem.extras,
                                cartitem.comment
                              )
                            }
                            className="text-white text-3xl bg-green-600"
                          >
                            <MinusIcon size={20} />
                          </Button>
                          <p className="text-lg text-black">
                            {
                              itemQuantities[
                                `${cartitem.product?.id}-${sortExtras(
                                  cartitem.extras
                                )}-${cartitem.comment}`
                              ]
                            }
                          </p>
                          <Button
                            size="sm"
                            isIconOnly
                            onClick={() =>
                              handleIncrement(
                                cartitem.product?.id.toString(),
                                cartitem.extras,
                                cartitem.comment
                              )
                            }
                            className="text-white text-3xl bg-green-600"
                          >
                            <PlusIcon size={20} />
                          </Button>
                        </div>
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
                <h1 className="font-bold dark:text-white text-black text-lg flex justify-between p-1">
                  {lng === "en" ? "Total:" : "სულ:"}{" "}
                  <p>
                    <span>{getTotalPrice().toFixed(2)}</span>
                    <span className="text-sm">
                      {lng === "en" ? " GEL" : " ₾"}
                    </span>
                  </p>
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
                  className="w-full bg-green-600 font-bold text-white"
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
