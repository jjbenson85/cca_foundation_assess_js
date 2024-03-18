const https = require("https");

export function getRegion(country: string): Promise<"UK" | "EU" | "OTHER"> {
  const url = `https://npovmrfcyzu2gu42pmqa7zce6a0zikbf.lambda-url.eu-west-2.on.aws/?country=${country}`;
  return new Promise<"UK" | "EU" | "OTHER">((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Process the data.
        resp.on("end", () => {
          try {
            const region = JSON.parse(data).region;
            if (["UK", "EU", "OTHER"].includes(region)) {
              resolve(region as "UK" | "EU" | "OTHER");
            } else {
              reject(new Error("Invalid region"));
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (err) => {
        // Use the callback to return HTTP request errors
        reject(err);
      });
  });
}

export const calculateShippingFromRegion = (
  region: "UK" | "EU" | "OTHER",
  orderTotal: number
):number => {
  switch(region) {
    case "UK":
      if (orderTotal < 100.0) {
        return 4.99;
      }else{
        return 0.0;
      }
    case "EU":
      if (orderTotal < 100) {
        return 8.99;
      } else {
        return 4.99;
      }
    case "OTHER":
      return 9.99;
  }
  region satisfies never;
};

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
