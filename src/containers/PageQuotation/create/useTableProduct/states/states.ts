export interface DataProduct {
    product_id: string
    name: string
    uom_id: string
    price: number
    order_qty: number
    sub_total: number
    remarks?: string
}

export interface States {
    data: DataProduct[]
    allProduct: any[]
    isTyping?: boolean
    focus?: string
    isEdit?: boolean
}