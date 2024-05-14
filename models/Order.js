class Order {
  constructor(orderId, customerId, products, totalPrice, status, orderDate) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.products = products; // Array of product objects or IDs
    this.totalPrice = totalPrice;
    this.status = status;
    this.orderDate = orderDate;
  }

  // You can add methods to manipulate order data if needed
  getFormattedTotalPrice() {
    return `$${this.totalPrice.toFixed(2)}`;
  }

  getOrderSummary() {
    return {
      orderId: this.orderId,
      customerId: this.customerId,
      totalPrice: this.getFormattedTotalPrice(),
      status: this.status,
      orderDate: this.orderDate,
    };
  }
}

export default Order;
