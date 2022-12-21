import { tagColors } from 'src/configs/tagColor'

export const getTagColor = (status: string) => {
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

  return color
}
