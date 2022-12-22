/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface props {
  data: any
}

function CustomText(props: React.CSSProperties & { children: React.ReactNode }) {
  return <div style={{ ...props }}>{props.children}</div>
}

function Information(props: { label: string; value: string }) {
  const { label, value } = props
  return (
    <Row gutter={5}>
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

export default function DeliveryNote(props: props) {
  const { data } = props
  const format = 'DD MMMM YYYY'

  return (
    <PaperA4>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          Delivery Note
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="Delivery Order" value={data.id} />
          <Information label="PO Number" value={data.purchase_id} />
          <Information label="Date" value={dateFormat(data.document_date, format)} />
          <Information
            label="To Branch"
            value={`${data.receive_branch_id} / ${data.receive_branch_name}`}
          />
        </Col>
        <Col span={8}>
          <Information label="Route" value="NOT IMPLEMENT YET" />
          <Information label="Delivery" value="NOT IMPLEMENT YET" />
          <Information label="Tot Weight" value="NOT IMPLEMENT YET" />
          <Information label="Tot Volume" value="NOT IMPLEMENT YET" />
        </Col>
        <Col span={8}>
          <Information
            label="From Plant"
            value={`${data.supply_branch_id} / ${data.supply_branch_name}`}
          />
        </Col>
      </Row>

      <table className="eds_paper">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Barang</th>
            <th>Deskripsi Barang (nama, spec)</th>
            <th>Jumlah</th>
            <th>Satuan</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.uom_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PaperA4>
  )
}
