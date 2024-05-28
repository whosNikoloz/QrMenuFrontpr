import { Option, OptionClass } from "./Option";

class ProductNew {
  id: number;
  name_En: string;
  name_Ka: string;
  price: number;
  imageUrl: string | null;
  discount: number;
  description_En: string;
  description_Ka: string;
  group_Id: number;
  DiscountedPrice?: number;
  StaticPrice?: number;
  options: Option[];
  originalPrice: number;
  originalDiscountedPrice: number;

  constructor(
    id: number,
    name_En: string,
    name_Ka: string,
    price: number,
    imageUrl: string | null,
    discount: number,
    description_En: string,
    description_Ka: string,
    group_Id: number,
    options: Option[] = [],
    DiscountedPrice: number
  ) {
    this.id = id;
    this.name_En = name_En;
    this.name_Ka = name_Ka;
    this.price = price;
    this.imageUrl = imageUrl;
    this.discount = discount;
    this.description_En = description_En;
    this.description_Ka = description_Ka;
    this.group_Id = group_Id;
    this.options = options;
    this.DiscountedPrice = DiscountedPrice ?? price - (price * discount) / 100;
    this.StaticPrice = price - (price * discount) / 100 ?? price;

    this.originalPrice = price;
    this.originalDiscountedPrice = this.DiscountedPrice;
  }

  incrementPrice(optionId: number, valueId: number): void {
    const option = this.options.find((option) => option.id === optionId);
    if (option) {
      const value = option.optionValues.find((value) => value.id === valueId);
      if (value) {
        if (this.discount !== 0) {
          this.DiscountedPrice = (this.DiscountedPrice ?? 0) + value.price;
        } else {
          this.price = this.price + value.price;
        }
      }
    }
  }

  // Method to decrement the price based on an unselected option
  decrementPrice(optionId: number, valueId: number): void {
    const option = this.options.find((option) => option.id === optionId);
    if (option) {
      const value = option.optionValues.find((value) => value.id === valueId);
      if (value) {
        if (this.discount !== 0) {
          this.DiscountedPrice = (this.DiscountedPrice ?? 0) - value.price;
        } else {
          this.price = this.price - value.price;
        }
      }
    }
  }

  getProductData(language: string): any {
    const {
      id,
      name_En,
      name_Ka,
      price,
      imageUrl,
      discount,
      description_En,
      description_Ka,
      options,
    } = this;
    const name = language === "en" ? name_En : name_Ka;
    const description = language === "en" ? description_En : description_Ka;
    const formattedPrice = this.price.toFixed(2);
    const discountedPrice =
      this.DiscountedPrice === 0
        ? (price - (price * discount) / 100).toFixed(2)
        : this.DiscountedPrice?.toFixed(2);

    return {
      id,
      name,
      price,
      imageUrl,
      discount,
      description,
      formattedPrice,
      discountedPrice,
      options,
    };
  }
}

export default ProductNew;
