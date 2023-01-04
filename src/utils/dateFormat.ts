import moment from 'moment'

export default function dateFormat(date: string, withTime?: boolean) {
  const isValid = moment(date).isValid() === true
  const dateFormated = isValid ? moment(date).format(`DD MMM YYYY ${withTime ? 'hh:mm' : ''}`) : '-'
  return dateFormated
}
