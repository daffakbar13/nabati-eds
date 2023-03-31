export default function currency(value: string | number) {
  switch (typeof value) {
    case 'string':
      return Number(value).toLocaleString()
    case 'number':
      return value.toLocaleString()
    default:
      return value
  }
}
