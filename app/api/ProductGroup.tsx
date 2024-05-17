// api/productGroups.ts

import ProductGroup from "@/models/ProductGroup";
import ProductNew from "@/models/ProductNew";

const mainAPI = "https://localhost:44380/api/ProductGroup";

const fetchProductGroups = async (): Promise<ProductGroup[]> => {
  try {
    const response = await fetch(`${mainAPI}/all-with-products`);
    const data = await response.json();
    console.log(data);
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

    console.log(productGroups);
    return productGroups;
  } catch (error) {
    console.error("Error fetching product groups:", error);
    return [];
  }
};

export { fetchProductGroups };
