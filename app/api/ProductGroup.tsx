// api/productGroups.ts

import ProductGroup from "@/models/ProductGroup";
import ProductNew from "@/models/ProductNew";

const mainAPI = "https://newgoldski30.conveyor.cloud/api/ProductGroup";

const fetchProductGroups = async (): Promise<ProductGroup[]> => {
  try {
    const response = await fetch(`${mainAPI}/all-with-products`);
    const data = await response.json();

    const productGroups: ProductGroup[] = data.map(
      (group: any) =>
        new ProductGroup(
          group.id,
          group.name_En,
          group.name_Ka,
          group.imageUrl,
          group.products.map(
            (product: any) =>
              new ProductNew(
                product.id,
                product.name_En,
                product.name_Ka,
                product.price,
                product.imageUrl,
                product.discount,
                product.description_En,
                product.description_Ka,
                product.group_Id,
                product.options,
                product.tempDiscountedPrice
              )
          )
        )
    );
    return productGroups;
  } catch (error) {
    console.error("Error fetching product groups:", error);
    return [];
  }
};

const createProductGroup = async (name_en: string, name_ka: string) => {
  try {
    const bodyData = JSON.stringify({ name_En: name_en, name_Ka: name_ka });

    const response = await fetch(`${mainAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    return response.json();
  } catch (error) {
    console.error("Error creating product group:", error);
    return null;
  }
};

const deleteProductGroup = async (groupId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${mainAPI}/${groupId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      console.error(
        `Failed to delete product group. Status: ${response.status}, Message: ${errorText}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error deleting product group:", error);
    return false;
  }
};

const editProductGroup = async (
  groupid: number,
  name_en: string,
  name_ka: string
) => {
  try {
    const bodyData = JSON.stringify({ name_En: name_en, name_Ka: name_ka });

    const response = await fetch(`${mainAPI}/${groupid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    return response.json();
  } catch (error) {
    console.error("Error creating product group:", error);
    return null;
  }
};

const GetProductGroup = async () => {
  try {
    const response = await fetch(`${mainAPI}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.error("Error deleting product group:", error);
    return null;
  }
};

export {
  fetchProductGroups,
  createProductGroup,
  editProductGroup,
  GetProductGroup,
  deleteProductGroup,
};
