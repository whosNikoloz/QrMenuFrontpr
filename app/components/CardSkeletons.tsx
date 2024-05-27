import { Button, Card, Skeleton } from "@nextui-org/react";
import { EditIcon, AddIcon, AddToShoppingCart } from "./icons";

const SkeletonCard = ({ lng }: { lng: string }) => {
  return (
    <>
      <div className="h-2.5 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
      <Card className="w-[350px] mx-auto  space-y-5 p-4 my-3" radius="lg">
        <div
          role="status"
          className=" flex flex-row animate-pulse justify-between gap-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-36 h-32 bg-gray-300 rounded   dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-1/2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="flex flex-row items-center justify-between mt-10">
              <div className="h-1 w-2/5  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <Button
                size="sm"
                className="w-1/2 bg-green-600 text-white"
                isDisabled
                endContent={<AddToShoppingCart size={23} />}
              >
                {lng === "en" ? "Add" : "დამატება"}
              </Button>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </Card>
      <Card className="w-[350px] mx-auto  space-y-5 p-4 my-3" radius="lg">
        <div
          role="status"
          className=" flex flex-row animate-pulse justify-between gap-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-36 h-32 bg-gray-300 rounded   dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-1/2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="flex flex-row items-center justify-between mt-10">
              <div className="h-1 w-2/5  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <Button
                size="sm"
                className="w-1/2 bg-green-600 text-white"
                isDisabled
                endContent={<AddToShoppingCart size={23} />}
              >
                {lng === "en" ? "Add" : "დამატება"}
              </Button>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </Card>
      <Card className="w-[350px] mx-auto  space-y-5 p-4 my-3" radius="lg">
        <div
          role="status"
          className=" flex flex-row animate-pulse justify-between gap-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-36 h-32 bg-gray-300 rounded   dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-1/2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="flex flex-row items-center justify-between mt-10">
              <div className="h-1 w-2/5  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <Button
                size="sm"
                className="w-1/2 bg-green-600 text-white"
                isDisabled
                endContent={<AddToShoppingCart size={23} />}
              >
                {lng === "en" ? "Add" : "დამატება"}
              </Button>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </Card>
      <div className="h-2.5 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
      <Card className="w-[350px] mx-auto  space-y-5 p-4 my-3" radius="lg">
        <div
          role="status"
          className=" flex flex-row animate-pulse justify-between gap-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-36 h-32 bg-gray-300 rounded   dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-1/2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="flex flex-row items-center justify-between mt-10">
              <div className="h-1 w-2/5  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <Button
                size="sm"
                className="w-1/2 bg-green-600 text-white"
                isDisabled
                endContent={<AddToShoppingCart size={23} />}
              >
                {lng === "en" ? "Add" : "დამატება"}
              </Button>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </Card>
      <Card className="w-[350px] mx-auto  space-y-5 p-4 my-3" radius="lg">
        <div
          role="status"
          className=" flex flex-row animate-pulse justify-between gap-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-36 h-32 bg-gray-300 rounded   dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-1/2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="flex flex-row items-center justify-between mt-10">
              <div className="h-1 w-2/5  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              <Button
                size="sm"
                className="w-1/2 bg-green-600 text-white"
                isDisabled
                endContent={<AddToShoppingCart size={23} />}
              >
                {lng === "en" ? "Add" : "დამატება"}
              </Button>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </Card>
    </>
  );
};

export default SkeletonCard;
