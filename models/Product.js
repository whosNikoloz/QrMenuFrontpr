class Product {
  constructor(id, name, price, description, imageUrl, discount = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.discount = discount; // Discount as a percentage (e.g., 10 for 10%)
  }

  // Method to get the formatted price
  getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }

  // Method to calculate and get the discounted price
  getDiscountedPrice() {
    const discountedPrice = this.price - (this.price * this.discount) / 100;
    return `$${discountedPrice.toFixed(2)}`;
  }

  // Method to display product information
  getProductInfo() {
    return {
      id: this.id,
      name: this.name,
      price: this.getFormattedPrice(),
      discountedPrice: this.getDiscountedPrice(),
      description: this.description,
      imageUrl: this.imageUrl,
      discount: this.discount,
    };
  }
}

export default Product;
