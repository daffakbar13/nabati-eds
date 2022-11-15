import { Tag } from 'antd'
import { Text } from 'pink-lava-ui'
export interface TaggedStatus {
    status: string
    size?: string
}

export default function TaggedStatus(props: TaggedStatus) {
    let color = 'yellow'

    if (props.status == 'Done') {
        color = 'green';
    } else if (props.status == 'Canceled' || props.status == 'Rejected') {
        color = 'red';
    } else if (props.status == 'Approved') {
        color = 'blue';
    }

    if (props.size) {
        return (
            <Tag {...({ color: color })} ><Text variant={props.size} {...({ color: color })}>{props.status}</Text> </Tag>
        )
    } else {
        return (
            <Tag {...({ color: color })} >{props.status}</Tag>
        )
    }

}