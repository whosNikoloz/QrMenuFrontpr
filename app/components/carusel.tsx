/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css/core";
import { isMobile } from "react-device-detect";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  CardHeader,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Advertisement {
  advertid: number;
  advertName: string;
  advertLogo: string;
}

const AutoScrollCarousel = ({ lng }: { lng: string }) => {
  const [adverts, setAdverts] = useState<Advertisement[]>([
    {
      advertid: 1,
      advertName: "Advert 1",
      advertLogo:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      advertid: 2,
      advertName: "Advert 2",
      advertLogo:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
    {
      advertid: 3,
      advertName: "Advert 3",
      advertLogo:
        "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    },
  ]);

  const router = useRouter();

  const handleCourse = (FormatedName: string) => {};

  useEffect(() => {
    // const perPage = isMobile ? 3 : 6; // Adjust perPage based on the device type.
    // const gap = isMobile ? "1.5rem" : "1.5rem";

    const splide = new Splide(".splide", {
      gap: "1.5rem",
      pagination: true,
      arrows: false,
      type: "loop",
      perPage: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <>
      <div className="mx-5 flex">
        <div className="splide mb-5">
          <div className="splide__track">
            <ul className="splide__list ">
              {adverts.length > 0 ? ( // Check if there is fetched data
                adverts.map((advert) => (
                  <li className="splide__slide" key={advert.advertid}>
                    <Card
                      isFooterBlurred
                      className="w-full h-[200px] col-span-12 sm:col-span-5"
                    >
                      <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          New
                        </p>
                        <h4 className="text-black font-medium text-2xl">
                          Acme camera
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src={advert.advertLogo}
                      />
                    </Card>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
            <div className="splide__pagination "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoScrollCarousel;
