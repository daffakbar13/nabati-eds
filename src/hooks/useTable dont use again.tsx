// /* eslint-disable function-paren-newline */
// /* eslint-disable object-curly-newline */
// /* eslint-disable implicit-arrow-linebreak */
// /* eslint-disable no-unused-expressions */
// import { MoreOutlined } from '@ant-design/icons'
// import { Checkbox, Divider, Popover } from 'antd'
// import React from 'react'
// import { CommonListParams } from 'src/api/types'

// interface haveCheckBox {
//   headCell: string
//   member: string[]
// }

// interface useTableProps {
//   funcApi?: (body: any) => Promise<any>
//   haveCheckbox?: haveCheckBox | 'All'
//   columns: any[]
// }

// export default function useTable(props: useTableProps) {
//   const { haveCheckbox, funcApi } = props
//   const [data, setData] = React.useState([])
//   const [body, setBody] = React.useState({
//     filters: [],
//     limit: 20,
//     page: 1,
//   })
//   const [total, setTotal] = React.useState(0)
//   const [totalPage, setTotalPage] = React.useState(0)
//   const [rowSelection, setRowSelection] = React.useState({})
//   const [loading, setLoading] = React.useState(true)
//   const [selected, setSelected] = React.useState([])
//   const [hiddenColumns, setHiddenColumns] = React.useState([])

//   const oneSelected = selected.length === 1
//   const firstSelected = selected[0]
//   const description = {
//     text: oneSelected ? firstSelected : `${firstSelected}, +${selected.length - 1} more`,
//     content: <div style={{ textAlign: 'center' }}>{selected.join(', ')}</div>,
//   }

//   const isHaveCheckbox = (key: string) =>
//     haveCheckbox !== 'All' && !haveCheckbox.member.includes(key)

//   const updateData = (newData: any[]) => {
//     setData(() => newData)
//     setLoading(false)
//   }

//   const handleHideShowColumns = (event, newData: any) => {
//     event.checked
//       ? setHiddenColumns(hiddenColumns.filter((e) => e !== newData))
//       : setHiddenColumns([...hiddenColumns, newData])
//   }

//   const handleResetHideShowColumns = () => {
//     setHiddenColumns([])
//   }

//   const handlePagination = (page: number, limit: number) => {
//     setBody((current) => ({ ...current, page, limit }))
//   }

//   const handleFilter = (newBody: any[]) => {
//     setBody((current) => ({ ...current, filters: newBody, page: 1 }))
//   }

//   const handleSelected = (newData: object[]) => {
//     setSelected(newData)
//   }

//   const defineRowSelection = {
//     selectedRowKeys: selected,
//     onChange: (selectedRowKeys) => {
//       setSelected(selectedRowKeys)
//     },
//     ...(haveCheckbox !== 'All' && {
//       getCheckboxProps: (record) => ({
//         style: { ...(isHaveCheckbox(record[haveCheckbox.headCell]) && { display: 'none' }) },
//         disabled: isHaveCheckbox(record[haveCheckbox.headCell]),
//         // Column configuration not to be checked
//         name: record[haveCheckbox.headCell],
//       }),
//     }),
//     fixed: 'left',
//     preserveSelectedRowKeys: true,
//   }

//   const HideShowColumns = () => {
//     const content = (
//       <div style={{ fontWeight: 'bold' }}>
//         <h4 style={{ fontWeight: 'bold' }}>Hide/Show Columns</h4>
//         <Divider style={{ margin: '10px 0' }} />
//         {props.columns.map(({ title }, index) => (
//           <div key={index} style={{ display: 'flex', gap: 10 }}>
//             <Checkbox
//               defaultChecked={!hiddenColumns.includes(title)}
//               onChange={(event) => {
//                 handleHideShowColumns(event.target, title)
//               }}
//             />
//             {title}
//           </div>
//         ))}
//         <Divider style={{ margin: '10px 0' }} />
//         <h4
//           onClick={handleResetHideShowColumns}
//           style={{ fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
//         >
//           Reset
//         </h4>
//       </div>
//     )
//     return (
//       <Popover placement="bottomRight" content={content} trigger="click">
//         <MoreOutlined style={{ cursor: 'pointer' }} />
//       </Popover>
//     )
//   }
//   const [columns, setColumns] = React.useState([
//     ...props.columns,
//     { title: <HideShowColumns />, fixed: 'right', width: 50 },
//   ])

//   const tableProps = {
//     scroll: { x: 'max-content', y: 600 },
//     loading,
//     columns,
//     dataSource: data,
//     showSorterTooltip: false,
//     rowSelection,
//   }

//   const paginationProps = {
//     defaultPageSize: 20,
//     pageSizeOptions: [20, 50, 100],
//     total,
//     totalPage,
//     onChange: (page, limit) => {
//       handlePagination(page, limit)
//     },
//   }

//   React.useEffect(() => {
//     if (haveCheckbox) {
//       setRowSelection(defineRowSelection)
//     }
//     function getApi() {
//       setLoading(true)
//       funcApi(body)
//         .then((response) => {
//           response.data.result
//             ? updateData(response.data.result)
//             : updateData(response.data.results)
//           setTotal(response.data.total_rows)
//           setTotalPage(response.data.total_page)
//         })
//         .catch((_) => updateData([]))
//     }

//     getApi()
//   }, [body])

//   React.useEffect(() => {
//     if (!loading) {
//       setColumns((arr) =>
//         arr.map((obj) => ({
//           ...obj,
//           ...(obj.title.props.id && {
//             width:
//               document.getElementById(obj.title.props.id).clientWidth + 32 + (obj.sorter ? 20 : 0),
//           }),
//         })),
//       )
//     }
//   }, [loading])

//   React.useEffect(() => {
//     setColumns(props.columns.filter((e) => !hiddenColumns.includes(e.title)))
//     setColumns((old) => [...old, { title: <HideShowColumns />, fixed: 'right', width: 50 }])
//   }, [hiddenColumns, props.columns])

//   React.useEffect(() => {
//     setRowSelection(defineRowSelection)
//   }, [selected])

//   return {
//     /**
//      * data of table
//      */
//     data,
//     /**
//      * total of rows
//      */
//     total,
//     /**
//      * total of page
//      */
//     totalPage,
//     /**
//      * selected data from checkbox
//      */
//     selected,
//     /**
//      * pass to parameter rowSelection on table component
//      */
//     rowSelection,
//     /**
//      * pass to parameter loading on table component
//      */
//     loading,
//     /**
//      * func to change data
//      */
//     updateData,
//     /**
//      * array of columns are hidden
//      */
//     hiddenColumns,
//     /**
//      * func for handle hide/show column
//      */
//     handleHideShowColumns,
//     /**
//      * columns of table
//      */
//     columns,
//     /**
//      * func for handle reset hide/show column
//      */
//     handleResetHideShowColumns,
//     /**
//      * func for handle pagination
//      */
//     handlePagination,
//     /**
//      * func for handle filter
//      */
//     handleFilter,
//     /**
//      * func for change selected of rows
//      */
//     handleSelected,
//     /**
//      * description of selected table
//      */
//     description,
//     /**
//      * props for assign to table props
//      */
//     tableProps,
//     /**
//      * props for assign to pagination props
//      */
//     paginationProps,
//   }
// }
