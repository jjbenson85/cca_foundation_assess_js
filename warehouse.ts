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
        this.catalogue = new Map(catalogue)
    }
    /**
     * Returns the stock level of a product
     * @param product 
     * @returns the quantity of the product in stock, or an error if the product is not found
     */
    checkStock(product:Product):number|Error {
        const quantity = this.catalogue.get(product)
        if(quantity === undefined) return Error("Product not found")
        return quantity
    }

    /**
     * Reduces the stock level of a product by the given quantity
     * @param product the product to adjust the stock level of
     * @param quantity the quantity to adjust the stock level by
     * @returns the new stock level
     * @throws Error if the product is not found
     * @throws Error if the quantity is negative
     * @throws Error if the stock level would go negative
     */
    adjustStock(product:Product, quantity:number):number {
        const currentQuantity = this.catalogue.get(product)
        const isProductAvailable = this.isProductAvailable(product, quantity) 

        if(!currentQuantity) throw Error("Product not found")
        if(quantity < 0) throw Error("Invalid quantity")
        if(isProductAvailable instanceof Error) throw isProductAvailable

        const newQuantity = currentQuantity - quantity
        this.catalogue.set(product, newQuantity)

        return newQuantity
    }

    /**
     * Adds stock of a product to the warehouse and returns the new stock level.
     * If the product is not already in the warehouse, it is added.
     * @param product 
     * @param quantity 
     * @returns 
     */
    receiveStock(product:Product, quantity:number):number {
        const currentQuantity = this.catalogue.get(product) || 0
        const newQuantity = currentQuantity + quantity
        this.catalogue.set(product, newQuantity)
        return newQuantity
    }

    /**
     *  Checks if the given quantity of a product is available
     * @param product 
     * @param quantity 
     * @returns true if the quantity is available, false if not, or an error if the product is not found
     */
    isProductAvailable(product:Product, quantity:number):boolean|Error {
        const availableQuatity =  this.checkStock(product)
        if( availableQuatity instanceof Error) return availableQuatity
        return availableQuatity >= quantity
    }

    /**
     * Removes a product from the catalogue
     * @param product
     * @returns true if the product was removed, or an error if the product is not found
    */
    removeProduct(product:Product):true|Error {
        if(this.catalogue.has(product)){
            this.catalogue.delete(product)
            return true
        }
        return Error('Product not found')
    }
    
}