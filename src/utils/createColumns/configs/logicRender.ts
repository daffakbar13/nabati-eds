import moment from 'moment'
import dateFormat from 'src/utils/dateFormat'
import { isNumberFormat } from './numberFormat'

export function logicRender(title: unknown, text: string) {
  if (isNumberFormat(title)) {
    return parseInt(text, 10).toLocaleString()
  }
  if (typeof title === 'string' && title.toLocaleLowerCase().includes('date')) {
    return dateFormat(text)
  }
  return text
}
