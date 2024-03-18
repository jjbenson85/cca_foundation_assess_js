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

    checkStock(product:Product):number|Error {
        const quantity = this.catalogue.get(product)
        if(!quantity) return Error("Product not found")
        return quantity
    }

    adjustStock(product:Product, quantity:number):Error|number {
        const currentQuantity = this.catalogue.get(product)

        if(!currentQuantity) return Error("Product not found")

        const newQuantity = currentQuantity + quantity
        this.catalogue.set(product, newQuantity)

        return newQuantity
    }

    isProductAvailable(product:Product, quantity:number):boolean|Error {
        const availableQuatity =  this.checkStock(product)
        if( availableQuatity instanceof Error) return availableQuatity
        return availableQuatity >= quantity
    }
}