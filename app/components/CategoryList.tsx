import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

interface ProductCategoryProps {
  items?: ProductCategoryItem[];
}

interface ProductCategoryItem {
  id: string;
  name: string;
  image: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ items }) => {
  // Define a predefined set of product categories with random images
  const predefinedItems: ProductCategoryItem[] = [
    {
      id: "1",
      name: "Category A",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "2",
      name: "Category B",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "3",
      name: "Category C",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "4",
      name: "Category D",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "5",
      name: "Category E",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "6",
      name: "Category F",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "7",
      name: "Category F",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "8",
      name: "Category F",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "9",
      name: "Category F",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "10",
      name: "Category F",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
  ];

  const categoriesToShow = predefinedItems;

  return (
    <div className="mx-4 mt-4 grid grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-4">
      {categoriesToShow.map((item) => (
        <div key={item.id} className="w-full">
          <Card className="h-[170px] w-[170px] relative">
            <CardHeader className="absolute z-10 top-1 left-1 flex-col items-start">
              <p className="text-xs text-white uppercase font-bold">
                {item.name}
              </p>
              <h4 className="text-white font-medium text-sm">
                Creates beauty like a beast
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Category Image"
              className="z-0 w-full h-full object-cover"
              src={item.image}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
