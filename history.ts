import { Order, Address } from "./order";
import { Product } from "./warehouse";

export class SalesHistory {
    productOrders: Map<Product, Set<Order>>;
    addressOrders: Map<Address, Set<Order>>;
    constructor() {
      this.productOrders = new Map();
      this.addressOrders = new Map();
    }
    /**
     * Adds an order to the product order history and the address order history
     * @param order 
     */
    add(order: Order) {
      for (const item of order.items) {
        if (this.productOrders.has(item.product)) {
          this.productOrders.get(item.product)?.add(order);
        } else {
          this.productOrders.set(item.product, new Set([order]));
        }
        if (this.addressOrders.has(order.shippingAddress)) {
          this.addressOrders.get(order.shippingAddress)?.add(order);
        } else {
          this.addressOrders.set(order.shippingAddress, new Set([order]));
        }
      }
    }
  }