import React from "react";
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";

interface ProductCategoryProps {
  items?: ProductCategoryItem[];
  lang: Locale;
}

interface ProductCategoryItem {
  id: string;
  name_en: string;
  name_ka: string;
  image: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ items, lang }) => {
  const router = useRouter();
  // Define a predefined set of product categories with random images
  const predefinedItems: ProductCategoryItem[] = [
    {
      id: "1",
      name_en: "Pizza",
      name_ka: "პიცა",
      image:
        "https://bonee.blob.core.windows.net/images/1dae5380-42a7-462f-ef6d-14d0a4d241db_2.webp",
    },
    {
      id: "2",
      name_en: "BURGER",
      name_ka: "ბურგერი",
      image:
        "https://bonee.blob.core.windows.net/images/e7848a08-977f-a52d-fa23-fd1af15fb834_2.webp",
    },
    {
      id: "3",
      name_en: "Pizza",
      name_ka: "პიცა",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      id: "3",
      name_en: "TEST",
      name_ka: "ტესტი",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
  ];

  const categoriesToShow = predefinedItems;

  return (
    <div className="mx-auto grid  grid-cols-2  gap-4 mb-10">
      {categoriesToShow.map((item) => (
        <div key={item.id} className="w-full">
          <Card
            isFooterBlurred
            className="h-[190px] w-[190px] col-span-12 sm:col-span-7"
            isPressable
            onPress={() => {
              router.push(`${lang}/menu`);
            }}
          >
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={item.image}
            />
            <h1>test</h1>
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col text-start">
                  <p className="text-tiny text-white/60">
                    {lang === "en" ? item.name_en : item.name_ka}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
