/* eslint-disable function-paren-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React from 'react'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import { getDetailQuotation } from 'src/api/quotation'
import { PATH } from 'src/configs/menus'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import { useTableProduct } from './columns'

export interface PayloadCreate {
  company_id?: string
  branch_id?: string
  source_id?: string
  order_date?: string
  delivery_date?: string
  pricing_date?: string
  order_type_id?: string
  customer_id?: string
  ship_to_id?: string
  salesman_id?: string
  sales_org_id?: string
  valid_from?: string
  valid_to?: string
  customer_ref?: string
  currency_id?: string
  items?: any[]
}

const now = new Date().toISOString()

export default function SalesQuotationCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const tableProduct = useTableProduct()
  const pageCtx = useSalesQuotationCreateContext<typeof useTableProduct>()
  const router = useRouter()
  const { dataForm, fetching, optionsOrderType } = pageCtx.state
  const {
    runProcess,
    setCanSave,
    setDataForm,
    setFetching,
    setOptionsBranch,
    setOptionsOrderType,
    setOptionsSalesOrg,
    setOptionsSalesman,
    stopProcess,
    onChangeForm,
    stopFetching,
  } = pageCtx.handler

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDetailQuotation({ id: router.query.id as string })
        .then((response) => response.data)
        .then((data) => {
          setDataForm({
            company_id: 'PP01',
            branch_id: concatString(data.branch_id, data.branch_name),
            source_id: 'Z02',
            order_date: data.order_date,
            delivery_date: data.delivery_date,
            pricing_date: data.pricing_date || now,
            order_type_id: dataForm?.order_type_id,
            customer_id: concatString(data.customer_id, data.customer_name),
            ship_to_id: concatString(data.customer_id, data.customer_name),
            salesman_id: concatString(data.salesman_id, data.salesman_name),
            sales_org_id: concatString(data.sales_org_id, data.sales_org_name),
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            customer_ref: data.customer_ref,
            currency_id: 'IDR',
          })
          setFetching('load-options')
        })
        .catch(() => router.push(`${PATH.SALES}/quotation`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('items', tableProduct.data)
  }, [tableProduct.data])

  React.useEffect(() => {
    if (fetching) {
      runProcess('Wait for load customer')
      const customer_id = dataForm?.customer_id.split(' - ')[0]
      getCustomerByFilter({
        branch_id: '',
        customer_id,
        sales_org_id: '',
        salesman_id: '',
      })
        .then((result) => {
          const newOptions = {
            salesman: result.data.map(({ salesman_id, salesman_name }) => ({
              label: [salesman_id, salesman_name].join(' - '),
              value: [salesman_id, salesman_name].join(' - '),
            })),
            sales_org: result.data.splice(0, 1).map(({ sales_org_id, sales_org_name }) => ({
              label: [sales_org_id, sales_org_name].join(' - '),
              value: [sales_org_id, sales_org_name].join(' - '),
            })),
            branch: result.data.splice(0, 1).map(({ branch_id, branch_name }) => ({
              label: [branch_id, branch_name].join(' - '),
              value: [branch_id, branch_name].join(' - '),
            })),
          }
          setOptionsSalesman(newOptions.salesman)
          setOptionsSalesOrg(newOptions.sales_org)
          setOptionsBranch(newOptions.branch)
          onChangeForm('ship_to_id', dataForm?.customer_id)
          if (fetching === 'customer') {
            onChangeForm('sales_org_id', newOptions.sales_org[0].value)
            onChangeForm('branch_id', newOptions.branch[0].value)
            onChangeForm('salesman_id', newOptions.salesman[0].value)
          }

          stopProcess()
          stopFetching()
        })
        .catch(() => {
          stopProcess()
          stopFetching()
        })
    }
  }, [fetching])

  React.useEffect(() => {
    const requiredFields = [
      dataForm?.branch_id,
      dataForm?.order_type_id,
      dataForm?.customer_id,
      dataForm?.ship_to_id,
      dataForm?.salesman_id,
      dataForm?.sales_org_id,
    ]
    const fullFilled = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const haveItems = tableProduct.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    runProcess('Wait for get order type')
    async function api() {
      await getDocTypeByCategory('B')
        .then((result) =>
          result.data.map(({ id, name }) => ({
            label: [id, name.split('-').join(' - ')].join(' - '),
            value: [id, name.split('-').join(' - ')].join(' - '),
          })),
        )
        .then((data) => {
          onChangeForm('order_type_id', data.find(({ value }) => value.includes('ZQP1'))?.value)
          setOptionsOrderType(data)
        })
    }
    api()
      .then(() => stopProcess())
      .catch(() => stopProcess())
  }, [])

  return (
    <pageCtx.getProvider
      value={{
        state: {
          ...pageCtx.state,
          tableProduct,
        },
        handler: pageCtx.handler,
      }}
    >
      {props.children}
    </pageCtx.getProvider>
  )
}
