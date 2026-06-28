"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import { Locale } from "@/i18n.config";
import { SearchIcon } from "./icons";
import { fetchProductGroups } from "@/app/api/ProductGroup";
import ProductGroup from "@/models/ProductGroup";
import ProductNew from "@/models/ProductNew";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  lang: Locale;
  isOpen: boolean;
  onClose: () => void;
}

const translations = {
  en: {
    searchPlaceholder: "Search for dishes...",
    categoryLabel: "Select Category",
    allCategories: "All Categories",
    noResults: "No products found",
    searchTitle: "Search Menu",
    price: "Price",
  },
  ka: {
    searchPlaceholder: "მოძებნეთ კერძები...",
    categoryLabel: "აირჩიეთ კატეგორია",
    allCategories: "ყველა კატეგორია",
    noResults: "პროდუქტი არ მოიძებნა",
    searchTitle: "მენიუს ძიება",
    price: "ფასი",
  },
};

export default function SearchBar({ lang, isOpen, onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductNew[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const t = translations[lang];

  useEffect(() => {
    const loadProductGroups = async () => {
      setLoading(true);
      const groups = await fetchProductGroups();
      setProductGroups(groups);
      setLoading(false);
    };

    if (isOpen && !productGroups.length) {
      loadProductGroups();
    }
  }, [isOpen, productGroups.length]);

  useEffect(() => {
    if (!productGroups.length) return;

    let products: ProductNew[] = [];

    if (selectedCategory === "all") {
      products = productGroups.flatMap((group) => group.products);
    } else {
      const selectedGroup = productGroups.find(
        (group) => group.id.toString() === selectedCategory
      );
      products = selectedGroup?.products || [];
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter((product) => {
        const name = lang === "en" ? product.name_En : product.name_Ka;
        const description =
          lang === "en" ? product.description_En : product.description_Ka;
        return (
          name.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query)
        );
      });
    }

    setFilteredProducts(products);
  }, [searchQuery, selectedCategory, productGroups, lang]);

  const handleProductClick = (product: ProductNew) => {
    router.push(`/${lang}/menu#category-${product.group_Id}`);
    onClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    onClose();
  };

  const categoryItems = [
    {
      key: "all",
      label: t.allCategories,
    },
    ...productGroups.map((group) => ({
      key: group.id.toString(),
      label: lang === "en" ? group.name_En ?? "" : group.name_Ka ?? "",
    })),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
      scrollBehavior="inside"
      placement="top"
      classNames={{
        base: "mt-20",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-green-600 dark:text-green-400 leading-relaxed py-2">
          {t.searchTitle}
        </ModalHeader>
        <ModalBody className="pb-6">
          <div className="space-y-4">
            <Input
              autoFocus
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<SearchIcon size={20} />}
              size="lg"
              classNames={{
                input: "text-base",
                inputWrapper:
                  "border-2 border-green-500/20 hover:border-green-500/40 focus-within:!border-green-500",
              }}
            />

            <Select
              label={t.categoryLabel}
              items={categoryItems}
              selectedKeys={new Set([selectedCategory])}
              onSelectionChange={(keys) => {
                if (keys === "all") {
                  setSelectedCategory("all");
                } else {
                  const firstKey = Array.from(keys)[0];
                  if (firstKey) {
                    setSelectedCategory(String(firstKey));
                  }
                }
              }}
              size="lg"
              classNames={{
                trigger:
                  "border-2 border-green-500/20 hover:border-green-500/40",
              }}
            >
              {(item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              )}
            </Select>

            <div className="space-y-3 mt-4">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    isPressable
                    onPress={() => handleProductClick(product)}
                    className="hover:scale-[1.02] transition-transform border-2 w-full border-transparent hover:border-green-500"
                  >
                    <CardBody className="p-3">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              product.imageUrl ||
                              "https://via.placeholder.com/80"
                            }
                            alt={
                              lang === "en"
                                ? product.name_En
                                : product.name_Ka
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate leading-relaxed">
                            {lang === "en"
                              ? product.name_En
                              : product.name_Ka}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                            {lang === "en"
                              ? product.description_En
                              : product.description_Ka}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {product.discount > 0 ? (
                              <>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                  {product.DiscountedPrice?.toFixed(2)} ₾
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  {product.price.toFixed(2)} ₾
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                {product.price.toFixed(2)} ₾
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : searchQuery || selectedCategory !== "all" ? (
                <div className="text-center py-8 text-gray-500">
                  {t.noResults}
                </div>
              ) : null}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
