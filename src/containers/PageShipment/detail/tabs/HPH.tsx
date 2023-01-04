/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface HPHProps {
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

function TTD(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        borderBottom: '2px solid black',
        textAlign: 'center',
      }}
    >
      {children}
      <div style={{ height: 100 }}></div>
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

export default function HPH(props: HPHProps) {
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
        <Col offset={6} span={8}>
          <Information label="Tanggal Cetak" value={dateFormat(new Date().toISOString())} />
          <Information label="Halaman" value="1" />
          <Information label="Cetakan Ke" value="1/1" />
        </Col>
      </Row>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          HASIL PENJUALAN HARIAN (HPH)
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="No. Kendaraan" value={data.vehicle_id} />
          <Information label="Pengiriman" value={data.ritase > 0 ? `Rit.${data.ritase}` : ''} />
          <Information label="Jumlah Toko" value={data.total_store} />
        </Col>
        <Col offset={6} span={8}>
          <Information label="No. HPH" value={data.shipment_id} />
          <Information label="Tanggal Kirim" value={dateFormat(data.delivery_date)} />
        </Col>
      </Row>
      <table className="eds_paper">
        <thead>
          <tr>
            <th rowSpan={3}>No.</th>
            <th rowSpan={3}>Kode</th>
            <th rowSpan={3}>Nama Pelanggan</th>
            <th colSpan={4}>Penjualan</th>
            <th colSpan={5}>Pembayaran</th>
            <th rowSpan={3}>Saldo</th>
          </tr>
          <tr>
            <th colSpan={3}>Transaksi</th>
            <th rowSpan={2}>Jumlah (Rp.)</th>
            <th rowSpan={2}>Tunai</th>
            <th colSpan={4}>Cek / Bilyet / Giro</th>
          </tr>
          <tr>
            <th>Fisik</th>
            <th>No. Transaksi</th>
            <th>Type</th>
            <th>Bank</th>
            <th>Nomor</th>
            <th>Jt. Tempo</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((e, i) => (
            <tr key={i}>
              <td>{e.item_number}</td>
              <td>{e.customer_id}</td>
              <td>{e.customer_name}</td>
              <td></td>
              <td></td>
              <td>{e.doc_type}</td>
              <td></td>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Row style={{ gap: 30, marginTop: 20 }}>
        <TTD>
          <CustomText fontWeight="bold">Diperiksa Oleh,</CustomText>
          <CustomText fontWeight="bold">FA SPV/SBH</CustomText>
        </TTD>
        <TTD>
          <CustomText fontWeight="bold">Diinput Oleh,</CustomText>
          <CustomText fontWeight="bold">SA</CustomText>
        </TTD>
        <TTD>
          <CustomText fontWeight="bold">AR Staff</CustomText>
        </TTD>
        <TTD>
          <CustomText fontWeight="bold">Kasir</CustomText>
        </TTD>
        <TTD>
          <CustomText fontWeight="bold">ASS/SBH</CustomText>
        </TTD>
        <TTD>
          <CustomText fontWeight="bold">Driver Dropping</CustomText>
        </TTD>
      </Row>
      {/* <Row style={{ marginTop: 40 }}>
            <Col span={8}>FRM-FAD-015 Raw 01</Col>
            <Col offset={6} span={8}>
              <span>Lembar Putih : SA</span>
              <span style={{ marginLeft: 50 }}>Lembar Merah : Lampiran HPH</span>
              <div>Lembar Kuning : Arsip Gudang</div>
            </Col>
          </Row> */}
    </PaperA4>
  )
}
