/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'

interface BSTSProps {
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

export default function BSTS(props: BSTSProps) {
  const { data } = props
  const dataPrice = data[0].delivery_items.map((item) => item.price)
  const totalPrice = dataPrice.reduce((total, item) => total + item, 0)

  return (
    <PaperA4>
      <Row>
        <Col span={6}>
          <CustomText fontWeight="bold" fontSize={18}>
            {data[0].company_name}
          </CustomText>
          <CustomText fontSize={16}>{data[0].branch_name}</CustomText>
          <CustomText fontSize={16}>{data[0].branch_address}</CustomText>
          <CustomText fontSize={16}>Telp. {data[0].phone_number}</CustomText>
          <CustomText fontSize={16}>NPWP. {data[0].npwp}</CustomText>
          <CustomText fontSize={16}>{data[0].sloc_name}</CustomText>
        </Col>
        <Col offset={2} span={4}>
          <CustomText fontWeight="bold" fontSize={24}>
            SURAT JALAN
          </CustomText>
          {/* <CustomText fontWeight="bold" fontSize={16}>
            PENCETAKAN ULANG
          </CustomText> */}
        </Col>
        <Col offset={4} span={8}>
          <div style={{ marginTop: 10 }}>
            <strong>Kepada Yth. : {data[0].customer_id}</strong>
          </div>
          <div>
            <strong>{data[0].customer_name}</strong>
          </div>
          <div>{data[0].customer_address}</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Information label="NO. PO" value={data[0].po_number} />
          <Information label="NO. SO" value={data[0].so_number} />
          <Information label="NO. DO" value={data[0].do_number} />
        </Col>
        <Col span={4} />
        <Col offset={6} span={8}>
          <Information label="No. Faktur" value={data[0].invoices_number} />
          <Information label="TGL. Faktur" value={dateFormat(data[0].invoice_date)} />
          <Information label="SALESMAN" value={data[0].salesman_name} />
        </Col>
      </Row>
      <div>
        <table className="eds_paper_bsts">
          <thead>
            <tr>
              <th>PCODE</th>
              <th>Nama BARANG</th>
              <th>KEMASAN</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>JUMLAH(RP)</th>
              <th>DISC</th>
            </tr>
          </thead>
          <tbody>
            {data[0].delivery_items.map((e, i) => (
              <tr key={i}>
                <td>{e.product_id}</td>
                <td>{e.description}</td>
                <td>{e.uom_id}</td>
                <td>{e.order_qty}</td>
                <td>{e.price}</td>
                <td>{e.gross_value}</td>
                <td>{e.discount_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Row>
          <Col span={4}>
            <strong>Total Karton Utuh : {data[0].total_carton}</strong>
          </Col>
          <Col offset={1} span={4}>
            <strong>DPP : </strong>
          </Col>
          <Col offset={1} span={4}>
            <strong>PPN : </strong>
          </Col>
          <Col offset={1} span={4}>
            <strong>JUMLAH(Rp) : {totalPrice}</strong>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={10}>
          <Row style={{ gap: 30, marginTop: 20 }}>
            <TTD label="Penerima" title="" />
            <TTD label="Pengirim" title="" />
            <TTD label="ADM Penjualan" title="" />
          </Row>
        </Col>
        <Col offset={2} span={10}>
          <Row style={{ flexDirection: 'column', flexWrap: 'nowrap', gap: 10, marginTop: 20 }}>
            <Information label="Special Discount" value={data[0].special_discount} />
            <Information label="Total Discount" value={data[0].total_discount} />
            <Information label="Nilai Faktur" value={data[0].invoice_value} />
          </Row>
        </Col>
      </Row>
      <FooterText text="pembayaran dengan giro atau cek di atas namakan pt pinus merah abadi dianggap lunas bila giro atau cek telah cair. bila giro atau cek ditolak olh bank maka seluruh biaya ditanggung oleh customer" />
      <FooterText text="terbilang: enam puluh enam ribu lima ratus ribu rupiah " />
    </PaperA4>
  )
}
