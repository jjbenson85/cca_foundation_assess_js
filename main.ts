import { calculateShipping } from "./shipping";
import { Country } from "./countries";

async function printShippingCosts(country: Country, orderTotal: number) {
  const shipping = await calculateShipping(country, orderTotal);
  console.log(
    `Shipping cost to ${country} for order total £${orderTotal} is £${shipping}`
  );
}

printShippingCosts(Country.UNITED_KINGDOM, 99.99);
printShippingCosts(Country.UNITED_KINGDOM, 100.0);
printShippingCosts(Country.FRANCE, 99.99);
printShippingCosts(Country.FRANCE, 100.0);
printShippingCosts(Country.ALBANIA, 99.99);
printShippingCosts(Country.ALBANIA, 100.0);
