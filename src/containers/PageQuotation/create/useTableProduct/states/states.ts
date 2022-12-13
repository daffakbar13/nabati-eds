interface DataProduct {
    product: string
    uom: string
    price: number
    quantity: number
    sub_total: number
    remarks: string
}

export interface States {
    data: DataProduct
    allProduct: any[]
}