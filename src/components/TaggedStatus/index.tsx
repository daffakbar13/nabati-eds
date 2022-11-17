import { Tag } from 'antd'
import { Text } from 'pink-lava-ui'
export interface TaggedStatus {
    status: string
    size?: string
}

export default function TaggedStatus(props: TaggedStatus) {
    let color = 'yellow'

    if (props.status === 'Done') {
        color = 'green';
    } else if (props.status === 'Canceled' || props.status === 'Rejected') {
        color = 'red';
    } else if (props.status === 'Approved') {
        color = 'blue';
    }
    return (
        <Tag {...({ color: color })} >
            {props.size ? (
                <Text variant={props.size} {...({ color: color })}>{props.status}</Text>
            ) : (
                <>{props.status}</>
            )}
        </Tag>
    )
}