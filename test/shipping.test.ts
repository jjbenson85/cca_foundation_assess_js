import {describe, it, expect} from 'vitest'
import { calculateShippingFromRegion } from '../shipping'

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
})