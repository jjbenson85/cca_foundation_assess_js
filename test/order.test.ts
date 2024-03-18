import { Order, Item, Address } from "../order";
import { describe, expect, it } from "vitest";
import { Product, Warehouse } from "../warehouse";
import { Country } from "../countries";
import { SalesHistory } from "../history";

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
  street: "123 Fake St",
  postcode: "E1 4UD",
});

describe("Order", () => {
    const orderHistory = new SalesHistory();

  it("should have an empty list of items and a shipping address", () => {
    const order = new Order(addressA, warehouse, orderHistory);
    expect(order.items).toEqual([]);
  });

  it("should have a shipping address", () => {
    const order = new Order(addressA, warehouse, orderHistory);
    expect(order.shippingAddress).toEqual(addressA);
  });

  it("should have a warehouse", () => {
    const order = new Order(addressA, warehouse, orderHistory);
    expect(order.warehouse, ).toEqual(warehouse);
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
    const order = new Order(addressA, warehouse, orderHistory);

    for (const item of items) {
      order.add(item);
    }

    expect(order.items).toEqual(items);
  });

  it("should return an error if there is not enough stock", () => {
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(productA, 101);
    expect(order.add(item)).toEqual(Error("Not enough stock"));
  });

  it("should return an error if the product is not found", () => {
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(new Product("d", "Not a real product", 40.0), 10);
    expect(order.add(item)).toEqual(Error("Product not found"));
  });

  it.each([
    ["zero items", [], 0],
    ["one item", [new Item(productA, 1)], 10],
    ["multiple items", [new Item(productA, 1), new Item(productB, 1)], 30],
    [
      "multiple items with different quantities",
      [new Item(productA, 1), new Item(productB, 2), new Item(productC, 3)],
      140,
    ],
  ] as [string, Item[], number][])(
    "should calculate the subtotal for %s",
    (_id, items, expected) => {
      const order = new Order(addressA, warehouse, orderHistory);

      for (const item of items) {
        order.add(item);
      }

      expect(order.getSubtotal()).toEqual(expected);
    }
  );

  it.each([
    ["1x productA", productA, 1, 14.99],
    ["1x productB", productB, 1, 24.99],
    ["2x productA", productA, 2, 24.99],
  ])(
    "should calculate the total for %s",
    async (_id, product, quantity, expected) => {
      const calculateShipping = async () => 4.99;

      const order = new Order(addressA, warehouse,orderHistory, calculateShipping);
      const item = new Item(product, quantity);

      order.add(item);

      const total = await order.getTotal();

      expect(total).toBeCloseTo(expected);
    }
  );

  it("should update the quantities of the warehouse when confirmed", () => {
    const warehouse = new Warehouse(catalogue);
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(productA, 10);
    order.add(item);
    order.confirm();
    expect(warehouse.checkStock(productA)).toEqual(90);
  });

  it("should throw an error if the product is not found when confirmed", () => {
    const warehouse = new Warehouse(catalogue);
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(productA, 10);
    order.add(item);

    // Adjust warehouse stock between adding item and confirming
    warehouse.removeProduct(productA);

    expect(() => order.confirm()).toThrowError("Product not found");
  });

  it("should throw an error if the quantity is not available when confirmed", () => {
    const warehouse = new Warehouse(catalogue);
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(productA, 50);
    order.add(item);

    // Adjust warehouse stock between adding item and confirming
    warehouse.adjustStock(productA, 99);

    expect(() => order.confirm()).toThrowError("Not enough stock");
  });

  it("should add itself to the order history when confirmed", () => {
    const warehouse = new Warehouse(catalogue);
    const orderHistory = new SalesHistory();
    const order = new Order(addressA, warehouse, orderHistory);
    const item = new Item(productA, 10);
    order.add(item);
    order.confirm();
    const orders = orderHistory.productOrders.get(productA);
    if (!orders) throw Error("Order not found");
    expect(orders).toEqual(new Set([order]));
  })
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

describe("Address", () => {
  it("should have a country", () => {
    const address = new Address({
      country: Country.UNITED_KINGDOM,
      city: "London",
      street: "123 Fake St",
      postcode: "E1 4UD",
    });
    expect(address.country).toEqual(Country.UNITED_KINGDOM);
  });
  it("should have a city", () => {
    const address = new Address({
      country: Country.UNITED_KINGDOM,
      city: "London",
      street: "123 Fake St",
      postcode: "E1 4UD",
    });
    expect(address.city).toEqual("London");
  });
  it("should have a street", () => {
    const address = new Address({
      country: Country.UNITED_KINGDOM,
      city: "London",
      street: "123 Fake St",
      postcode: "E1 4UD",
    });
    expect(address.street).toEqual("123 Fake St");
  });
  it("should have a postcode", () => {
    const address = new Address({
      country: Country.UNITED_KINGDOM,
      city: "London",
      street: "123 Fake St",
      postcode: "E1 4UD",
    });
    expect(address.postcode).toEqual("E1 4UD");
  });
});

