import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import AutoScrollCarousel from "@/app/components/carusel";
import { Locale } from "@/i18n.config";
import ProductCategory from "../components/CategoryList";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <MainLayout lang={lang}>
      <AutoScrollCarousel lng={""} />
      <ProductCategory items={[]} />
    </MainLayout>
  );
}
