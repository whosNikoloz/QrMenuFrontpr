import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";

interface ProductCategoryProps {
  items?: ProductCategoryItem[];
  lang: Locale;
}

interface ProductCategoryItem {
  id: string;
  name: string;
  image: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ items, lang }) => {
  const router = useRouter();
  // Define a predefined set of product categories with random images
  const predefinedItems: ProductCategoryItem[] = [
    {
      id: "1",
      name: "Category A",
      image:
        "https://bonee.blob.core.windows.net/images/1dae5380-42a7-462f-ef6d-14d0a4d241db_2.webp",
    },
    {
      id: "2",
      name: "Category B",
      image:
        "https://bonee.blob.core.windows.net/images/e7848a08-977f-a52d-fa23-fd1af15fb834_2.webp",
    },
    {
      id: "3",
      name: "Category C",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
  ];

  const categoriesToShow = predefinedItems;

  return (
    <div className="mx-4 mt-4 grid  grid-cols-2 lg:grid-cols-4 gap-4">
      {categoriesToShow.map((item) => (
        <div key={item.id} className="w-full">
          <Card
            className="h-[170px] w-[170px] relative"
            isPressable
            onPress={() => {
              router.push(`${lang}/menu`);
            }}
          >
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
