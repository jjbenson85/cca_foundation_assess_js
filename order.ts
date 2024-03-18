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
  
}

// Add Item - add an item to an order. An order item has a product and a quantity. There must be sufficient stock of that product to fulfil the order

// Total including shipping - calculate the total amount payable for the order, including shipping to the address

// Confirm order - when an order is confirmed, the stock levels of every product in the items are adjusted by the item quantity, and then the order is added to the sales history.
