import moment from 'moment'

export default function dateFormat(date: string, withTime?: boolean) {
  const isValid = moment(date).isValid() === true
  const dateFormated = isValid ? moment(date).format(`DD MMM YYYY ${withTime ? 'HH:mm' : ''}`) : '-'
  return dateFormated
}
