const numberFormat = ['Total Amount']

export function isNumberFormat(title: unknown) {
  return typeof title === 'string' && numberFormat.includes(title)
}
