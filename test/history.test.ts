import { Country } from "../countries";
import { SalesHistory } from "../history";
import { Order, Item } from "../order";
import { describe, it, expect } from "vitest";
import { Product, Warehouse } from "../warehouse";
import { Address } from "../address";


const productA = new Product("a", "A very nice product", 10.0);
const productB = new Product("b", "A very nice product", 20.0);
const productC = new Product("c", "A very nice product", 30.0);

const catalogue = new Map([
  [productA, 100],
  [productB, 100],
  [productC, 100],
]);

const warehouse = new Warehouse(catalogue);

const addressA = new Address({
  country: Country.UNITED_KINGDOM,
  city: "London",
  postcode: "E1 4UD",
  street: "Fake St",
  house: "123",
});


describe("SalesHistory", () => {
  it("should have an empty list of productOrders", () => {
    const orderHistory = new SalesHistory();
    
    expect(orderHistory.productOrders).toEqual(new Map());
  });

  it("should have an empty list of addressOrders", () => {
    const orderHistory = new SalesHistory();

    expect(orderHistory.addressOrders).toEqual(new Map());
  });

  it("should be able to add an order to the productOrders", () => {
    const orderHistory = new SalesHistory();
    const order = new Order(addressA, warehouse, orderHistory);
    order.add(new Item(productA, 1));
    orderHistory.add(order);
    const orders = orderHistory.productOrders.get(productA);

    if (!orders) throw Error("Order not found");

    expect(orders).toEqual(new Set([order]));
  });

  it("should be able to add an order to the addressOrders", () => {
    const orderHistory = new SalesHistory();
    const order = new Order(addressA, warehouse, orderHistory);

    order.add(new Item(productA, 1));
    orderHistory.add(order);

    const orders = orderHistory.addressOrders.get(addressA);

    if (!orders) throw Error("Order not found");

    expect(orders).toEqual(new Set([order]));
  });
});
