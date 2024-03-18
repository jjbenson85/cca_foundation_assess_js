import { Warehouse } from './warehouse';

export class Item {
  product: string;
  quantity: number;
  constructor(product: string, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

export class Order {
  items: Item[];
  shippingAddress: string;
  warehouse: Warehouse;

  constructor(shippingAddress: string, warehouse: Warehouse) {
    this.items = [];
    this.shippingAddress = shippingAddress;
    this.warehouse = warehouse;
  }
  
  add(item: Item) {
    this.items.push(item);
  }
}

// Add Item - add an item to an order. An order item has a product and a quantity. There must be sufficient stock of that product to fulfil the order

// Total including shipping - calculate the total amount payable for the order, including shipping to the address

// Confirm order - when an order is confirmed, the stock levels of every product in the items are adjusted by the item quantity, and then the order is added to the sales history.
