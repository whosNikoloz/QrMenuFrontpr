import { Button, Card, Skeleton } from "@nextui-org/react";
import { EditIcon, AddIcon, AddToShoppingCart } from "./icons";

const SkeletonCard = ({ lng }: { lng: string }) => {
  return (
    <>
      {/* First Section */}
      <div className="w-full flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="w-full max-w-4xl">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4 sm:mb-5 lg:mb-6"></div>

          {/* Cards Container */}
          <div className="space-y-2 sm:space-y-3">
            {/* List Skeleton Card 1 */}
            <Card className="w-full p-3 sm:p-4 lg:p-5" radius="lg">
              <div
                role="status"
                className="flex flex-col sm:flex-row animate-pulse justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-row sm:flex-shrink-0 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-lg dark:bg-gray-700 flex-shrink-0">
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
                  <div className="flex flex-col justify-between sm:hidden flex-1">
                    <div>
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24 mb-1"></div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex sm:ml-4 lg:ml-5 flex-1 flex-col justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between gap-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white px-4 md:px-6"
                      isDisabled
                      endContent={<AddToShoppingCart size={20} />}
                    >
                      {lng === "en" ? "Add" : "დამატება"}
                    </Button>
                  </div>
                </div>

                <div className="flex sm:hidden mt-3 items-center justify-between gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white px-3"
                    isDisabled
                    endContent={<AddToShoppingCart size={16} />}
                  >
                    {lng === "en" ? "Add" : "დამატება"}
                  </Button>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Card>

            {/* List Skeleton Card 2 */}
            <Card className="w-full p-3 sm:p-4 lg:p-5" radius="lg">
              <div
                role="status"
                className="flex flex-col sm:flex-row animate-pulse justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-row sm:flex-shrink-0 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-lg dark:bg-gray-700 flex-shrink-0">
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
                  <div className="flex flex-col justify-between sm:hidden flex-1">
                    <div>
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24 mb-1"></div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex sm:ml-4 lg:ml-5 flex-1 flex-col justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between gap-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white px-4 md:px-6"
                      isDisabled
                      endContent={<AddToShoppingCart size={20} />}
                    >
                      {lng === "en" ? "Add" : "დამატება"}
                    </Button>
                  </div>
                </div>

                <div className="flex sm:hidden mt-3 items-center justify-between gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white px-3"
                    isDisabled
                    endContent={<AddToShoppingCart size={16} />}
                  >
                    {lng === "en" ? "Add" : "დამატება"}
                  </Button>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Card>

            {/* List Skeleton Card 3 */}
            <Card className="w-full p-3 sm:p-4 lg:p-5" radius="lg">
              <div
                role="status"
                className="flex flex-col sm:flex-row animate-pulse justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-row sm:flex-shrink-0 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-lg dark:bg-gray-700 flex-shrink-0">
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
                  <div className="flex flex-col justify-between sm:hidden flex-1">
                    <div>
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24 mb-1"></div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex sm:ml-4 lg:ml-5 flex-1 flex-col justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between gap-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white px-4 md:px-6"
                      isDisabled
                      endContent={<AddToShoppingCart size={20} />}
                    >
                      {lng === "en" ? "Add" : "დამატება"}
                    </Button>
                  </div>
                </div>

                <div className="flex sm:hidden mt-3 items-center justify-between gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white px-3"
                    isDisabled
                    endContent={<AddToShoppingCart size={16} />}
                  >
                    {lng === "en" ? "Add" : "დამატება"}
                  </Button>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="w-full max-w-4xl">
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4 sm:mb-5 lg:mb-6"></div>

          {/* Cards Container */}
          <div className="space-y-2 sm:space-y-3">
            {/* List Skeleton Card 1 */}
            <Card className="w-full p-3 sm:p-4 lg:p-5" radius="lg">
              <div
                role="status"
                className="flex flex-col sm:flex-row animate-pulse justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-row sm:flex-shrink-0 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-lg dark:bg-gray-700 flex-shrink-0">
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
                  <div className="flex flex-col justify-between sm:hidden flex-1">
                    <div>
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24 mb-1"></div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex sm:ml-4 lg:ml-5 flex-1 flex-col justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between gap-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white px-4 md:px-6"
                      isDisabled
                      endContent={<AddToShoppingCart size={20} />}
                    >
                      {lng === "en" ? "Add" : "დამატება"}
                    </Button>
                  </div>
                </div>

                <div className="flex sm:hidden mt-3 items-center justify-between gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white px-3"
                    isDisabled
                    endContent={<AddToShoppingCart size={16} />}
                  >
                    {lng === "en" ? "Add" : "დამატება"}
                  </Button>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Card>

            {/* List Skeleton Card 2 */}
            <Card className="w-full p-3 sm:p-4 lg:p-5" radius="lg">
              <div
                role="status"
                className="flex flex-col sm:flex-row animate-pulse justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-row sm:flex-shrink-0 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-300 rounded-lg dark:bg-gray-700 flex-shrink-0">
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
                  <div className="flex flex-col justify-between sm:hidden flex-1">
                    <div>
                      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24 mb-1"></div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex sm:ml-4 lg:ml-5 flex-1 flex-col justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between gap-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <Button
                      size="sm"
                      className="bg-green-600 text-white px-4 md:px-6"
                      isDisabled
                      endContent={<AddToShoppingCart size={20} />}
                    >
                      {lng === "en" ? "Add" : "დამატება"}
                    </Button>
                  </div>
                </div>

                <div className="flex sm:hidden mt-3 items-center justify-between gap-3">
                  <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white px-3"
                    isDisabled
                    endContent={<AddToShoppingCart size={16} />}
                  >
                    {lng === "en" ? "Add" : "დამატება"}
                  </Button>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
