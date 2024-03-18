import { Order } from "../order";
import { describe, expect, it } from "vitest";

describe("Order", () => {
  it("should have an empty list of items and a shipping address", () => {
    const order = new Order('123 Fake St');
    expect(order.items).toEqual([]);
  });
  
  it("should have a shipping address", () => {
    const order = new Order("123 Fake St");
    expect(order.shippingAddress).toEqual("123 Fake St");
  });
});
