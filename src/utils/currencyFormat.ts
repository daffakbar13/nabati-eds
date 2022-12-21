export default function localeStringFormat(value: string | number) {
  switch (typeof value) {
    case 'string':
      return parseInt(value, 10).toLocaleString()
    case 'number':
      return value.toLocaleString()
    default:
      return value
  }
}
