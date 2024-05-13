import React from "react";
import { Image, Button } from "@nextui-org/react";

interface Item {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CategorySectionProps {
  title: string;
  items: Item[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, items }) => {
  return (
    <div className="p-2">
      <h1 className="ml-4 text-black dark:text-white font-bold text-xl">
        {title}
      </h1>
      {items.map((item, index) => (
        <div className="flex justify-between bg-transparent p-6" key={index}>
          <Image
            src={item.imageUrl}
            width={200}
            alt="Sample Image"
            className="rounded-lg"
          />

          <div className="ml-4  flex w-full flex-col justify-between">
            <h1 className="text-md font-bold text-black dark:text-white ">
              {item.title}
            </h1>
            <p className="text-xs/3 text-white/70">{item.description}</p>

            <div className="mt-auto flex items-center justify-between">
              <p className="mr-2 text-sm  text-black dark:text-white">
                {item.price} ₾
              </p>

              <Button size="sm" className="text-white text-xs bg-green-600">
                დამატება
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
