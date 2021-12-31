export default class Order {
    property: string
    order: string

    constructor(property: string, order: string) {
        this.property = property

        if (Order.expectedOrders().includes(order) === false) {
            throw Error('Unexpected order for OrderBy in a query')
        }

        this.order = order
    }

    static expectedOrders(): Array<string> {
        return [
            'asc',
            'desc'
        ]
    }


}
