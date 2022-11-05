import moment from "moment";

export default function dateFormat(date: string, format: string) {
    return (moment(date)).format(format)
}