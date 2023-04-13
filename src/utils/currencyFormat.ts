export default function currency(value: string | number) {
  return Number(Number(value).toFixed(0)).toLocaleString()
  // switch (typeof value) {
  //   case 'string':
  //     return Number(value).toFixed(0).toLocaleString()
  //   case 'number':
  //     return value.toLocaleString()
  //   default:
  //     return value
  // }
}
