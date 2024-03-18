import { Country } from "./countries";

export class Address {
  house: string;
  street: string;
  city: string;
  postcode: string;
  country: Country;
  constructor(address: {
    house: string;
    street: string;
    city: string;
    postcode: string;
    country: Country;
  }) {
    this.house = address.house;
    this.street = address.street;
    this.city = address.city;
    this.postcode = address.postcode;
    this.country = address.country;
  }
}
