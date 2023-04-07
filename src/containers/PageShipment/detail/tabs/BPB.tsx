/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface BPBProps {
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
      }}
    >
      <CustomText fontWeight="bold" textAlign="center">
        {label}
      </CustomText>
      <div style={{ height: 100 }}></div>
      <CustomText fontWeight="bold" textAlign="center">
        {title}
      </CustomText>
    </div>
  )
}

function LabelPGI(props: { text: string }) {
  const { text } = props
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'end',
      }}
    >
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
    </div>
  )
}

export default function BPB(props: BPBProps) {
  const { data } = props

  function findQty(item_qty: any[], level: string) {
    return item_qty.find((e) => e.uom_level === level).qty
  }
  function countQty(arr: number[]) {
    return arr.reduce((prev, curr) => prev + curr)
  }
  const total = {
    large: countQty(data.items.map(({ item_qty }) => findQty(item_qty, 'large'))),
    middle: countQty(data.items.map(({ item_qty }) => findQty(item_qty, 'middle'))),
    small: countQty(data.items.map(({ item_qty }) => findQty(item_qty, 'small'))),
  }

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
          <Information label="Tanggal Cetak" value={dateFormat(new Date().toISOString())} />
          <Information label="Halaman" value="1" />
          <Information label="Cetakan Ke" value="1/1" />
        </Col>
      </Row>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          BON PENGELUARAN BARANG (BPB)
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="Tanggal Kirim" value={dateFormat(data.delivery_date)} />
          <Information label="Kendaraan" value={data.vehicle_id} />
          <Information label="Driver / Helper" value={data.driver_name} />
        </Col>
        <Col offset={6} span={10}>
          <Information label="No. BPB" value={data.shipment_id} />
          <Information label="Pengiriman" value={data.driver_id} />
          <Information label="Jumlah Toko" value={data.total_store} />
        </Col>
      </Row>

      <table className="eds_paper">
        <thead>
          <tr>
            <th rowSpan={2}>No.</th>
            <th rowSpan={2}>Kode Produk</th>
            <th rowSpan={2}>Nama Produk</th>
            <th colSpan={3}>Jml. Dibawa</th>
            <th colSpan={3}>Jml. Kembali</th>
            <th colSpan={3}>Selisih</th>
          </tr>
          <tr>
            <th>Large</th>
            <th>Middle</th>
            <th>Small</th>
            <th>Large</th>
            <th>Middle</th>
            <th>Small</th>
            <th>Large</th>
            <th>Middle</th>
            <th>Small</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.item_number}</td>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{findQty(item.item_qty, 'large')}</td>
              <td>{findQty(item.item_qty, 'middle')}</td>
              <td>{findQty(item.item_qty, 'small')}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <th>Total</th>
            <td>{total.large}</td>
            <td>{total.middle}</td>
            <td>{total.small}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Row>
        <TTD label="Dibuat Oleh," title="SA" />
        <TTD label="Dimuat Oleh," title="Driver Helper" />
        <TTD label="Diperiksa Oleh," title="Checker" />
        <TTD label="Diketahui Oleh," title="Kepala Gudang SBH/SPV Log/BM" />
        <TTD label="Diterima Kembali Oleh," title="Kepala Gudang" />
      </Row>
      <LabelPGI text={`${data.pgi_status ? 'After' : 'Before'} PGI`} />
    </PaperA4>
  )
}
