class Product {
    id;
    description;
    price;
    constructor(id, description, price) {
        this.id = id;
        this.description = description;
        this.price = price;
    }
}

export class Warehouse {
    catalogue:Map<string,Product> // a dictionary of products with associated stock level
    constructor(catalogue:Map<string,Product>) {
        this.catalogue = catalogue
    }
}