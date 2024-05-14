class CartItem {
  constructor(product, quantity = 1, customDescription = "", extraItems = []) {
    this.product = product;
    this.quantity = quantity; // Quantity of the product
    this.customDescription = customDescription; // e.g., allergy information or special instructions
    this.extraItems = extraItems; // Array of extra items or modifications
  }

  getItemInfo() {
    return {
      product: this.product.getProductInfo(),
      quantity: this.quantity,
      customDescription: this.customDescription,
      extraItems: this.extraItems,
    };
  }
}

export default CartItem;
