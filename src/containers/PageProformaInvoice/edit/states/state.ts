interface Quantity {
  qty: number
  uom_id: string
}

interface OrderItem {
  product_id: string
  remarks: string
  qtys: Quantity[]
}

export interface DeliveryOrderItem {
  delivery_order_id: string
  items: OrderItem[]
}

export interface StateType {
  revisedDeliveryOrder: DeliveryOrderItem[]
  dataDeliveryOrder: any[]
}
