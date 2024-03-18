import { describe, expect, it } from "vitest";
import { Warehouse, Product } from "../warehouse";

describe("Warehouse", () => {
  const catalogue = new Map();
  it("should have a catalogue", () => {
    const warehouse = new Warehouse(catalogue);
    expect(warehouse.catalogue).toEqual(catalogue);
  });
});

describe("Product", () => {
  it.each([
    ["id1", { id: "id1", description: "description1", price: 1 }, "id1"],
    ["id2", { id: "id2", description: "description2", price: 2 }, "id2"],
    ["id3", { id: "id3", description: "description3", price: 3 }, "id3"],
  ])("should have an id | %s", (_id, { id, description, price }) => {
    const product = new Product(id, description, price);
    expect(product.id).toEqual(id);
  });

  it.each([
    [
      "description1",
      { id: "id1", description: "description1", price: 1 },
      "id1",
    ],
    [
      "description2",
      { id: "id2", description: "description2", price: 2 },
      "id2",
    ],
    [
      "description3",
      { id: "id3", description: "description3", price: 3 },
      "id3",
    ],
  ])("should have a description | %s", (_id, { id, description, price }) => {
    const product = new Product(id, description, price);
    expect(product.description).toEqual(description);
  });

  it.each([
    [1, { id: "id1", description: "description1", price: 1 }, 1],
    [2, { id: "id2", description: "description2", price: 2 }, 2],
    [3, { id: "id3", description: "description3", price: 3 }, 3],
  ])(
    "should have a price | %s",
    (_id, { id, description, price }, expected) => {
      const product = new Product(id, description, price);
      expect(product.price).toEqual(expected);
    }
  );
});
