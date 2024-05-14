import { Navbar } from "@/app/components/navbar";
import { Locale } from "@/i18n.config";

interface MenuLayoutProps {
  lang: Locale;
  children: React.ReactNode;
  toggleLayout: (arg: boolean) => void;
  eopenSearch: () => void;
}

export const MenuLayout: React.FC<MenuLayoutProps> = ({
  lang,
  toggleLayout,
  children,
  eopenSearch,
}) => {
  function MenuToggleLayout(data: any) {
    toggleLayout(data);
  }

  function openSearch() {
    if (eopenSearch) eopenSearch();
  }
  return (
    <div className="relative  flex flex-col h-full ">
      <div className="justify-center items-center flex mb-24">
        <Navbar
          lng={lang}
          Menupage={true}
          extoggleLayout={MenuToggleLayout}
          openSearch={openSearch}
        />
      </div>
      {children}
    </div>
  );
};
