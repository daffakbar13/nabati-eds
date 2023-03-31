/* eslint-disable camelcase */
import { Spacer } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import dateFormat from 'src/utils/dateFormat'
import moment from 'moment'

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

export default function DeliveryNote({ details, refs }) {
  return (
    <>
      Print Preview - Lembar Penerimaan Barang (LPB)
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
        <div ref={refs}>
          <PaperA4>
            <Row>
              <Col span={20}>
                <Row justify="center">
                  <CustomText fontWeight="bold" fontSize={24}>
                    Laporan Penerimaan Barang
                  </CustomText>
                </Row>
              </Col>
              <Col span={4}>
                No. Dokumen. <br />
                {details?.material_doc_id}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                Penerima : <br />
                {`${details?.branch_id} - ${details?.branch_name}`} <br />
                JL. SOEKARNO HATTA NO 588 ALAMAT NOT IMPLEMENT
                <br />
                Sloc not implement YET <br />
              </Col>
              <Col span={8}>
                <Information
                  label="Tanggal Doc"
                  value={moment(details?.document_date).format('DD MMM YYYY')}
                />
                <Information label="NO. Prof PO" value={details?.po_number} />
                <Information label="No SUrat Jalan" value="1231234134 NOT IMPLEMENT YET" />
              </Col>
              <Col span={8}>
                Pengirim : <br />
                {`${details?.vendor_id} - ${details?.vendor_name}`} <br />
                JL. SOEKARNO HATTA NO 588 ALAMAT NOT IMPLEMENT
                <br />
              </Col>
            </Row>
            <table className="eds_paper">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode Barang</th>
                  <th>Deskripsi Barang (nama, spec)</th>
                  <th>Jumlah</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {details?.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product_id}</td>
                    <td>{item.product_name}</td>
                    <td>{`${item.qty_gr} ${item.uom_id}`}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PaperA4>
        </div>
      </div>
    </>
  )
}
