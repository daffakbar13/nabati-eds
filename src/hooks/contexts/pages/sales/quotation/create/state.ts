import { useTableProduct } from 'src/containers/PageQuotation/create/useTableProduct'

interface OptionsType {
    key?: string
    label?: string
    value?: string
}

interface PayloadCreate {
    company_id?: string
    branch_id?: string
    source_id?: string
    order_date?: string
    delivery_date?: string
    pricing_date?: string
    order_type_id?: string
    customer_id?: string
    ship_to_id?: string
    salesman_id?: string
    sales_org_id?: string
    valid_from?: string
    valid_to?: string
    customer_ref?: string
    currency_id?: string
    items?: any[]
}

export interface StateType {
    dataForm?: PayloadCreate
    tableProduct?: ReturnType<typeof useTableProduct>
    quotationId?: string
    confirm?: 'newQuo' | 'draftQuo' | 'cancel'
    optionsOrderType: OptionsType[]
    optionsSalesman: OptionsType[]
    optionsSalesOrg: OptionsType[]
    optionsBranch: OptionsType[]
    fetching?: 'customer' | 'load-options'
    processing?: string
    canSave?: boolean
    canSaveAsDraft: boolean
}