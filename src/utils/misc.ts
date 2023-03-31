import moment from 'moment'

export interface FilterValueForReqBody {
  field: string
  option?: string
  from_value?: string | []
  to_value?: string | []
  data_type?: string
  value?: any
  arrayValues?: string[]
}

export const generateFilterBody = (filters: FilterValueForReqBody[]) =>
  filters.map((f: any) => ({
    field: f.field,
    option: f.option,
    data_type: f.dataType,
    from_value_label: (() => {
      if (moment.isMoment(f.fromValue)) return moment(f.fromValue).format('YYYY-MM-DD')
      if (!f.fromValue) return null
      if (typeof f.fromValue === 'string') return f.fromValue
      if (Array.isArray(f.fromValue)) return f.fromValue.map((i) => i.value)
      return f.fromValue.label
    })(),
    from_value: (() => {
      if (moment.isMoment(f.fromValue)) return moment(f.fromValue).format('YYYY-MM-DD')
      if (!f.fromValue) return null
      if (typeof f.fromValue === 'string') return f.fromValue
      if (Array.isArray(f.fromValue)) return f.fromValue.map((i) => i.value)
      return f.fromValue.value
    })(),
    to_value_label: (() => {
      if (moment.isMoment(f.toValue)) return moment(f.toValue).format('YYYY-MM-DD')
      if (!f.toValue) return null
      if (typeof f.toValue === 'string') return f.toValue
      if (Array.isArray(f.toValue)) return f.toValue.map((i) => i.value)
      return f.toValue.label
    })(),
    to_value: (() => {
      if (moment.isMoment(f.toValue)) return moment(f.toValue).format('YYYY-MM-DD')
      if (!f.toValue) return null
      if (typeof f.toValue === 'string') return f.toValue
      if (Array.isArray(f.toValue)) return f.toValue.map((i) => i.value)
      return f.toValue.value
    })(),
  }))
