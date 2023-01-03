import { Tag } from 'antd'
import { Text } from 'pink-lava-ui'
import tagColors from './tagColors'

export interface TaggedStatusProps {
  status: string
  size?: string
}

export default function TaggedStatus(props: TaggedStatusProps) {
  const { status, size } = props
  let color: string

  switch (true) {
    case tagColors.green.includes(status):
      color = 'green'
      break
    // case tagColors.geekblue.includes(status):
    //   color = 'geekblue'
    //   break
    case tagColors.red.includes(status):
      color = 'red'
      break
    case tagColors.blue.includes(status):
      color = 'blue'
      break
    case tagColors.orange.includes(status):
      color = 'orange'
      break
    case tagColors.yellow.includes(status):
      color = 'yellow'
      break
    default:
      color = 'no-color'
      break
  }

  return (
    <Tag {...(color !== 'no-color' && { color })} {...(status === '' && { display: 'none' })}>
      {size ? (
        <Text variant={props.size} {...{ color }}>
          {status}
        </Text>
      ) : (
        <>{status}</>
      )}
    </Tag>
  )
}
