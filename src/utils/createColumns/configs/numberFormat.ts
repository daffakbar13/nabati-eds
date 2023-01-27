const numberFormat = ['Total Amount', 'Billing Amount', 'Paid Amount']

export function isNumberFormat(title: unknown) {
  return typeof title === 'string' && numberFormat.includes(title)
}
