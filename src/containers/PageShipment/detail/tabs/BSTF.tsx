/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import ReactToPrint from 'react-to-print'
import { DataList } from 'src/components'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface BSTFProps {
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

function TTD(props: { label: string; title: string }) {
  const { label, title } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'center',
      }}
    >
      <CustomText fontWeight="bold">{label}</CustomText>
      <div style={{ height: 100, borderBottom: '2px solid black' }}></div>
      <CustomText fontWeight="bold">{title}</CustomText>
    </div>
  )
}

function LabelPGI(props: { text: string }) {
  const { text } = props
  return (
    <div
      style={{
        width: 100,
        border: '2px solid black',
      }}
    >
      <CustomText fontWeight="bold" textAlign="center" fontSize={16}>
        {text}
      </CustomText>
    </div>
  )
}

function HeadTable(props: { label: string; value: string }) {
  const { label, value } = props
  return (
    <>
      <div
        style={{
          border: '1px solid black',
          padding: '1px 5px',
          flexGrow: 1,
          width: '100%',
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
      <div
        style={{
          border: '1px solid black',
          padding: '1px 5px',
          flexGrow: 1,
          width: '100%',
        }}
      >
        {value}
      </div>
    </>
  )
}

export default function BSTF(props: BSTFProps) {
  const { data } = props

  return (
    <PaperA4>
      <Row>
        <Col span={8}>
          <CustomText fontWeight="bold" fontSize={18}>
            {data.company_name}
          </CustomText>
          <CustomText fontWeight="bold" fontSize={18}>
            {data.plant_name}
          </CustomText>
        </Col>
        <Col offset={6} span={10}>
          <Information
            label="Tanggal Cetak"
            value={dateFormat(new Date().toISOString(), 'DD.MM.YYYY-hh:mm:ss')}
          />
          <Information label="Halaman" value="1" />
          <Information label="Cetakan Ke" value="1/1" />
        </Col>
      </Row>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          BUKTI SERAH TERIMA (BSTF)
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information
            label="Tanggal Kirim"
            value={dateFormat(data.delivery_date, 'DD.MM.YYYY-hh:mm:ss')}
          />
        </Col>
        <Col offset={6} span={10}>
          <Information label="No. BSTF" value="?" />
        </Col>
      </Row>
      <div>
        <table className="eds_paper" style={{ tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td>No. Kendaraan</td>
              <td>{data.vehicle_id}</td>
              <td>Driver</td>
              <td>{data.driver_name}</td>
              <td>Jam Berangkat</td>
              <td>?</td>
              <td>KM Berangkat</td>
              <td>?</td>
              <td>Jml. Kublikasi</td>
              <td>{data.total_cubication}</td>
            </tr>
            <tr>
              <td>Pengiriman</td>
              <td>?</td>
              <td>Helper</td>
              <td>?</td>
              <td>Jam Kembali</td>
              <td>?</td>
              <td>KM Kembali</td>
              <td>?</td>
              <td colSpan={2}>?</td>
            </tr>
            <tr>
              <td colSpan={10}>Jumlah Toko: {data.total_store}</td>
            </tr>
          </tbody>
        </table>
        <table className="eds_paper">
          <thead>
            <tr>
              <th rowSpan={3}>No.</th>
              <th rowSpan={3}>Kode</th>
              <th rowSpan={3}>Nama Pelanggan</th>
              <th rowSpan={3}>Alamat</th>
              <th rowSpan={3}>No. Transaksi</th>
              <th rowSpan={3}>Type</th>
              <th colSpan={3}>Kunjungan</th>
              <th colSpan={3}>Qty</th>
              <th colSpan={2}>Value</th>
              <th rowSpan={2}>Kublikasi</th>
            </tr>
            <tr>
              <th>Jam Tiba</th>
              <th>Jam Keluar</th>
              <th>Jam Efektif</th>
              <th>Dibawa</th>
              <th>Kirim</th>
              <th>Kembali</th>
              <th>Dibawa</th>
              <th>Kirim</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((e, i) => (
              <tr key={i}>
                <td>{e.item_number}</td>
                <td>{e.customer_id}</td>
                <td>{e.customer_name}</td>
                <td>{e.customer_address}</td>
                <td>{e.billing_to}</td>
                <td>{e.doc_type}</td>
                <td>{e.item_number}</td>
                <td>{e.item_number}</td>
                <td>{e.item_number}</td>
                <td>{e.total_qty_item}</td>
                <td>{e.total_qty_item}</td>
                <td>{e.total_qty_item}</td>
                <td>{e.item_number}</td>
                <td>{e.item_number}</td>
                <td>{e.cubication}</td>
              </tr>
            ))}
            <tr>
              <td>?</td>
              <td>?</td>
              <td>?</td>
              <td>?</td>
              <td>?</td>
              <th colSpan={4}>Total</th>
              <td>?</td>
              <td colSpan={2} className="right-align">
                ?
              </td>
              <td>?</td>
              <td>?</td>
              <td>?</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Row style={{ gap: 30, marginTop: 20 }}>
        <TTD label="Dibuat Oleh," title="SA" />
        <TTD label="Diperiksa Oleh," title="FA SPV/SBH" />
        <TTD label="Diketahui Oleh," title="Branch Manager" />
        <TTD label="Diterima Oleh," title="Driver Dropping" />
        <TTD label="Diterima Kembali Oleh," title="SA" />
      </Row>
    </PaperA4>
  )
}
