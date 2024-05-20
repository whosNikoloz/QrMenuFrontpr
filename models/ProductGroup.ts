import ProductNew from "./ProductNew"; // Assuming you have a Product class defined

class ProductGroup {
  id: number;
  name_En: string;
  name_Ka: string;
  imageUrl: string | null;
  products: ProductNew[];

  constructor(
    id: number,
    name_En: string,
    name_Ka: string,
    imageUrl: string | null,
    products: ProductNew[] // Added the missing comma here
  ) {
    this.id = id;
    this.name_En = name_En;
    this.name_Ka = name_Ka;
    this.imageUrl = imageUrl;
    this.products = products.map(
      (product) =>
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
          product.DiscountedPrice ?? 0
        )
    );
  }
}

export default ProductGroup;
