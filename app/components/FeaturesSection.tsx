"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Locale } from "@/i18n.config";

interface FeaturesSectionProps {
  lang: Locale;
}

const translations = {
  en: {
    sectionTitle: "Why Choose Us",
    features: [
      {
        title: "Fresh Ingredients",
        description:
          "We source only the finest, freshest ingredients from local farmers and trusted suppliers.",
        icon: "🥗",
      },
      {
        title: "Master Chefs",
        description:
          "Our experienced chefs bring years of culinary expertise to every dish they create.",
        icon: "👨‍🍳",
      },
      {
        title: "Authentic Flavors",
        description:
          "Experience traditional recipes passed down through generations, prepared with love.",
        icon: "🍲",
      },
      {
        title: "Fast Service",
        description:
          "Quick and efficient service without compromising on quality or presentation.",
        icon: "⚡",
      },
      {
        title: "Cozy Atmosphere",
        description:
          "Enjoy your meal in our warm, welcoming environment designed for comfort.",
        icon: "🏠",
      },
      {
        title: "Digital Menu",
        description:
          "Browse our complete menu easily on your device with detailed descriptions and images.",
        icon: "📱",
      },
    ],
  },
  ka: {
    sectionTitle: "რატომ ჩვენ",
    features: [
      {
        title: "ახალი ინგრედიენტები",
        description:
          "ჩვენ ვიყენებთ მხოლოდ საუკეთესო, ახალ ინგრედიენტებს ადგილობრივი ფერმერებისგან და სანდო მომწოდებლებისგან.",
        icon: "🥗",
      },
      {
        title: "ოსტატი შეფები",
        description:
          "ჩვენი გამოცდილი შეფები თითოეულ კერძში აერთიანებენ წლების კულინარიულ ოსტატობას.",
        icon: "👨‍🍳",
      },
      {
        title: "ავთენტური გემოები",
        description:
          "გამოსცადეთ ტრადიციული რეცეპტები, რომლებიც გადაეცემა თაობიდან თაობას, მოამზადებული სიყვარულით.",
        icon: "🍲",
      },
      {
        title: "სწრაფი მომსახურება",
        description:
          "სწრაფი და ეფექტური მომსახურება ხარისხის ან პრეზენტაციის შეფერხების გარეშე.",
        icon: "⚡",
      },
      {
        title: "მყუდრო ატმოსფერო",
        description:
          "ისიამოვნეთ ჩვენს თბილ, მისასალმებელ გარემოში, შექმნილ კომფორტისთვის.",
        icon: "🏠",
      },
      {
        title: "ციფრული მენიუ",
        description:
          "მარტივად დაათვალიეროთ ჩვენი სრული მენიუ თქვენს მოწყობილობაზე დეტალური აღწერებითა და სურათებით.",
        icon: "📱",
      },
    ],
  },
};

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const t = translations[lang];

  return (
    <div className="w-full py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 leading-tight py-3 pb-1">
            {t.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
            >
              <CardBody className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed py-1">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed min-h-[4rem]">
                    {feature.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
