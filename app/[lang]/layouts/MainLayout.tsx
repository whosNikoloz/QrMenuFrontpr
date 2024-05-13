import { Navbar } from "@/app/components/navbar";
import { Locale } from "@/i18n.config";
import { BottomCart } from "@/app/components/Cart/bottomCart";

export default function MainLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative  flex flex-col h-full ">
      <div className="justify-center items-center flex mb-24">
        <Navbar lng={lang} NotMain={false} />{" "}
      </div>
      {children}
      <div className="justify-center bg-transparent items-center flex mb-24">
        <BottomCart lng={lang} />{" "}
      </div>
    </div>
  );
}
