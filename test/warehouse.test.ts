import { describe, expect, it } from "vitest";
import { Warehouse, Product } from "../warehouse";

describe("Warehouse", () => {
  const productA = new Product("a", "A very nice product", 10.0);
  const productB = new Product("b", "A very nice product", 20.0);
  const productC = new Product("c", "A very nice product", 30.0);
  const catalogue = new Map([
    [productA, 100],
    [productB, 200],
    [productC, 300],
  ]);
  it("should have a catalogue", () => {
    const warehouse = new Warehouse(catalogue);
    expect(warehouse.catalogue).toEqual(catalogue);
  });

  it.each([
    ["productA", productA, 100],
    ["productB", productB, 200],
    ["productC", productC, 300],
  ])("should get the quantity of %s", (_id, product, expected) => {
    const warehouse = new Warehouse(catalogue);
    expect(warehouse.checkStock(product)).toEqual(expected);
  });

  it("should return an error if the product is not found", () => {
    const warehouse = new Warehouse(catalogue);
    expect(
      warehouse.checkStock(new Product("d", "A very nice product", 40.0))
    ).toEqual(Error("Product not found"));
  });

  it.each([
    ["10 of productA are available", productA, 10, true],
    ["100 of productA are available", productA, 100, true],
    ["200 of productA are not available", productA, 200, false],
  ])(
    "should return the correct response for when %s",
    (_is, product, quantity, expected) => {
      const warehouse = new Warehouse(catalogue);
      expect(warehouse.isProductAvailable(product, quantity)).toEqual(expected);
    }
  );

  it("should return an error if the product is not found", () => {
    const warehouse = new Warehouse(catalogue);
    expect(
      warehouse.isProductAvailable(
        new Product("d", "A very nice product", 40.0),
        10
      )
    ).toEqual(Error("Product not found"));
  });

  it.each([
    ["productA", productA, 10, 90],
    ["productB", productB, 10, 190],
    ["productC", productC, 10, 290],
  ])("should adjust the stock of %s", (_id, product, quantity, expected) => {
    const warehouse = new Warehouse(catalogue);
    expect(warehouse.adjustStock(product, quantity)).toEqual(expected);
  });

  it("should throw an error if the product is not found", () => {
    const warehouse = new Warehouse(catalogue);
    expect(() =>
      warehouse.adjustStock(new Product("d", "A very nice product", 40.0), 10)
    ).toThrowError("Product not found");
  });

  it('should remove a product from the catalogue', () => {
    const warehouse = new Warehouse(catalogue);
    warehouse.removeProduct(productA);
    expect(warehouse.catalogue.get(productA)).toBeUndefined();
  })



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
