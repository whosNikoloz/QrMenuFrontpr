import ProductNew from "@/models/ProductNew";
import { OptionClass, Option } from "@/models/Option";
import { OptionValueClass, OptionValue } from "@/models/OptionValue";

const mainAPI = "https://newsageleaf67.conveyor.cloud/api/Product";

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

const createProduct = async (
  product: ProductCreateDto
): Promise<ProductNew | null> => {
  try {
    const response = await fetch(mainAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();

    var newproduct = new ProductNew(
      data.id,
      data.name_En,
      data.name_Ka,
      data.price,
      data.imageUrl,
      data.discount,
      data.description_En,
      data.description_Ka,
      data.group_Id,
      data.options,
      data.DiscountedPrice ?? 0
    );

    if (response.ok) {
      return newproduct;
    } else {
      console.error("Error creating product:", data);
      return null;
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

const editProduct = async (
  productid: number,
  name_en: string,
  name_ka: string,
  price: number,
  imageUrl: string,
  discount: number,
  description_en: string,
  description_ka: string,
  group_Id: number
) => {
  try {
    const bodyData = JSON.stringify({
      name_En: name_en,
      name_Ka: name_ka,
      price: price,
      imageUrl: imageUrl,
      discount: discount,
      description_En: description_en,
      description_Ka: description_ka,
      group_Id: group_Id,
    });

    const response = await fetch(`${mainAPI}/${productid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    if (response.ok) {
      var data = await response.json();
      return data;
    } else {
      console.error("Error updating product:", response);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

const deleteProduct = async (productid: number): Promise<boolean> => {
  try {
    const response = await fetch(`${mainAPI}/${productid}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Error deleting product:", response);
      return false;
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

export {
  fetchProductWithOptionsAndValues,
  createProduct,
  editProduct,
  deleteProduct,
};
