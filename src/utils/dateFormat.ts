import moment from 'moment';

export default function dateFormat(date: string, format: string) {
    const isValid = moment(date).isValid() === true
    const dateFormated = isValid ? moment(date).format(format) : ''
    return dateFormated
}