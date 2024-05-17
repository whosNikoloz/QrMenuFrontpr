"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Link, Button, Avatar, ButtonGroup, Switch } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import { SearchIcon, LayoutOne, LayoutSecond } from "@/app/components/icons";

const SunFilledIcon = dynamic(
  () => import("@/app/components/icons").then((mod) => mod.SunFilledIcon),
  { ssr: false }
);
const MoonFilledIcon = dynamic(
  () => import("@/app/components/icons").then((mod) => mod.MoonFilledIcon),
  { ssr: false }
);

const UserIcon = dynamic(
  () => import("@/app/components/icons").then((mod) => mod.UserIcon),
  { ssr: false }
);

interface NavbarProps {
  lng: string;
  Menupage: boolean;
  extoggleLayout: (arg: boolean) => void;
  openSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lng,
  Menupage,
  extoggleLayout,
  openSearch,
}) => {
  const [lngstartCon, setLngstartCon] = useState<ReactNode>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { resolvedTheme, theme, setTheme } = useTheme();

  const pathName = usePathname();
  const router = useRouter();

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);
      router.push(newPath);
      return newPath;
    }

    const newPath = "/" + selectedLanguage;
    router.push(newPath);
    return newPath;
  };
  useEffect(() => {
    switch (lng) {
      case "ka":
        setLngstartCon(
          <Avatar
            alt="English"
            className="w-7 h-7 bg-transparent"
            src="https://flagsapi.com/US/flat/64.png"
          />
        );
        break;
      case "en":
        setLngstartCon(
          <Avatar
            alt="Georgia"
            className="w-7 h-7 bg-transparent"
            src="https://flagsapi.com/GE/flat/64.png"
          />
        );
        break;
    }
  }, [lng]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const [biglayout, setBiglayout] = useState(true);

  const toggleLayout = () => setBiglayout(!biglayout);

  const handleToggle = () => {
    toggleLayout();
    extoggleLayout(biglayout); // Call the toggleLayout function passed from parent (MenuLayout)
  };

  const handleSerach = () => {
    if (openSearch) {
      openSearch();
    }
  };

  return (
    <>
      <nav
        className={`z-50 fixed sm:w-8/12 w-11/12  top-1  rounded-2xl transition-all duration-300 backdrop-blur-sm ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }  mt-3 dark:bg-green-600 bg-white shadow-xl`}
      >
        <div className="mx-auto px-8 sm:px-6 lg:px-8">
          <div className="relative flex h-12 items-center justify-between">
            <div className="flex flex-row gap-2">
              <Link
                href={`/${lng}`}
                className={`p-0 bg-transparent  data-[hover=true]:bg-transparent font-bold gap-1 text-md sm:text-xl dark:text-white text-black `}
              >
                {Menupage
                  ? `${lng == "en" ? "Menu" : "მენიუ"}`
                  : `${lng == "en" ? "Nika" : "ნიკა"} ${
                      lng == "en" ? "DEV" : "დევ"
                    }`}
              </Link>
            </div>

            <div className="flex space-x-4 ">
              {/* <Link
                    href={`/${lng}/projects`}
                    className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold md:text-xs text-sm  dark:text-taso-lightgray`}
                  >
                    {lng == "en" ? "Projects" : "პროექტები"}
                  </Link>
                  <Link
                    href={`/${lng}/about`}
                    className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold  md:text-xs text-sm  dark:text-taso-lightgray `}
                  >
                    {lng == "en" ? "About Me" : "ჩემს შესახებ"}
                  </Link> */}
              <ButtonGroup>
                {Menupage && (
                  <>
                    <Button
                      className="bg-transparent text-black dark:text-white"
                      onClick={handleSerach}
                      isIconOnly
                    >
                      <SearchIcon size={27} />
                    </Button>
                    <Switch
                      defaultSelected
                      size="lg"
                      onChange={handleToggle}
                      color="success"
                      thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                          <LayoutOne className={className} />
                        ) : (
                          <LayoutSecond className={className} />
                        )
                      }
                    ></Switch>
                  </>
                )}
                <Button
                  className="bg-transparent text-black dark:text-white"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  isIconOnly
                >
                  {resolvedTheme === "dark" ? (
                    <SunFilledIcon size={27} />
                  ) : (
                    <MoonFilledIcon size={27} />
                  )}
                </Button>

                <Button
                  className="bg-transparent text-black dark:text-white"
                  onClick={() =>
                    handleLanguageChange(lng === "ka" ? "en" : "ka")
                  }
                  isIconOnly
                >
                  {lngstartCon}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
