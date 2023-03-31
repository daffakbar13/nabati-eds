export default function columnFormat(columns: any[]) {
  const getWidth = (id: string, sorter: boolean) =>
    document.getElementById(id).clientWidth + 32 + (sorter ? 20 : 0)

  const result = columns.map((obj) => ({
    ...obj,
    ...(obj.title.props.id && { width: getWidth(obj.title.props.id, obj.sorter) }),
  }))

  return result
}
