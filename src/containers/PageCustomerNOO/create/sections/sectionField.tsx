import React, { useState } from 'react'
import moment from 'moment'
import { Col, Input, Row, Tabs, TabsProps, Typography } from 'antd'
import { DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  fieldBranchAll,
  fieldChannelCompany,
  fieldCompanyList,
  fieldCustomer,
  fieldCustomerGroupCompany,
  fieldDistrictByCompany,
  fieldDivisionByCompany,
  fieldInco,
  fieldPaymentMethod,
  fieldPriceGroupByCompanyId,
  fieldRegion,
  fieldRules,
  fieldSalesGroup,
  fieldSalesmanAll,
  fieldSalesmanGroup,
  fieldSalesOfficeByCompany,
  fieldSalesOrganization,
  fieldSloc,
  fieldTermByCompanyId,
  fieldTransportationZone,
} from 'src/configs/fieldFetches'
import { useSalesQuotationCreateContext } from '../states'
import { Card } from 'src/components'
import { Label } from 'src/components/Text'

export default function SectionField() {
  const {
    state: { dataForm, optionsOrderType },
    handler: { onChangeForm, setFetching },
  } = useSalesQuotationCreateContext()

  const [tabActive, setTabActive] = useState<'customer-data' | 'location' | 'notes' | 'picture'>(
    'customer-data',
  )

  const items: TabsProps['items'] = [
    {
      key: 'customer-data',
      label: `Customer Data`,
    },
    {
      key: 'location',
      label: `Location`,
    },
    {
      key: 'notes',
      label: `Notes`,
    },
    {
      key: 'picture',
      label: `Picture`,
    },
  ]

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const fsize = Math.round(file.size / 1024)

      if (fsize > 64) {
        alert('File too Big, please select a image file less than 64KB')
        return
      }
      let imageDataUrl = await readFile(file)
      onChangeForm('picture', imageDataUrl)
    }
  }

  function readFile(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <Col span={24}>
        <Card>
          <Tabs
            defaultActiveKey="customer-data"
            items={items}
            onChange={(key: any) => setTabActive(key)}
          />
        </Card>
      </Col>

      {tabActive === 'customer-data' ? (
        <>
          {/* CUSTOMER NAME */}
          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Customer Information
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      required
                      label="Name"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_name}
                      // fetchOptions={fieldCustomer}
                      onChange={(e: any) => {
                        onChangeForm('customer_name', e.target?.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Phone Number"
                      required
                      placeholder={'Type here...'}
                      value={dataForm?.customer_phone}
                      onChange={(e: any) => {
                        onChangeForm('customer_phone', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Short Name"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_short_name}
                      onChange={(e: any) => {
                        onChangeForm('customer_short_name', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Email"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_email}
                      onChange={(e: any) => {
                        onChangeForm('customer_email', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="KTP"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_ktp}
                      onChange={(e: any) => {
                        onChangeForm('customer_ktp', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Tax Subject"
                      placeholder={'Input Tax Reg. Number (NPWP)'}
                      value={dataForm?.tax_npwp}
                      onChange={(e: any) => {
                        onChangeForm('tax_npwp', e.target?.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          {/* CUSTOMER GROUP */}
          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Customer Group Information
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group"
                      required
                      value={dataForm?.customer_group_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_id', e.value)
                        // setFetching('load-options')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group 3"
                      required
                      value={dataForm?.customer_group_3_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_3_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group 1"
                      value={dataForm?.customer_group_1_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_1_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group 4"
                      value={dataForm?.customer_group_4_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_4_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group 2"
                      value={dataForm?.customer_group_2_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_2_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Customer Group 5"
                      value={dataForm?.customer_group_5_id}
                      fetchOptions={fieldCustomerGroupCompany}
                      onChange={(e: any) => {
                        onChangeForm('customer_group_5_id', e.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          {/* CUSTOMER COMPANY */}
          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Company Information
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Company"
                      required
                      value={dataForm?.company_id}
                      fetchOptions={fieldCompanyList}
                      onChange={(e: any) => {
                        onChangeForm('company_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Office"
                      required
                      value={dataForm?.sales_office_id}
                      fetchOptions={fieldSalesOfficeByCompany}
                      onChange={(e: any) => {
                        onChangeForm('sales_office_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Organization"
                      required
                      value={dataForm?.sales_org_id}
                      fetchOptions={fieldSalesOrganization}
                      onChange={(e: any) => {
                        onChangeForm('sales_org_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Division"
                      required
                      value={dataForm?.sales_divission_id}
                      fetchOptions={fieldDivisionByCompany}
                      onChange={(e: any) => {
                        onChangeForm('sales_divission_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Branch"
                      required
                      value={dataForm?.branch_id}
                      fetchOptions={fieldBranchAll}
                      onChange={(e: any) => {
                        onChangeForm('branch_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Channel"
                      required
                      value={dataForm?.sales_channel_id}
                      fetchOptions={fieldChannelCompany}
                      onChange={(e: any) => {
                        onChangeForm('sales_channel_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sloc"
                      placeholder={'Select'}
                      fetchOptions={fieldSloc}
                      value={dataForm?.sloc_id}
                      onChange={(e: any) => {
                        onChangeForm('sloc_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Group"
                      required
                      value={dataForm?.sales_group_id}
                      fetchOptions={fieldSalesGroup}
                      onChange={(e: any) => {
                        onChangeForm('sales_group_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={24}>
                    <DebounceSelect
                      type="select"
                      label="Salesman"
                      required
                      value={dataForm?.salesman_id}
                      fetchOptions={fieldSalesmanAll}
                      onChange={(e: any) => {
                        onChangeForm('salesman_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          {/* PAYMENT */}
          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Payment Information
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Term of Payment"
                      required
                      value={dataForm?.term_id}
                      fetchOptions={fieldTermByCompanyId}
                      onChange={(e: any) => {
                        onChangeForm('term_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Tax Subject"
                      placeholder={'Select'}
                      value={dataForm?.tax_number_sppkp}
                      onChange={(e: any) => {
                        onChangeForm('tax_number_sppkp', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Method of Payment"
                      value={dataForm?.method_payment_id}
                      fetchOptions={fieldPaymentMethod}
                      onChange={(e: any) => {
                        onChangeForm('method_payment_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Tax Reg Num. (NPWP)"
                      placeholder={'Type here...'}
                      value={dataForm.tax_npwp}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('tax_npwp', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Block"
                      placeholder={'Select'}
                      value={dataForm?.is_blocked}
                      options={[
                        { label: 'Yes', value: 1 },
                        { label: 'No', value: 0 },
                      ]}
                      onChange={(e: any) => {
                        onChangeForm('is_blocked', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Risk Class"
                      value={dataForm?.risk_class}
                      fetchOptions={fieldCustomer}
                      onChange={(e: any) => {
                        onChangeForm('risk_class', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Credit Limit"
                      placeholder={'Type here...'}
                      value={dataForm.credit_limit_id}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('credit_limit_id', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Rules"
                      required
                      value={dataForm?.rules}
                      fetchOptions={fieldRules}
                      onChange={(e: any) => {
                        onChangeForm('rules', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DatePickerInput
                      fullWidth
                      onChange={(val: any) => {
                        if (val !== null) {
                          onChangeForm(
                            'credit_limit_valid_to',
                            new Date(moment(val).format()).toISOString(),
                          )
                        }
                      }}
                      label="Credit Limit Valid To"
                      disabledDate={(current) => current < moment().startOf('day')}
                      defaultValue={moment()}
                      // value={moment(dataForm?.credit_limit_valid_to)}
                      format={'DD-MMM-YYYY'}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Check Rule"
                      value={dataForm?.check_rule}
                      fetchOptions={fieldCustomer}
                      onChange={(e: any) => {
                        onChangeForm('check_rule', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Price Group"
                      required
                      value={dataForm?.price_group_id}
                      fetchOptions={fieldPriceGroupByCompanyId}
                      onChange={(e: any) => {
                        onChangeForm('price_group_id', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Inco 1"
                      required
                      value={dataForm?.inco_1}
                      fetchOptions={fieldInco}
                      onChange={(e: any) => {
                        onChangeForm('inco_1', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Taxable Enter Num. (SPPKP)"
                      placeholder={'Type here...'}
                      value={dataForm.tax_number_sppkp}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('tax_number_sppkp', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Inco 2"
                      required
                      placeholder={'Type here...'}
                      value={dataForm.inco_2}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('inco_2', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Price List"
                      value={dataForm?.price_list}
                      fetchOptions={fieldCustomer}
                      onChange={(e: any) => {
                        onChangeForm('price_list', e.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="PKP City"
                      placeholder={'Type here...'}
                      value={dataForm.pkp_address_city}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('pkp_address_city', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="PKP Name"
                      placeholder={'Type here...'}
                      value={dataForm.pkp_name}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('pkp_name', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="PKP Address 2"
                      placeholder={'Type here...'}
                      value={dataForm.pkp_address_2}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('pkp_address_2', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="PKP Address 1"
                      placeholder={'Type here...'}
                      value={dataForm.pkp_address_1}
                      options={optionsOrderType}
                      onChange={(e: any) => {
                        onChangeForm('pkp_address_1', e.target?.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </>
      ) : tabActive === 'location' ? (
        <>
          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Address
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      required
                      label="Address"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_address}
                      // fetchOptions={fieldCustomer}
                      onChange={(e: any) => {
                        onChangeForm('customer_address', e.target?.value)
                        // setFetching('customer')
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      required
                      label="City"
                      placeholder={'Type here...'}
                      value={dataForm?.customer_city}
                      onChange={(e: any) => {
                        onChangeForm('customer_city', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Location Lattitude"
                      placeholder={'Type here...'}
                      value={dataForm?.lattitude}
                      onChange={(e: any) => {
                        onChangeForm('lattitude', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Location Longitude"
                      placeholder={'Type here...'}
                      value={dataForm?.long_lattitude}
                      onChange={(e: any) => {
                        onChangeForm('long_lattitude', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales Region"
                      required
                      value={dataForm?.customer_sales_region_id}
                      fetchOptions={fieldRegion}
                      onChange={(e: any) => {
                        onChangeForm('customer_sales_region_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Sales District"
                      value={dataForm?.sales_disctrict_id}
                      fetchOptions={fieldDistrictByCompany}
                      onChange={(e: any) => {
                        onChangeForm('sales_disctrict_id', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="select"
                      label="Transportation Zone"
                      required
                      value={dataForm?.transportation_zone_id}
                      fetchOptions={fieldTransportationZone}
                      onChange={(e: any) => {
                        onChangeForm('transportation_zone_id', e.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Sold To Customer
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Sold To Customer"
                      placeholder={'Type here...'}
                      value={dataForm?.sold_to_customer}
                      onChange={(e: any) => {
                        onChangeForm('sold_to_customer', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Bill To Customer"
                      placeholder={'Type here...'}
                      value={dataForm?.bill_to_customer}
                      onChange={(e: any) => {
                        onChangeForm('bill_to_customer', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Sold To Address"
                      placeholder={'Type here...'}
                      value={dataForm?.sold_to_address}
                      onChange={(e: any) => {
                        onChangeForm('sold_to_address', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Bill To Address"
                      placeholder={'Type here...'}
                      value={dataForm?.bill_to_address}
                      onChange={(e: any) => {
                        onChangeForm('bill_to_address', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Sold To Location Latitude"
                      placeholder={'Type here...'}
                      value={dataForm?.sold_to_loc_lat}
                      onChange={(e: any) => {
                        onChangeForm('sold_to_loc_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Bill To Location Latitude"
                      placeholder={'Type here...'}
                      value={dataForm?.bill_to_loc_lat}
                      onChange={(e: any) => {
                        onChangeForm('bill_to_loc_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Sold To Location Longitude"
                      placeholder={'Type here...'}
                      value={dataForm?.sold_to_loc_long_lat}
                      onChange={(e: any) => {
                        onChangeForm('sold_to_loc_long_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Bill To Location Longitude"
                      placeholder={'Type here...'}
                      value={dataForm?.bill_to_loc_long_lat}
                      onChange={(e: any) => {
                        onChangeForm('bill_to_loc_long_lat', e.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          <Col span={24}>
            <Card style={{ padding: 0, borderRadius: 20 }}>
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#2BBECB',
                  marginBottom: 10,
                  borderRadius: '10px 10px 0px 0px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Ship To Customer
              </div>
              <div style={{ padding: 20 }}>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Ship To Customer"
                      placeholder={'Type here...'}
                      value={dataForm?.ship_to_customer}
                      onChange={(e: any) => {
                        onChangeForm('ship_to_customer', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Pay To Customer"
                      placeholder={'Type here...'}
                      value={dataForm?.pay_to_customer}
                      onChange={(e: any) => {
                        onChangeForm('pay_to_customer', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Ship To Address"
                      placeholder={'Type here...'}
                      value={dataForm?.ship_to_address}
                      onChange={(e: any) => {
                        onChangeForm('ship_to_address', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Pay To Address"
                      placeholder={'Type here...'}
                      value={dataForm?.pay_to_address}
                      onChange={(e: any) => {
                        onChangeForm('pay_to_address', e.target?.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Ship To Location Latitude"
                      placeholder={'Type here...'}
                      value={dataForm?.ship_to_loc_lat}
                      onChange={(e: any) => {
                        onChangeForm('ship_to_loc_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Pay To Location Latitude"
                      placeholder={'Type here...'}
                      value={dataForm?.pay_to_loc_lat}
                      onChange={(e: any) => {
                        onChangeForm('pay_to_loc_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Ship To Location Longitude"
                      placeholder={'Type here...'}
                      value={dataForm?.ship_to_loc_long_lat}
                      onChange={(e: any) => {
                        onChangeForm('ship_to_loc_long_lat', e.value)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <DebounceSelect
                      type="input"
                      label="Pay To Location Longitude"
                      placeholder={'Type here...'}
                      value={dataForm?.pay_to_loc_long_lat}
                      onChange={(e: any) => {
                        onChangeForm('pay_to_loc_long_lat', e.value)
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </>
      ) : tabActive === 'notes' ? (
        <>
          <Card>
            <Col span={24}>
              {/* <DebounceSelect
                type="input"
                label="Gatget Note"
                placeholder={'Type here...'}
                value={dataForm?.gadget_note}
                onChange={(e: any) => {
                  onChangeForm('gadget_note', e.target?.value)
                }}
              /> */}
              <Typography.Title level={5} style={{ marginBottom: 10 }}>
                Gadget Notes
              </Typography.Title>
              <Input.TextArea
                id="other-notes"
                placeholder={'Type here...'}
                value={dataForm?.gadget_note}
                style={{
                  border: '1px solid #AAAAAA',
                  borderRadius: 8,
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onChange={(e: any) => {
                  onChangeForm('gadget_note', e.target?.value)
                }}
              />
            </Col>
            <Col span={24}>
              <div style={{ color: '#FFD41F', margin: 5 }}>
                Notes will be displayed in salesman gadget when visiting the customer
              </div>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              {/* <DebounceSelect
                type="input"
                label="Other Note"
                placeholder={'Type here...'}
                value={dataForm?.other_note}
                onChange={(e: any) => {
                  onChangeForm('other_note', e.target?.value)
                }}
              /> */}
              <Typography.Title level={5} style={{ marginBottom: 10 }}>
                Other Notes
              </Typography.Title>
              <Input.TextArea
                id="other-notes"
                placeholder={'Type here...'}
                value={dataForm?.other_note}
                style={{
                  border: '1px solid #AAAAAA',
                  borderRadius: 8,
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onChange={(e: any) => {
                  onChangeForm('other_note', e.target?.value)
                }}
              />
            </Col>
          </Card>
        </>
      ) : (
        <>
          <Col span={24}>
            <Card>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Label>Picture</Label>
                  <Input
                    type="file"
                    onChange={onFileChange}
                    accept="image/*"
                    style={{
                      border: '1px solid #AAAAAA',
                      borderRadius: 8,
                      padding: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  {dataForm?.picture && (
                    <img
                      src={dataForm?.picture}
                      alt=""
                      style={{
                        marginTop: 10,
                        maxHeight: 500,
                      }}
                    />
                  )}
                  {/* <DebounceSelect
                    type="input"
                    label="Picture"
                    placeholder={'Type here...'}
                    value={dataForm?.picture}
                    // fetchOptions={fieldCustomer}
                    onChange={(e: any) => {
                      onChangeForm('picture', e.target?.value)
                      // setFetching('customer')
                    }}
                  /> */}
                </Col>
              </Row>
            </Card>
          </Col>
        </>
      )}
    </>
  )
}
