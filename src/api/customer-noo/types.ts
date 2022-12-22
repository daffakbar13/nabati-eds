export interface CustomerItem {
  readonly id: string
  readonly company_id: string
  readonly name: string
  readonly short_name: string
  readonly address: string
  readonly city: string
  readonly postal_code: string
  readonly country_id: string
  readonly region_id: string
  readonly phone: string
  readonly fax: string
  readonly email: string
  readonly deletion_flag: string
  readonly customer_class_id: string
  readonly sold_to_customer_id: string
  readonly ship_to_customer_id: string
  readonly bill_to_customer_id: string
  readonly pay_to_customer_id: string
  readonly transportation_zone_id: string
  readonly is_active: string
  readonly ktp: string
  readonly GadgetNotes: string
  readonly OtherNotes: string
}