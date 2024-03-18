import { Product, Warehouse } from './warehouse';

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
  shippingAddress: string;
  warehouse: Warehouse;

  constructor(shippingAddress: string, warehouse: Warehouse) {
    this.items = [];
    this.shippingAddress = shippingAddress;
    this.warehouse = warehouse;
  }
  add(item: Item): void | Error{
    const isProductAvailable = this.warehouse.isProductAvailable(item.product, item.quantity);
    
    if(isProductAvailable instanceof Error) return isProductAvailable;
    if(!isProductAvailable) return Error("Not enough stock")
    
    this.items.push(item);
  }

  getSubtotal(): number {
    return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
}

// Add Item - add an item to an order. An order item has a product and a quantity. There must be sufficient stock of that product to fulfil the order

// Total including shipping - calculate the total amount payable for the order, including shipping to the address

// Confirm order - when an order is confirmed, the stock levels of every product in the items are adjusted by the item quantity, and then the order is added to the sales history.
