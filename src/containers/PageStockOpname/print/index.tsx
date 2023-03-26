/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import ReactToPrint from 'react-to-print'
import { getPrint } from 'src/api/logistic/stock-opname'
import PaperA4 from 'src/components/PaperA4'
import { useDetail } from 'src/hooks'
import dateFormat from 'src/utils/dateFormat'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'

function CustomText(props: React.CSSProperties & { children: React.ReactNode }) {
  return <div style={{ ...props }}>{props.children}</div>
}

function Information(props: { label: string; value: string }) {
  const { label, value } = props
  return (
    <Row gutter={5} style={{ marginTop: 20, marginBottom: 20 }}>
      <Col span={12}>
        <Row justify="space-between">
          <Col>
            <strong>{label}</strong>
          </Col>
          <Col>:</Col>
        </Row>
      </Col>
      <Col span={12}>{value}</Col>
    </Row>
  )
}

export default function PrintStockOpname() {
  const router = useRouter()
  const data = useDetail(getPrint, router.query)
  const componentRef = React.useRef()

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Text variant={'h4'}>Print Preview</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          <Button
            size="big"
            variant="tertiary"
            onClick={() => {
              router.push({
                pathname: `${PATH.LOGISTIC}/stock-opname/edit/${router.query.id}`,
              })
            }}
          >
            Cancel
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button size="big" variant="primary">
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <Spacer size={20} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'grey',
          padding: '15px 0',
          maxHeight: 1122.5,
          overflow: 'scroll',
        }}
      >
        <div ref={componentRef}>
          <PaperA4>
            <Row justify="center">
              <CustomText fontWeight="bold" fontSize={24}>
                Stock Opname {data?.id}
              </CustomText>
            </Row>
            <Row>
              <Col span={10}>
                <Information label="Branch" value={`${data?.branch_id} - ${data?.branch_name}`} />
                <Information label="SLoc" value={`${data?.sloc_id} - ${data?.sloc_name}`} />
              </Col>
              <Col offset={4} span={10}>
                <Information label="Doc Date" value={dateFormat(data?.document_date)} />
                <Information label="Posting Date" value={dateFormat(data?.posting_date)} />
                <Information label="Header Text" value={data?.header_text} />
              </Col>
            </Row>
            <div>
              <table className="eds_paper">
                <thead>
                  <tr>
                    <th rowSpan={3}>No.</th>
                    <th rowSpan={3}>Item</th>
                    <th rowSpan={3}>Stock Quantity</th>
                    <th rowSpan={3}>UoM</th>
                    <th rowSpan={3}>Actual Quantity</th>
                    <th rowSpan={3}>UoM</th>
                    <th rowSpan={3}>Reference Quantity</th>
                    <th rowSpan={3}>UoM</th>
                    <th rowSpan={3}>Move Type</th>
                    {/* <th rowSpan={3}>Batch</th> */}
                    {/* <th rowSpan={3}>Remark</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.map((e, i) => (
                    <tr key={i}>
                      <td>{e.id}</td>
                      <td>
                        {e.product_id} - {e.product_name}
                      </td>
                      <td>{e.base_stock_qty}</td>
                      <td>{e.uom_id}</td>
                      <td>{e.base_qty}</td>
                      <td>{e.uom_id}</td>
                      <td>{e.base_qty - e.base_stock_qty}</td>
                      <td>{e.uom_id}</td>
                      <td>
                        {e.movement_type_id} - {e.movement_type_name}
                      </td>
                      {/* <td>{e.id}</td> */}
                      {/* <td>{e.id}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PaperA4>
        </div>
      </div>
    </>
  )
}
