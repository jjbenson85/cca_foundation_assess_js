import { Product, Warehouse } from "./warehouse";
import { calculateShipping as calculateShippingFn } from "./shipping";
import { Country } from "./countries";

export class Address {
  country: Country;
  city: string;
  street: string;
  postcode: string;
  constructor(address: {
    country: Country;
    city: string;
    street: string;
    postcode: string;
  }) {
    this.country = address.country;
    this.city = address.city;
    this.street = address.street;
    this.postcode = address.postcode;
  }
}

export class Item {
  product: Product;
  quantity: number;
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

export class Order {
  items: Item[];
  shippingAddress: Address;
  warehouse: Warehouse;
  calculateShipping: typeof calculateShippingFn;

  constructor(
    shippingAddress: Address,
    warehouse: Warehouse,
    calculateShipping = calculateShippingFn
  ) {
    this.items = [];
    this.shippingAddress = shippingAddress;
    this.warehouse = warehouse;
    this.calculateShipping = calculateShipping;
  }
  add(item: Item): void | Error {
    const isProductAvailable = this.warehouse.isProductAvailable(
      item.product,
      item.quantity
    );

    if (isProductAvailable instanceof Error) return isProductAvailable;
    if (!isProductAvailable) return Error("Not enough stock");

    this.items.push(item);
  }

  getSubtotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  async getTotal(): Promise<number | Error> {
    const country = this.shippingAddress.country;
    const subtotal = this.getSubtotal();

    try {
      const shippingTotal = await this.calculateShipping(country, subtotal);
      return subtotal + shippingTotal;
    } catch (e) {
      console.error(e);
      if (e instanceof Error) return e;
      return Error(e);
    }
  }

  confirm(): void {
    try {
      this.items.forEach((item) => {
        const isProductAvailable = this.warehouse.isProductAvailable(
          item.product,
          item.quantity
        );
        if (!isProductAvailable) throw new Error("Not enough stock");
        if (isProductAvailable instanceof Error) throw isProductAvailable;
      });
      this.items.forEach((item) => {
        this.warehouse.adjustStock(item.product, item.quantity);
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export class OrderHistory {
  productOrders: Map<Product, Set<Order>>;
  addressOrders: Map<Address, Set<Order>>;
  constructor() {
    this.productOrders = new Map();
    this.addressOrders = new Map();
  }
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
