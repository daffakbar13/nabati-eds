import { Col, Row } from 'antd'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { colors } from 'src/configs/colors'
import { useSalesSalesmanDivisionContext } from '../states'

export default function SectionAction() {
  const {
    state: {
      table: {
        state: {
          body: { filters },
          selected,
        },
        handler: { handleFilter },
      },
    },
    handler: { handleShowModal, showConfirm },
  } = useSalesSalesmanDivisionContext()
  const [filterById, setFilterById] = React.useState<string>()

  React.useEffect(() => {
    const getFilterId = filters.find(({ field }) => field === 'eds_order.id')
    if (getFilterId) {
      setFilterById(getFilterId.from_value.split('%').join(''))
    } else {
      setFilterById(undefined)
    }
  }, [filters])

  return (
    <Row justify="space-between">
      <Row gutter={10}>
        <Col>
          <Search
            width="380px"
            nameIcon="SearchOutlined"
            placeholder="Search Salesman ID"
            colorIcon={colors.grey.regular}
            {...(filterById && { value: filterById })}
            onChange={(e) => {
              const { value } = e.target
              if (value === '') {
                handleFilter([])
              } else {
                handleFilter([
                  {
                    field: 'eds_order.id',
                    option: 'CP',
                    from_value: `%${e.target.value}%`,
                  },
                ])
              }
            }}
          />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <Button
            size="big"
            variant="tertiary"
            onClick={() => showConfirm('delete')}
            style={{ gap: 5 }}
            disabled={selected.length === 0}
          >
            Delete
          </Button>
        </Col>
        <Col>
          <Button
            size="big"
            variant="primary"
            disabled={selected.length > 0}
            onClick={() => handleShowModal('create')}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
