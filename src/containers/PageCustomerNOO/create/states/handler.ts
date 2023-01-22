/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { getDetailCustomerNOO } from 'src/api/customer-noo'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import { getDetailQuotation } from 'src/api/quotation'
import { useTableProduct } from 'src/components/TableProduct/hooks'
import { PATH } from 'src/configs/menus'
import { concatString } from 'src/utils/concatString'
import { DispatchType } from './reducer'
import { StateType } from './state'

export function useHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  const { dataForm, optionsOrderType, fetching } = state

  const router = useRouter()
  const splitString = (data: string) => data.split(' - ')[0]

  function setDataForm(payload: StateType['dataForm']) {
    dispatch({
      type: 'dataForm',
      payload,
    })
  }

  function onChangeForm(field: keyof StateType['dataForm'], value: any) {
    dispatch({
      type: 'dataForm',
      payload: { ...dataForm, [field]: value },
    })
  }

  function dataSubmitted(status_id: number) {
    // customer_id: splitString(dataForm.customer_id),
    const {
      country_id,
      customer_name,
      customer_short_name,
      customer_ktp,
      customer_phone,
      customer_email,
      customer_group_id,
      customer_group_1_id,
      customer_group_2_id,
      customer_group_3_id,
      customer_group_4_id,
      customer_group_5_id,
      company_id,
      sales_org_id,
      branch_id,
      sloc_id,
      salesman_id,
      sales_office_id,
      sales_divission_id,
      sales_channel_id,
      sales_group_id,
      term_id,
      method_payment_id,
      is_blocked,
      credit_limit_id,
      credit_limit_valid_to,
      price_group_id,
      tax_number_sppkp,
      price_list,
      pkp_name,
      pkp_address_1,
      pkp_address_2,
      pkp_address_city,
      tax_subject,
      tax_npwp,
      risk_class,
      rules,
      check_rule,
      inco_1,
      inco_2,
      customer_address,
      customer_city,
      lattitude,
      long_lattitude,
      customer_sales_region_id,
      transportation_zone_id,
      sales_disctrict_id,
      sold_to_customer,
      sold_to_address,
      sold_to_loc_lat,
      sold_to_loc_long_lat,
      bill_to_customer,
      bill_to_address,
      bill_to_loc_lat,
      bill_to_loc_long_lat,
      ship_to_customer,
      ship_to_address,
      ship_to_loc_lat,
      ship_to_loc_long_lat,
      pay_to_customer,
      pay_to_address,
      pay_to_loc_lat,
      pay_to_loc_long_lat,
      gadget_note,
      other_note,
      picture,
    } = dataForm

    return {
      status_id: status_id.toString(),
      country_id,
      customer_name,
      customer_short_name,
      customer_ktp,
      customer_phone,
      customer_email,
      customer_group_id,
      customer_group_1_id,
      customer_group_2_id,
      customer_group_3_id,
      customer_group_4_id,
      customer_group_5_id,
      company_id,
      sales_org_id,
      branch_id,
      sloc_id,
      salesman_id: [salesman_id],
      sales_office_id,
      sales_divission_id,
      sales_channel_id,
      sales_group_id,
      term_id,
      method_payment_id,
      is_blocked: is_blocked ? true : false,
      credit_limit_id,
      credit_limit_valid_to: credit_limit_valid_to || new Date().toISOString(),
      price_group_id,
      tax_number_sppkp,
      price_list,
      pkp_name,
      pkp_address_1,
      pkp_address_2,
      pkp_address_city,
      tax_subject,
      tax_npwp,
      risk_class,
      rules,
      check_rule,
      inco_1,
      inco_2,
      customer_address: customer_address || 'Jl xxxx',
      customer_city,
      lattitude,
      long_lattitude,
      customer_sales_region_id: customer_sales_region_id || '1',
      transportation_zone_id: transportation_zone_id || 'D101',
      sales_disctrict_id,
      sold_to_customer,
      sold_to_address,
      sold_to_loc_lat,
      sold_to_loc_long_lat,
      bill_to_customer,
      bill_to_address,
      bill_to_loc_lat,
      bill_to_loc_long_lat,
      ship_to_customer,
      ship_to_address,
      ship_to_loc_lat,
      ship_to_loc_long_lat,
      pay_to_customer,
      pay_to_address,
      pay_to_loc_lat,
      pay_to_loc_long_lat,
      gadget_note,
      other_note,
      picture,
    }

    // return {
    //   ...dataForm,
    //   status_id: status_id.toString(),
    // }
  }

  function runProcess(payload: string) {
    dispatch({
      type: 'processing',
      payload,
    })
  }

  function stopProcess() {
    dispatch({ type: 'processing', payload: undefined })
  }

  function setQuotationId(payload: string) {
    dispatch({
      type: 'quotationId',
      payload,
    })
  }

  function setCustomerId(payload: string) {
    dispatch({
      type: 'customerId',
      payload,
    })
  }

  function showConfirm(payload: 'newQuo' | 'draftQuo' | 'cancel') {
    dispatch({
      type: 'confirm',
      payload,
    })
  }

  function unShowConfirm() {
    dispatch({
      type: 'confirm',
      payload: undefined,
    })
  }

  function setOptionsOrderType(payload: any[]) {
    dispatch({
      type: 'optionsOrderType',
      payload,
    })
  }

  function setOptionsSalesman(payload: any[]) {
    dispatch({
      type: 'optionsSalesman',
      payload,
    })
  }

  function setOptionsSalesOrg(payload: any[]) {
    dispatch({
      type: 'optionsSalesOrg',
      payload,
    })
  }

  function setOptionsBranch(payload: any[]) {
    dispatch({
      type: 'optionsBranch',
      payload,
    })
  }

  function setFetching(payload: 'customer' | 'load-options') {
    dispatch({
      type: 'fetching',
      payload,
    })
  }

  function stopFetching() {
    dispatch({ type: 'fetching', payload: undefined })
  }

  function setCanSave(payload: boolean) {
    dispatch({
      type: 'canSave',
      payload,
    })
  }

  function setCanSaveAsDraft(payload: boolean) {
    dispatch({
      type: 'canSaveAsDraft',
      payload,
    })
  }

  function getDataFromDetail(table: ReturnType<typeof useTableProduct>) {
    const now = new Date().toISOString()
    if (router.query.id && optionsOrderType?.length > 0 && !table.state.isLoading) {
      runProcess('Wait for get data')
      getDetailCustomerNOO('', router.query.id as string)
        .then((response) => {
          const { data } = response
          const { customer_sales_data, customer, salesman, status, country, customer_group } = data

          setDataForm({
            status_id: status.id,
            country_id: country.country_id,
            customer_name: customer.name,
            customer_short_name: customer.short_name,
            customer_ktp: customer.ktp,
            customer_phone: customer.phone,
            customer_email: customer.email,
            customer_group_id: customer_group.customer_group_id,
            customer_group_1_id: customer_group.customer_group_1_id,
            customer_group_2_id: customer_group.customer_group_2_id,
            customer_group_3_id: customer_group.customer_group_3_id,
            customer_group_4_id: customer_group.customer_group_4_id,
            customer_group_5_id: customer_group.customer_group_5_id,
            company_id: customer_sales_data.company_id,
            sales_org_id: customer_sales_data.sales_org_id,
            branch_id: customer_sales_data.branch_id,
            sloc_id: customer_sales_data.sloc_id,
            salesman_id: salesman[0]?.salesman_id,
            sales_office_id: customer_sales_data.sales_offfice_id,
            sales_divission_id: customer_sales_data.division_id,
            sales_channel_id: customer_sales_data.channel_id,
            sales_group_id: customer_sales_data.sales_group_id,
            term_id: customer_sales_data.term_id,
            method_payment_id: customer_sales_data.payment_method_id,
            is_blocked: customer_sales_data.is_blocked,
            credit_limit_id: customer_sales_data.credit_limit,
            credit_limit_valid_to: customer_sales_data.credit_limit_valid_to,
            price_group_id: customer_sales_data.price_group_id,
            // tax_number_sppkp,
            price_list: customer_sales_data.price_list_id,
            pkp_name: customer_sales_data.pkp_name,
            pkp_address_1: customer_sales_data.address_pkp1,
            pkp_address_2: customer_sales_data.address_pkp2,
            pkp_address_city: customer_sales_data.city_pkp,
            tax_subject: customer_sales_data.tax_subject,
            // tax_npwp,
            risk_class: customer_sales_data.risk_class_id,
            rules: customer_sales_data.rules,
            check_rule: customer_sales_data.check_rule_id,
            inco_1: customer_sales_data.incoterm1,
            inco_2: customer_sales_data.incoterm2,
          })
          // const dataItems: typeof table.state.data = data.items.map((p) => ({
          //   name: p.description,
          //   order_qty: p.order_qty,
          //   price: p.price,
          //   product_id: p.product_id,
          //   sub_total: p.gross_value,
          //   uom_id: p.uom_id,
          //   discOption: 'Rp',
          //   discount: p.discount_value,
          //   remarks: p.remarks,
          // }))
          // table.handler.addDataFromFetch(dataItems)
          stopProcess()
          setFetching('load-options')
          if (data.status_id === '1') setCanSaveAsDraft(false)
        })
        .catch(() => router.push(`${PATH.SALES}/customer-noo`))
    }
  }

  // function handleFetching() {
  //   if (fetching) {
  //     runProcess('Wait for load customer')
  //     const customer_id = dataForm?.customer_id.split(' - ')[0]
  //     getCustomerByFilter({
  //       branch_id: '',
  //       customer_id,
  //       sales_org_id: '',
  //       salesman_id: '',
  //     })
  //       .then((result) => {
  //         const { data } = result
  //         const newOptions = {
  //           salesman: data.map(({ salesman_id, salesman_name }) => ({
  //             label: [salesman_id, salesman_name].join(' - '),
  //             value: [salesman_id, salesman_name].join(' - '),
  //           })),
  //           sales_org: data.splice(0, 1).map(({ sales_org_id, sales_org_name }) => ({
  //             label: [sales_org_id, sales_org_name].join(' - '),
  //             value: [sales_org_id, sales_org_name].join(' - '),
  //           })),
  //           branch: data.splice(0, 1).map(({ branch_id, branch_name }) => ({
  //             label: [branch_id, branch_name].join(' - '),
  //             value: [branch_id, branch_name].join(' - '),
  //           })),
  //         }
  //         setOptionsSalesman(newOptions.salesman)
  //         setOptionsSalesOrg(newOptions.sales_org)
  //         setOptionsBranch(newOptions.branch)
  //         onChangeForm('ship_to_id', dataForm?.customer_id)
  //         if (fetching === 'customer') {
  //           dispatch({
  //             type: 'dataForm',
  //             payload: {
  //               ...dataForm,
  //               ship_to_id: dataForm?.customer_id,
  //               sales_org_id: newOptions.sales_org[0].value,
  //               branch_id: newOptions.branch[0].value,
  //               salesman_id: newOptions.salesman[0].value,
  //             },
  //           })
  //         }
  //         stopProcess()
  //         stopFetching()
  //       })
  //       .catch(() => {
  //         stopProcess()
  //         stopFetching()
  //       })
  //   }
  // }

  function handleCanSubmit() {
    const requiredFields = [
      dataForm?.customer_name,
      dataForm?.customer_phone,
      dataForm?.customer_group_id,
      dataForm?.customer_group_3_id,
      dataForm?.company_id,
      dataForm?.sales_office_id,
      dataForm?.sales_org_id,
      dataForm?.sales_divission_id,
      dataForm?.branch_id,
      dataForm?.sales_channel_id,
      dataForm?.sales_group_id,
      dataForm?.salesman_id,
      dataForm?.term_id,
      dataForm?.rules,
      dataForm?.price_group_id,
      dataForm?.inco_1,
      dataForm?.inco_2,
    ]

    // console.log(requiredFields)
    const fieldAreRequired = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    // const productNotNull =
    //   dataForm?.items?.filter(({ product_id }) => product_id === '').length === 0

    // if (fieldAreRequired && productNotNull) {
    if (fieldAreRequired) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }

  // function getDocType() {
  //   runProcess('Wait for get order type')
  //   async function api() {
  //     await getDocTypeByCategory('B').then((response) => {
  //       const { data } = response
  //       const options = data.map(({ id, name }) => ({
  //         label: concatString(id, name),
  //         value: concatString(id, name),
  //       }))
  //       onChangeForm('order_type_id', options.find(({ value }) => value.includes('ZQP1'))?.value)
  //       setOptionsOrderType(options)
  //     })
  //   }
  //   api()
  //     .then(() => stopProcess())
  //     .catch(() => stopProcess())
  // }

  return {
    setDataForm,
    onChangeForm,
    dataSubmitted,
    runProcess,
    stopProcess,
    setCanSave,
    setFetching,
    stopFetching,
    setQuotationId,
    setCustomerId,
    showConfirm,
    unShowConfirm,
    setOptionsBranch,
    setOptionsOrderType,
    setOptionsSalesOrg,
    setOptionsSalesman,
    setCanSaveAsDraft,
    getDataFromDetail,
    // handleFetching,
    // getDocType,
    handleCanSubmit,
  }
}
