"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
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
  icon: string;
  color: string;
}

const translations = {
  en: {
    sectionTitle: "Browse Our Menu",
    sectionSubtitle: "Choose your favorite category",
  },
  ka: {
    sectionTitle: "დაათვალიერეთ მენიუ",
    sectionSubtitle: "აირჩიეთ თქვენი საყვარელი კატეგორია",
  },
};

const ProductCategory: React.FC<ProductCategoryProps> = ({ items, lang }) => {
  const router = useRouter();
  const t = translations[lang];

  const predefinedItems: ProductCategoryItem[] = [
    {
      id: "1",
      name_en: "Pizza",
      name_ka: "პიცა",
      icon: "🍕",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "2",
      name_en: "Burgers",
      name_ka: "ბურგერები",
      icon: "🍔",
      color: "from-yellow-500 to-amber-600",
    },
    {
      id: "3",
      name_en: "Drinks",
      name_ka: "სასმელები",
      icon: "🥤",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "4",
      name_en: "Desserts",
      name_ka: "დესერტები",
      icon: "🍰",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const categoriesToShow = predefinedItems;

  return (
    <div className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-3 leading-tight py-2">
            {t.sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed py-1">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoriesToShow.map((item, index) => (
            <Card
              key={item.id}
              isPressable
              onPress={() => {
                router.push(`${lang}/menu`);
              }}
              className="group hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
            >
              <CardBody className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                >
                  <span className="text-4xl sm:text-5xl">{item.icon}</span>
                </div>

                <div className="py-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                    {lang === "en" ? item.name_en : item.name_ka}
                  </h3>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
