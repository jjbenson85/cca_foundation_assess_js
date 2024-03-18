import { describe, expect, it } from "vitest";
import { Warehouse } from "../warehouse";

describe("Warehouse", () => {
    const catalogue = new Map();
    it("should have a catalogue", () => {
        const warehouse = new Warehouse(catalogue);
        expect(warehouse.catalogue).toEqual(catalogue);
    });
});