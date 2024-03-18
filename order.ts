class Item {
    product
    quantity
    constructor(product, quantity) {
        this.product = product
        this.quantity = quantity;
    }
}

export class Order {
    items
    shippingAddress
    constructor(shippingAddress) {
        this.items = []
        this.shippingAddress = shippingAddress;
    }
}

// Add Item - add an item to an order. An order item has a product and a quantity. There must be sufficient stock of that product to fulfil the order

// Total including shipping - calculate the total amount payable for the order, including shipping to the address

// Confirm order - when an order is confirmed, the stock levels of every product in the items are adjusted by the item quantity, and then the order is added to the sales history.