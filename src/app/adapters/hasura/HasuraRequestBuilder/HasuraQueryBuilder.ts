import HasuraRequestBuilder from "./HasuraRequestBuilder";
import Where from "./Where";
import Order from "./Order";
import PkColumns from "./PkColumns";

export default class HasuraQueryBuilder extends HasuraRequestBuilder {
    wheres: Array<Where> = []
    orders: Array<Order> = []
    byPk: PkColumns | null = null

    constructor(name: string) {
        super('query', name);
    }

    public getRequest(): string {
        let request: string = this.type

        request += this.computeParams()

        request += "{"

        request += this.name

        if (this.wheres.length > 0 || this.orders.length > 0) {
            request += '('

            request += this.computeWhere()

            if (this.wheres.length > 0 && this.orders.length > 0) {
                request += ','
            }

            request += this.computeOrder()

            request += ')'
        }

        if (this.byPk !== null) {
            request += this.computeByPk()
        }

        request += this.computeReturn()

        request += '}'
        return request
    }

    public addWhere(property: string, compareMode: string, value: string | number) {
        if (this.wheres.find((where: Where) => where.property === property) === undefined) {

            let whereConstraint = new Where(property, compareMode, value)

            this.wheres.push(whereConstraint)
        }
    }

    public addOrderBy(property: string, order: string = 'asc') {
        if (this.orders.find((order: Order) => order.property === property) === undefined) {
            this.orders.push(new Order(property, order))
        }
    }

    public addByPk(property: string, value: string) {
        this.byPk = new PkColumns(property, value)
    }

    private computeWhere(): string {
        if (this.wheres.length === 0) {
            return ''
        }

        let computedWhere: string = 'where: {'

        for (let where in this.wheres) {
            computedWhere += this.wheres[where].property + ': {' + this.wheres[where].compareMode + ': ' + this.wheres[where].value + '}'
            if (~~where < (this.wheres.length - 1)) {
                computedWhere += ', '
            }
        }

        computedWhere += '}'
        return computedWhere
    }

    private computeOrder(): string {
        if (this.orders.length === 0) {
            return ''
        }

        let computedOrders: string = 'order_by: {'
        for (let order in this.orders) {
            computedOrders += this.orders[order].property + ': ' + this.orders[order].order

            if (~~order < (this.orders.length - 1)) {
                computedOrders += ', '
            }
        }

        computedOrders += '}'

        return computedOrders
    }

    private computeByPk(): string {
        return '(' + this.byPk?.name + ': ' + this.byPk?.value + ')'
    }

}
