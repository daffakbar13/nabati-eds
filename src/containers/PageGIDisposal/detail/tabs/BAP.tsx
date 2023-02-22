/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface DeliveryNoteProps {
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

export default function BAP(props: DeliveryNoteProps) {
  const { data } = props

  return (
    <PaperA4>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          Berita Acara Pemusnahan Bad Stock - PMA
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="Periode" value={data.id} />
          <Information label="CABANG / DEPO" value={data.id} />
        </Col>
      </Row>
      <p>Pada Hari Ini _____________ Tanggal ________ telah dilakukan pemusnahan barang BS :</p>
      <table className="eds_paper">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Barang</th>
            <th>Unit</th>
            <th>Jumlah</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {data.item.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{`${item.qty} (${item.uom_id})`}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </PaperA4>
  )
}
