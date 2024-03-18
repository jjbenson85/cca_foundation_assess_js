import {describe, it, expect} from 'vitest'
import { calculateShippingFromRegion, getRegionFromData } from '../shipping'

describe("Shipping", () => {
    it.each([
        [
            "UK",
            99,
            4.99
        ],
        [
            "UK",
            100,
            4.99
        ],
        [
            "UK",
            120,
            0
        ],
        [
            "EU",
            99,
            8.99
        ],
        [
            "EU",
            100,
            4.99
        ],
        [
            "OTHER",
            100,
            9.99
        ],
        [
            "OTHER",
            199,
            9.99
        ],
        [
            "OTHER",
            200,
            5.99
        ]
    ] as const)("should calculate the shipping cost from %s %f", async (region, orderTotal, expected) => {
        const shipping = await calculateShippingFromRegion(region, orderTotal)
        expect(shipping).toEqual(expected)
    })

    it("should throw an error if the region is invalid", async () => {
        try {
            await calculateShippingFromRegion("INVALID" as "UK" | "EU" | "OTHER", 100)
        } catch (error) {
            expect(error).toEqual(new Error("Invalid region"))
        }
    })

    it("should get the region from the data",()=>{
        const data = JSON.stringify({region: "UK"})
        const region = getRegionFromData(data)
        expect(region).toEqual("UK")
    })

    it("should throw an error if the region is invalid",()=>{
        const data = JSON.stringify({region: "INVALID"})
        expect(()=> getRegionFromData(data)).toThrowError()
    })

    it("should throw an error if the data is invalid",()=>{
        const data = "INVALID"
        expect(()=> getRegionFromData(data)).toThrowError()
    })
})