import { Order, Item } from "../order";
import { describe, expect, it } from "vitest";
import { Warehouse } from "../warehouse";

describe("Order", () => {
  const warehouse = new Warehouse();
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
    ["one item", [new Item("a", 1)]],
    ["two items", [new Item("a", 1), new Item("b", 2)]],
    ["three items", [new Item("a", 1), new Item("b", 2), new Item("c", 3)]],
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
    const item = new Item("product", 1);
    expect(item.product).toEqual("product");
  });
  it("should have a quantity", () => {
    const item = new Item("product", 1);
    expect(item.quantity).toEqual(1);
  });
});
