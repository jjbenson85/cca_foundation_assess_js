export class Product {
    id:string;
    description:string;
    price:number;
    constructor(id:string, description:string, price:number) {
        this.id = id;
        this.description = description;
        this.price = price;
    }
}

export class Warehouse {
    catalogue:Map<Product, number> // a dictionary of products with associated stock level
    constructor(catalogue:Map<Product, number>) {
        this.catalogue = catalogue
    }

    getQuantity(product:Product):number|Error {
        const quantity = this.catalogue.get(product)
        if(!quantity) return Error("Product not found")
        return quantity
    }

    isProductAvailable(product:Product, quantity:number):boolean|Error {
        const availableQuatity =  this.getQuantity(product)
        if( availableQuatity instanceof Error) return availableQuatity
        return availableQuatity >= quantity
    }
}