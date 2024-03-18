import { Order, Item } from "../order";
import { describe, expect, it } from "vitest";
import { Product, Warehouse } from "../warehouse";

const productA = new Product("a", "A very nice product", 10.0);
const productB = new Product("b", "A very nice product", 20.0);
const productC = new Product("c", "A very nice product", 30.0);

describe("Order", () => {
  const catalogue = new Map([
    ["a", productA],
    ["b", productB],
    ["c", productC],
  ]);
  const warehouse = new Warehouse(catalogue);
  it("should have an empty list of items and a shipping address", () => {
    const order = new Order("123 Fake St", warehouse);
    expect(order.items).toEqual([]);
  });

  it("should have a shipping address", () => {
    const order = new Order("123 Fake St", warehouse);
    expect(order.shippingAddress).toEqual("123 Fake St");
  });

  it("should have a warehouse", () => {
    const order = new Order("123 Fake St", warehouse);
    expect(order.warehouse).toEqual(warehouse);
  });

  it.each([
    ["zero items", []],
    ["one item", [new Item(productA, 1)]],
    ["two items", [new Item(productA, 1), new Item(productB, 2)]],
    [
      "three items",
      [new Item(productA, 1), new Item(productB, 2), new Item(productC, 3)],
    ],
  ] as [string, Item[]][])("should be able to add %s", (_id, items) => {
    const order = new Order("123 Fake St", warehouse);

    for (const item of items) {
      order.add(item);
    }

    expect(order.items).toEqual(items);
  });
});

describe("Item", () => {
  it("should have a product", () => {
    const item = new Item(productA, 1);
    expect(item.product).toEqual(productA);
  });
  it("should have a quantity", () => {
    const item = new Item(productA, 1);
    expect(item.quantity).toEqual(1);
  });
});
