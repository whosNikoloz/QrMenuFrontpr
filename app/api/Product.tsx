import ProductNew from "@/models/ProductNew";
import { OptionClass, Option } from "@/models/Option";
import { OptionValueClass, OptionValue } from "@/models/OptionValue";

const mainAPI = "https://localhost:44380/api/Product";

const fetchProductWithOptionsAndValues = async (
  productid: number
): Promise<ProductNew | null> => {
  try {
    const response = await fetch(`${mainAPI}/${productid}/OptionsAndValues`);
    const data = await response.json();

    const options: Option[] = data.options.map((option: any) => {
      const optionValues: OptionValue[] = option.optionValues.map(
        (value: any) => {
          return new OptionValueClass(
            value.id,
            value.name_En,
            value.name_Ka,
            value.price,
            value.option_Id
          );
        }
      );

      return new OptionClass(
        option.id,
        option.name_En,
        option.name_Ka,
        option.product_Id,
        option.type,
        optionValues
      );
    });

    const product: ProductNew = new ProductNew(
      data.id,
      data.name_En,
      data.name_Ka,
      data.price,
      data.imageUrl,
      data.discount,
      data.description_En,
      data.description_Ka,
      data.group_Id,
      options,
      data.DiscountedPrice
    );
    return product;
  } catch (error) {
    console.error("Error fetching product groups:", error);
    return null;
  }
};

export { fetchProductWithOptionsAndValues };
