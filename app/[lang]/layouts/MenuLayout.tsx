import { Navbar } from "@/app/components/navbar";
import { Locale } from "@/i18n.config";
import { BottomCart } from "@/app/components/Cart/bottomCart";

interface MenuLayoutProps {
  lang: Locale;
  children: React.ReactNode;
  toggleLayout: (arg: boolean) => void;
}

export const MenuLayout: React.FC<MenuLayoutProps> = ({
  lang,
  toggleLayout,
  children,
}) => {
  function MenuToggleLayout(data: any) {
    toggleLayout(data);
  }
  return (
    <div className="relative  flex flex-col h-full ">
      <div className="justify-center items-center flex mb-24">
        <Navbar lng={lang} Menupage={true} extoggleLayout={MenuToggleLayout} />
      </div>
      {children}
    </div>
  );
};
