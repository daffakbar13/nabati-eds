/* eslint-disable camelcase */
import { Col, Row } from 'antd'
import React from 'react'
import ReactToPrint from 'react-to-print'
import { DataList } from 'src/components'
import PaperA4 from 'src/components/PaperA4'

interface HPHProps {}

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
  const {} = props

  return (
    <PaperA4>
      <Row>
        <Col span={8}>
          <CustomText fontWeight="bold" fontSize={18}>
            Pinus Merah Abadi, PT
          </CustomText>
          <CustomText fontWeight="bold" fontSize={18}>
            PMA Pandeglang
          </CustomText>
        </Col>
        <Col offset={6} span={8}>
          <Information label="Tanggal Cetak" value="a" />
          <Information label="Halaman" value="a" />
          <Information label="Cetakan Ke" value="a" />
        </Col>
      </Row>
      <Row justify="center">
        <CustomText fontWeight="bold" fontSize={24}>
          HASIL PENJUALAN HARIAN (HPH)
        </CustomText>
      </Row>
      <Row>
        <Col span={8}>
          <Information label="No. Kendaraan" value="a" />
          <Information label="Pengiriman" value="a" />
          <Information label="Jumlah Toko" value="a" />
        </Col>
        <Col offset={6} span={8}>
          <Information label="No. HPH" value="a" />
          <Information label="Tanggal Kirim" value="a" />
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
          <tr style={{ height: 400 }}>
            <td>
              <div>asd</div>
              <div>asd</div>
            </td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <th>Total</th>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
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
