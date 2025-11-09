import { Navbar } from "@/app/components/navbar";
import { Locale } from "@/i18n.config";

export default function MainLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative flex flex-col h-full min-h-screen w-full">
      <div className="justify-center items-center flex mb-12 sm:mb-16 lg:mb-20">
        <Navbar
          lng={lang}
          Menupage={false}
          extoggleLayout={function (arg: boolean): void {
            throw new Error("Function not implemented.");
          }}
          openSearch={function (): void {
            throw new Error("Function not implemented.");
          }}
        />{" "}
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
