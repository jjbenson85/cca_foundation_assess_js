import https from "https";

/**
 * Returns the region based on the country
 * @param country
 * @returns The region as a string
 * @error if the request fails
 */
export function getRegion(country: string): Promise<"UK" | "EU" | "OTHER"> {
  const url = `https://npovmrfcyzu2gu42pmqa7zce6a0zikbf.lambda-url.eu-west-2.on.aws/?country=${country}`;
  return new Promise<"UK" | "EU" | "OTHER">((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          const region = getRegionFromData(data);
          resolve(region);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

/**
 * Get the region from the data
 * @param data
 * @returns  "UK" | "EU" | "OTHER"
 * @error if the region is invalid or the data is invalid
 */
export function getRegionFromData(data: string) {
  try {
    const region = JSON.parse(data).region;
    if (["UK", "EU", "OTHER"].includes(region)) {
      return region as "UK" | "EU" | "OTHER";
    } else {
      throw new Error("Invalid region");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Returns the shipping cost based on the region and order total
 * @param region
 * @param orderTotal
 * @returns The shipping cost as a number
 */
export const calculateShippingFromRegion = (
  region: "UK" | "EU" | "OTHER",
  orderTotal: number
): number => {
  switch (region) {
    case "UK":
      if (orderTotal < 120.0) {
        return 4.99;
      }
      return 0.0;

    case "EU":
      if (orderTotal < 100) {
        return 8.99;
      }
      return 4.99;

    case "OTHER":
      if (orderTotal < 200) {
        return 9.99;
      }
      return 5.99;
  }
  region satisfies never;
};

/**
 * Calculates the shipping cost based on the country and order total
 * @param country
 * @param orderTotal
 * @returns the shipping cost as a number
 * @error if the request fails
 */
export const calculateShipping = async (
  country: string,
  orderTotal: number
) => {
  try {
    const region = await getRegion(country);
    return calculateShippingFromRegion(region, orderTotal);
  } catch (e) {
    throw e;
  }
};
