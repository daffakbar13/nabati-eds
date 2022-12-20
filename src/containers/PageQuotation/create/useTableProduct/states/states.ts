export interface DataProduct {
    product_id: string
    name: string
    uom_id: string
    price: number
    order_qty: number
    discount?: number
    discOption?: string
    sub_total: number
    remarks?: string
}

export interface States {
    data: DataProduct[]
    allProduct: any[]
    size: { product: number, discount: number, quantity: number }
}