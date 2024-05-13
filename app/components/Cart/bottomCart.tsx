import React from "react";
import { Button } from "@nextui-org/react";
import { LockIcon } from "@/app/components/icons";

export const BottomCart = ({ lng }: { lng: string }) => {
  return (
    <div className="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center w-11/12 max-w-screen-lg dark:bg-green-600 bg-white shadow-xl rounded-3xl p-2">
      <div className="flex justify-between w-full ml-3">
        <div className="flex  items-center gap-2">
          <p className=" text-black font-medium ">სულ:</p>
          <div className="text-md  text-black font-bold">0.00 ₾</div>
        </div>
        <Button color="success" size="md" endContent={<LockIcon />}>
          შეკვეთა
        </Button>
      </div>
    </div>
  );
};

export default BottomCart;
