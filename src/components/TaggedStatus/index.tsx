import { Tag } from 'antd'

export interface TaggedStatus {
    status: string
}

export default function TaggedStatus(props: TaggedStatus) {
    let color = 'yellow'

    if (props.status == 'Done') {
        color = 'green';
    } else if (props.status == 'Canceled') {
        color = 'red';
    } else if (props.status == 'Aprroved') {
        color = 'blue';
    }

    return (
        <Tag {...({ color: color })} > {props.status}</Tag>
    )
}