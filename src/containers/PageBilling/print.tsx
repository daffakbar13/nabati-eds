import { Row, Col } from 'antd'
import React from 'react'
import PaperA4 from 'src/components/PaperA4'
import currency from 'src/utils/currencyFormat'
import dateFormat from 'src/utils/dateFormat'

interface PrintBillingProps {
  surat_jalan?: any[]
  invoice?: any[]
}

export default function PrintBilling(props: PrintBillingProps) {
  const { invoice, surat_jalan } = props
  const NOT_FOUND = 'NOT FOUND IN RESPONSE API'
  return (
    <>
      {invoice?.map((data, i) => {
        const {
          id,
          billing_date,
          due_date,
          company_id,
          customer_info: { customer_info },
          customer_id,
          do_number,
          so_number,
          salesman,
          billing_item,
          dpp_total_amount,
          tax_total_amount,
          total_amount,
          discount_total_amount,
        } = data
        return (
          <PaperA4 key={i} style={{ minHeight: 1122.5 * 1.43 }}>
            <Row>
              <Col span={8}>
                <h3>
                  <b>{company_id}</b>
                </h3>
              </Col>
              <Col span={8} style={{ textAlign: 'center' }}>
                <h2>
                  <b>Invoice</b>
                </h2>
                <h3>
                  <b>Pencetakan Ulang</b>
                </h3>
              </Col>
              <Col span={8}>
                <h3>Tanggal Cetak : {dateFormat(new Date().toISOString(), true)}</h3>
                <br />
                <h3>Kepada Yth : {customer_info?.customer?.id}</h3>
                <h3>
                  <b>{customer_info?.customer?.name}</b>
                </h3>
                <h3>{customer_info?.customer?.address}</h3>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <table style={{ tableLayout: 'auto' }}>
                  <tbody>
                    <tr>
                      <td>TELP</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NPWP</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NO. DO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{do_number}</td>
                    </tr>
                    <tr>
                      <td>NO. SO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{so_number}</td>
                    </tr>
                    <tr>
                      <td>SALESMAN</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{salesman}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={8}>
                <table style={{ tableLayout: 'auto' }}>
                  <tbody>
                    <tr>
                      <td>NO. FAKTUR</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td>TGL. FAKTUR</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{dateFormat(billing_date)}</td>
                    </tr>
                    <tr>
                      <td>TGL. JTEMPO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{dateFormat(due_date)}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <table className="eds_print_invoice">
                <thead>
                  <tr>
                    <th>PCODE</th>
                    <th>NAMA BARANG</th>
                    <th>KEMASAN</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>JUMLAH(RP)</th>
                    <th>DISC</th>
                  </tr>
                </thead>
                <tbody>
                  {[...billing_item].map((b, idx) => (
                    <tr key={idx}>
                      <td>{b.product_id}</td>
                      <td>{b.description}</td>
                      <td>{b.uom_name}</td>
                      <td>{b.base_qty}</td>
                      <td>{currency(b.price)}</td>
                      <td>{currency(b.gross_value)}</td>
                      <td>{currency(b.discount_value)}</td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan={5}>
                      <Row justify="space-between">
                        <div>Total Karton Utuh : {NOT_FOUND}</div>
                        <div>DPP : {currency(dpp_total_amount)}</div>
                        <div>PPN : {currency(tax_total_amount)}</div>
                        <div>Jumlah</div>
                      </Row>
                    </th>
                    <th>{currency(total_amount)}</th>
                  </tr>
                </tbody>
              </table>
            </Row>
            <Row gutter={100}>
              <Col>
                <h3 style={{ textAlign: 'center' }}>
                  <b>PENERIMA</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between" style={{ minWidth: 140 }}>
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col>
                <h3 style={{ textAlign: 'center' }}>
                  <b>PENGIRIM</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between" style={{ minWidth: 140 }}>
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col>
                <h3>
                  <b>ADM PENJUALAN</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between">
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col style={{ flexGrow: 1 }}>
                <Row justify="space-between">
                  <h3>Special Discount</h3>
                  <h3>{discount_total_amount}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Total Discount</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Discount Inv.</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Nilai Faktur</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>
                  PEMBAYARAN DENGAN GIRO ATAU CEK DI ATAS NAMAKAN {company_id} DIANGGAP LUNAS BILA
                  GIRO ATAU CEK TELAH CAIR. BILA GIRO ATAU CEK DITOLAK OLEH BANK MAKA SELURUH BIAYA
                  DITANGGUNG OLEH CUSTOMER
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Terbilang : {NOT_FOUND}</h3>
              </Col>
            </Row>
          </PaperA4>
        )
      })}
      {surat_jalan?.map((data, i) => {
        const { shipment_detail, shipment_items_detail } = data
        return (
          <PaperA4 key={i} style={{ minHeight: 1122.5 * 1.43 }}>
            <Row>
              <Col span={8}>
                <h3>
                  <b>{NOT_FOUND}</b>
                </h3>
              </Col>
              <Col span={8} style={{ textAlign: 'center' }}>
                <h2>
                  <b>SURAT JALAN</b>
                </h2>
              </Col>
              <Col span={8}>
                <h3>Tanggal Cetak : {dateFormat(new Date().toISOString(), true)}</h3>
                <br />
                <h3>Kepada Yth : {NOT_FOUND}</h3>
                <h3>
                  <b>{NOT_FOUND}</b>
                </h3>
                <h3>{NOT_FOUND}</h3>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <table style={{ tableLayout: 'auto' }}>
                  <tbody>
                    <tr>
                      <td>TELP</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NPWP</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NO. DO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NO. SO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>NO. DO</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={8}>
                <table style={{ tableLayout: 'auto' }}>
                  <tbody>
                    <tr>
                      <td>NO. FAKTUR</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{NOT_FOUND}</td>
                    </tr>
                    <tr>
                      <td>TGL. FAKTUR</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{dateFormat(NOT_FOUND)}</td>
                    </tr>
                    <tr>
                      <td>SALESMAN</td>
                      <td style={{ minWidth: 30, textAlign: 'center' }}> : </td>
                      <td>{dateFormat(NOT_FOUND)}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <table className="eds_print_invoice">
                <thead>
                  <tr>
                    <th>PCODE</th>
                    <th>NAMA BARANG</th>
                    <th>KEMASAN</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>JUMLAH(RP)</th>
                    <th>DISC</th>
                  </tr>
                </thead>
                <tbody>
                  {[...shipment_items_detail].map((b, idx) => (
                    <tr key={idx}>
                      <td>{NOT_FOUND}</td>
                      <td>{NOT_FOUND}</td>
                      <td>{NOT_FOUND}</td>
                      <td>{NOT_FOUND}</td>
                      <td>{currency(NOT_FOUND)}</td>
                      <td>{currency(NOT_FOUND)}</td>
                      <td>{currency(NOT_FOUND)}</td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan={5}>
                      <Row justify="space-between">
                        <div>Total Karton Utuh : {NOT_FOUND}</div>
                        <div>DPP : {currency(NOT_FOUND)}</div>
                        <div>PPN : {currency(NOT_FOUND)}</div>
                        <div>Jumlah</div>
                      </Row>
                    </th>
                    <th>{currency(NOT_FOUND)}</th>
                  </tr>
                </tbody>
              </table>
            </Row>
            <Row gutter={100}>
              <Col>
                <h3 style={{ textAlign: 'center' }}>
                  <b>PENERIMA</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between" style={{ minWidth: 140 }}>
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col>
                <h3 style={{ textAlign: 'center' }}>
                  <b>PENGIRIM</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between" style={{ minWidth: 140 }}>
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col>
                <h3>
                  <b>ADM PENJUALAN</b>
                </h3>
                <br />
                <br />
                <br />
                <Row justify="space-between">
                  <Col>{'('}</Col>
                  <Col>{')'}</Col>
                </Row>
              </Col>
              <Col style={{ flexGrow: 1 }}>
                <Row justify="space-between">
                  <h3>Special Discount</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Total Discount</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Discount Inv.</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
                <Row justify="space-between">
                  <h3>Nilai Faktur</h3>
                  <h3>{NOT_FOUND}</h3>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>
                  PEMBAYARAN DENGAN GIRO ATAU CEK DI ATAS NAMAKAN {NOT_FOUND} DIANGGAP LUNAS BILA
                  GIRO ATAU CEK TELAH CAIR. BILA GIRO ATAU CEK DITOLAK OLEH BANK MAKA SELURUH BIAYA
                  DITANGGUNG OLEH CUSTOMER
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Terbilang : {NOT_FOUND}</h3>
              </Col>
            </Row>
          </PaperA4>
        )
      })}
    </>
  )
}
