import { Product, Warehouse } from "./warehouse";
import { calculateShipping as calculateShippingFn } from "./shipping";
import { SalesHistory } from "./history";
import { Address } from "./address";


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
  salesHistory: SalesHistory;
  calculateShipping: typeof calculateShippingFn;

  constructor(
    shippingAddress: Address,
    warehouse: Warehouse,
    salesHistory: SalesHistory,
    calculateShipping = calculateShippingFn
  ) {
    this.items = [];
    this.shippingAddress = shippingAddress;
    this.warehouse = warehouse;
    this.salesHistory = salesHistory;
    this.calculateShipping = calculateShipping;
  }

  /**
   * Add an item to the order
   * @param item 
   * @returns an Error if the product is not available
   */
  add(item: Item): void | Error {
    const isProductAvailable = this.warehouse.isProductAvailable(
      item.product,
      item.quantity
    );

    if (isProductAvailable instanceof Error) return isProductAvailable;
    if (!isProductAvailable) return Error("Not enough stock");

    this.items.push(item);
  }

  /**
   * Calculate the subtotal of the order
   * @returns the subtotal of the order
   */
  getSubtotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  /**
   * Calculate the total of the order including shipping
   * @returns the total of the order
   * @returns an Error if the shipping cost cannot be calculated
   */
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

  /**
   * Confirm the order. This will adjust the stock in the warehouse and add the order to the order history.
   * Products will be checked for availability before adjusting the stock.
   * @error if the product is not available
   * @error if the shipping cost cannot be calculated
   * 
   */
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
        this.salesHistory.add(this);
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}


