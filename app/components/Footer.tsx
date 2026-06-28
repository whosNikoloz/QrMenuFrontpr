"use client";

import React from "react";
import { Link } from "@nextui-org/react";
import { Locale } from "@/i18n.config";
import { restaurantConfig } from "@/config/restaurant";

interface FooterProps {
  lang: Locale;
}

const translations = {
  en: {
    aboutUs: "About Us",
    aboutDescription:
      "We are passionate about delivering exceptional dining experiences with authentic flavors and warm hospitality.",
    quickLinks: "Quick Links",
    menu: "Menu",
    about: "About",
    contactUs: "Contact Us",
    openingHours: "Opening Hours",
    followUs: "Follow Us",
    rightsReserved: "All rights reserved.",
  },
  ka: {
    aboutUs: "ჩვენს შესახებ",
    aboutDescription:
      "ჩვენ გატაცებული ვართ განსაკუთრებული სასადილო გამოცდილების მიწოდებით ავთენტური გემოებითა და თბილი სტუმართმოყვარეობით.",
    quickLinks: "სწრაფი ბმულები",
    menu: "მენიუ",
    about: "შესახებ",
    contactUs: "დაგვიკავშირდით",
    openingHours: "სამუშაო საათები",
    followUs: "გამოგვყევით",
    rightsReserved: "ყველა უფლება დაცულია.",
  },
};

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-transparent to-green-900/20 dark:to-green-900/40 border-t border-green-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 leading-relaxed py-1">
              {t.aboutUs}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed py-1">
              {t.aboutDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 leading-relaxed py-1">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/menu`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {t.menu}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {t.about}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 leading-relaxed py-1">
              {t.contactUs}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 dark:text-green-400">📍</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {restaurantConfig.contact.address[lang]}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 dark:text-green-400">📞</span>
                <Link
                  href={`tel:${restaurantConfig.contact.phone}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {restaurantConfig.contact.phone}
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 dark:text-green-400">✉️</span>
                <Link
                  href={`mailto:${restaurantConfig.contact.email}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {restaurantConfig.contact.email}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 leading-relaxed py-1">
              {t.openingHours}
            </h3>
            <ul className="space-y-3">
              <li>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {restaurantConfig.hours[lang].weekdays}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {restaurantConfig.hours[lang].weekdayHours}
                </p>
              </li>
              <li>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {restaurantConfig.hours[lang].weekends}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {restaurantConfig.hours[lang].weekendHours}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/20 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-bold text-green-600 dark:text-green-400 leading-relaxed py-1">
              {t.followUs}
            </h3>
            <div className="flex justify-center space-x-6">
              <Link
                href={restaurantConfig.social.facebook}
                target="_blank"
                className="text-2xl hover:scale-110 transition-transform"
              >
                📘
              </Link>
              <Link
                href={restaurantConfig.social.instagram}
                target="_blank"
                className="text-2xl hover:scale-110 transition-transform"
              >
                📷
              </Link>
              <Link
                href={restaurantConfig.social.twitter}
                target="_blank"
                className="text-2xl hover:scale-110 transition-transform"
              >
                🐦
              </Link>
              <Link
                href={restaurantConfig.social.tiktok}
                target="_blank"
                className="text-2xl hover:scale-110 transition-transform"
              >
                🎵
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500/20 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} {restaurantConfig.name[lang]}. {t.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
