/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
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

function FooterText(props: { text: string }) {
  const { text } = props
  return (
    <div
      style={{
        textTransform: 'uppercase',
        marginTop: 10,
        lineHeight: 1.25,
      }}
    >
      <CustomText textAlign="left" fontSize={14}>
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
          <Information label="Tanggal Cetak" value={dateFormat(new Date().toISOString())} />
          <Information label="Halaman" value="1" />
          <Information label="Cetakan Ke" value="1/1" />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6}>
          <CustomText fontWeight="bold" fontSize={24}>
            SURAT JALAN
          </CustomText>
          <CustomText fontWeight="bold" fontSize={16}>
            PENCETAKAN ULANG
          </CustomText>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="Tanggal Kirim" value={dateFormat(data.delivery_date)} />
        </Col>
        <Col offset={6} span={10}>
          <Information label="No. BSTF" value={data.shipment_id} />
        </Col>
      </Row>
      <div>
        {/* <table className="eds_paper" style={{ tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td>No. Kendaraan</td>
              <td>{data.vehicle_id}</td>
              <td>Driver</td>
              <td>{data.driver_name}</td>
              <td>Jam Berangkat</td>
              <td></td>
              <td>KM Berangkat</td>
              <td></td>
              <td>Jml. Kublikasi</td>
              <td>{`${Math.round(data.total_cubication / 10)} M³`}</td>
            </tr>
            <tr>
              <td>Pengiriman</td>
              <td>{data.ritase > 0 ? `Rit.${data.ritase}` : ''}</td>
              <td>Helper</td>
              <td></td>
              <td>Jam Kembali</td>
              <td></td>
              <td>KM Kembali</td>
              <td></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td colSpan={10}>Jumlah Toko: {data.total_store}</td>
            </tr>
          </tbody>
        </table> */}
        <table className="eds_paper">
          <thead>
            <tr>
              <th rowSpan={3}>PCODE</th>
              <th rowSpan={3}>Nama BARANG</th>
              <th rowSpan={3}>KEMASAN</th>
              <th rowSpan={3}>QTY</th>
              <th rowSpan={3}>PRICE</th>
              <th rowSpan={3}>JUMLAH(RP)</th>
              <th rowSpan={3}>DISC</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((e, i) => (
              <tr key={i}>
                <td>{e.customer_id}</td>
                <td>{e.customer_name}</td>
                <td>{e.doc_type}</td>
                <td>{e.billing_to}</td>
                <td>{e.doc_type}</td>
                <td>{e.total_qty_item}</td>
                <td>{e.total_qty_item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Row>
        <Col span={10}>
          <Row style={{ gap: 30, marginTop: 20 }}>
            <TTD label="Penerima" title="" />
            <TTD label="Pengirim," title="" />
            <TTD label="ADM Penjualan" title="" />
          </Row>
        </Col>
        <Col offset={2} span={10}>
          <Row style={{ flexDirection: 'column', flexWrap: 'nowrap', gap: 10, marginTop: 20 }}>
            <Information label="Special Discount" value={dateFormat(new Date().toISOString())} />
            <Information label="Total Discount" value="1" />
            <Information label="Discount Inv." value="1/1" />
            <Information label="Nilai Faktur" value="1/1" />
          </Row>
        </Col>
      </Row>
      <FooterText text="pembayaran dengan giro atau cek di atas namakan pt pinus merah abadi dianggap lunas bila giro atau cek telah cair. bila giro atau cek ditolak olh bank maka seluruh biaya ditanggung oleh customer" />
      <FooterText text="terbilang: enam puluh enam ribu lima ratus ribu rupiah " />
    </PaperA4>
  )
}
