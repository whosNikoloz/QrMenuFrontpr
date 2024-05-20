import ProductNew from "./ProductNew";

class CartItemNew {
  product: ProductNew;
  quantity: number;
  comment: string;
  extras: { [key: string]: string[] };
  finalPrice: number;

  constructor(
    product: ProductNew,
    quantity: number,
    comment: string,
    extras: { [key: string]: string[] },
    finalPrice: number
  ) {
    this.product = product;
    this.quantity = quantity;
    this.comment = comment;
    this.extras = extras;
    this.finalPrice = finalPrice;
  }

  //   getProductData(language: string): any {
  //     const {
  //       id,
  //       name_En,
  //       name_Ka,
  //       price,
  //       imageUrl,
  //       discount,
  //       description_En,
  //       description_Ka,
  //       options,
  //     } = this;
  //     const name = language === "en" ? name_En : name_Ka;
  //     const description = language === "en" ? description_En : description_Ka;
  //     const formattedPrice = this.price.toFixed(2);
  //     const discountedPrice =
  //       this.tempDiscountedPrice === 0
  //         ? (price - (price * discount) / 100).toFixed(2)
  //         : this.tempDiscountedPrice?.toFixed(2);

  //     return {
  //       id,
  //       name,
  //       price,
  //       imageUrl,
  //       discount,
  //       description,
  //       formattedPrice,
  //       discountedPrice,
  //       options,
  //     };
  //   }
}

export default CartItemNew;
