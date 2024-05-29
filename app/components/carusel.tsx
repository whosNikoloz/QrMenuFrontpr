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
        "https://bonee.blob.core.windows.net/images/7627ac9f-c26b-f7d7-f3bb-e04979bbba2e_3.webp",
    },
    {
      advertid: 2,
      advertName: "Advert 2",
      advertLogo:
        "https://bonee.blob.core.windows.net/images/5468a25c-d66f-8195-ce7d-49edae0a215e_3.webp",
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
      autoplaySpeed: 50,
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <>
      <div className="mx-2 flex">
        <div className="splide mb-5">
          <div className="splide__track">
            <ul className="splide__list ">
              {adverts.length > 0 ? ( // Check if there is fetched data
                adverts.map((advert) => (
                  <li className="splide__slide" key={advert.advertid}>
                    <Card
                      isFooterBlurred
                      shadow="md"
                      className="w-full h-[200px] col-span-12 sm:col-span-5"
                    >
                      <img
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src={advert.advertLogo}
                      />
                    </Card>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoScrollCarousel;
