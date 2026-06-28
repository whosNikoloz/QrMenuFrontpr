"use client";

import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Locale } from "@/i18n.config";
import { Card, CardBody } from "@nextui-org/react";
import Footer from "@/app/components/Footer";
import { restaurantConfig } from "@/config/restaurant";

export default function AboutPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const translations = {
    en: {
      heroTitle: `About ${restaurantConfig.name.en}`,
      heroSubtitle: "A Story of Passion, Tradition & Excellence",
      ourStoryTitle: "Our Story",
      ourStoryContent:
        "Founded with a passion for authentic cuisine and exceptional hospitality, our restaurant has been serving the community with love and dedication. We believe that great food brings people together, and every dish we create is a celebration of flavors, traditions, and the joy of sharing a meal.",
      ourMissionTitle: "Our Mission",
      ourMissionContent:
        "To deliver an unforgettable dining experience by combining the finest ingredients, masterful preparation, and warm service. We strive to create a welcoming atmosphere where every guest feels like family.",
      ourValuesTitle: "Our Values",
      values: [
        {
          title: "Quality First",
          description:
            "We source only the freshest ingredients from trusted local suppliers and farmers.",
          icon: "⭐",
        },
        {
          title: "Authenticity",
          description:
            "Traditional recipes passed down through generations, prepared with care and expertise.",
          icon: "🎯",
        },
        {
          title: "Customer Satisfaction",
          description:
            "Your happiness is our priority. We go above and beyond to ensure every visit is memorable.",
          icon: "❤️",
        },
        {
          title: "Sustainability",
          description:
            "We are committed to sustainable practices and supporting our local community.",
          icon: "🌱",
        },
      ],
      teamTitle: "Meet Our Team",
      teamSubtitle:
        "Our passionate team of chefs and staff work together to create exceptional experiences",
      chefTitle: "Executive Chef",
      chefName: "Chef Georgian",
      chefBio:
        "With over 15 years of culinary experience, our head chef brings creativity and passion to every dish.",
      managerTitle: "Restaurant Manager",
      managerName: "Ana Beridze",
      managerBio:
        "Ensuring every guest receives exceptional service and a memorable dining experience.",
      locationTitle: "Visit Us",
    },
    ka: {
      heroTitle: `${restaurantConfig.name.ka} - ჩვენს შესახებ`,
      heroSubtitle: "გატაცების, ტრადიციებისა და სრულყოფილების ისტორია",
      ourStoryTitle: "ჩვენი ისტორია",
      ourStoryContent:
        "დაარსებული ავთენტური სამზარეულოსა და განსაკუთრებული სტუმართმოყვარეობის გატაცებით, ჩვენი რესტორანი ემსახურება საზოგადოებას სიყვარულითა და ერთგულებით. ჩვენ გვჯერა, რომ კარგი საკვები აერთიანებს ადამიანებს, და თითოეული კერძი, რომელსაც ვქმნით, არის გემოების, ტრადიციებისა და სადილის გაზიარების სიხარულის დღესასწაული.",
      ourMissionTitle: "ჩვენი მისია",
      ourMissionContent:
        "დაუვიწყარი სასადილო გამოცდილების მიწოდება საუკეთესო ინგრედიენტების, ოსტატური მომზადებისა და თბილი მომსახურების გაერთიანებით. ჩვენ ვცდილობთ შევქმნათ მისასალმებელი ატმოსფერო, სადაც ყველა სტუმარს ოჯახის წევრივით გრძნობს თავს.",
      ourValuesTitle: "ჩვენი ღირებულებები",
      values: [
        {
          title: "ხარისხი უპირველეს ყოვლისა",
          description:
            "ჩვენ ვიყენებთ მხოლოდ უახლეს ინგრედიენტებს სანდო ადგილობრივი მომწოდებლებისა და ფერმერებისგან.",
          icon: "⭐",
        },
        {
          title: "ავთენტურობა",
          description:
            "ტრადიციული რეცეპტები, რომლებიც გადაეცემა თაობიდან თაობას, მომზადებული ზრუნვითა და გამოცდილებით.",
          icon: "🎯",
        },
        {
          title: "მომხმარებელთა კმაყოფილება",
          description:
            "თქვენი ბედნიერება არის ჩვენი პრიორიტეტი. ჩვენ ვაღემატებით იმისთვის, რომ თითოეული ვიზიტი დასამახსოვრებელი იყოს.",
          icon: "❤️",
        },
        {
          title: "მდგრადობა",
          description:
            "ჩვენ ვართ ერთგულები მდგრადი პრაქტიკისა და ჩვენი ადგილობრივი საზოგადოების მხარდაჭერის მიმართ.",
          icon: "🌱",
        },
      ],
      teamTitle: "გაიცანით ჩვენი გუნდი",
      teamSubtitle:
        "ჩვენი გატაცებული შეფებისა და პერსონალის გუნდი ერთად მუშაობს განსაკუთრებული გამოცდილების შესაქმნელად",
      chefTitle: "აღმასრულებელი შეფი",
      chefName: "შეფ ჯორჯიან",
      chefBio:
        "15 წელზე მეტი კულინარიული გამოცდილებით, ჩვენი მთავარი შეფი თითოეულ კერძში შემოაქვს კრეატიულობა და გატაცება.",
      managerTitle: "რესტორნის მენეჯერი",
      managerName: "ანა ბერიძე",
      managerBio:
        "უზრუნველყოფს, რომ თითოეულმა სტუმარმა მიიღოს განსაკუთრებული მომსახურება და დასამახსოვრებელი სასადილო გამოცდილება.",
      locationTitle: "მოგვწვიეთ",
    },
  };

  const t = translations[lang];

  return (
    <MainLayout lang={lang}>
      <div className="w-full flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 z-10" />
          <div className="absolute inset-0 dark:opacity-30 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22c55e,transparent)]" />
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 dark:from-green-300 dark:via-emerald-400 dark:to-green-500 animate-gradient leading-tight py-3">
              {t.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200 mt-4 leading-relaxed py-2">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-6 leading-tight py-2">
              {t.ourStoryTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed py-2">
              {t.ourStoryContent}
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="w-full py-12 sm:py-16 bg-gradient-to-b from-transparent to-green-900/10 dark:to-green-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-6 leading-tight py-2">
              {t.ourMissionTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed py-2">
              {t.ourMissionContent}
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-12 leading-tight py-2">
              {t.ourValuesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {t.values.map((value, index) => (
                <Card
                  key={index}
                  className="group hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-transparent hover:border-green-500 dark:hover:border-green-400"
                >
                  <CardBody className="p-6 text-center space-y-4">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed py-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent to-green-900/10 dark:to-green-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-4 leading-tight py-2">
              {t.teamTitle}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 leading-relaxed py-1">
              {t.teamSubtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Chef Card */}
              <Card className="hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-transparent hover:border-green-500">
                <CardBody className="p-8 text-center space-y-4">
                  <div className="text-6xl mb-4">👨‍🍳</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-relaxed py-1">
                    {t.chefName}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    {t.chefTitle}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t.chefBio}
                  </p>
                </CardBody>
              </Card>

              {/* Manager Card */}
              <Card className="hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-transparent hover:border-green-500">
                <CardBody className="p-8 text-center space-y-4">
                  <div className="text-6xl mb-4">👩‍💼</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-relaxed py-1">
                    {t.managerName}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    {t.managerTitle}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t.managerBio}
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-8 leading-tight py-2">
              {t.locationTitle}
            </h2>
            <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-green-500/30">
              <CardBody className="p-8 text-center space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">📍</span>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {restaurantConfig.contact.address[lang]}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🕐</span>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {lang === "en" ? "Open Daily: " : "ღია ყოველდღე: "}
                      {restaurantConfig.hours[lang].weekdayHours}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">📞</span>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {lang === "en" ? "Phone: " : "ტელეფონი: "}
                      {restaurantConfig.contact.phone}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Footer lang={lang} />
      </div>
    </MainLayout>
  );
}
