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
    catalogue // a dictionary of products with associated stock level
    constructor() {
        this.catalogue = {}
    }
}