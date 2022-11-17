/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createRequestIntraChannel } from 'src/api/request-intra-channel'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldBranchSupply } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'
import { getSloc } from 'src/api/request-intra-channel'

export default function PageCreateQuotation() {
    const now = new Date().toISOString()
    const [dataForm, setDataForm] = React.useState({})
    const [newQuotation, setNewQuotation] = React.useState()
    const [draftQuotation, setDraftQuotation] = React.useState()
    const [cancel, setCancel] = React.useState(false)
    const router = useRouter()
    const tableAddItems = useTableAddItem()
    const isCreatePage = router.asPath.split('/').reverse()[0] === 'create'
    const [fromCH, setFromCH] = React.useState('')
    const [toCH, setToCH] = React.useState('')
    const [fromsloc, setFromsloc] = React.useState('')
    const [toSloc, setToSloc] = React.useState('')
    const [oldCH, setOldCH] = React.useState('')
    const [allSloc, setAllScloc] = React.useState([])

    const initialValue = {
        document_type: 'ZINC',
        planned_gi_date: moment(now).format('YYYY-MM-DD'),
        suppl_branch_id: 'P100',
        receive_plant_id: 'P104',
        from_channel: 'MT',
        to_channel: 'GT',
        suppl_sloc_id: 'GS00',
        receive_sloc_id: 'BS00',
        status_id: '00',
        document_date: moment(now).format('YYYY-MM-DD'),
        posting_date: moment(now).format('YYYY-MM-DD'),
        remarks: '',
        items: tableAddItems.data,
    }

    const titlePage = useTitlePage(isCreatePage ? 'create' : 'edit')

    const onChangeForm = (form: string, value: any) => {
        setDataForm((old) => ({ ...old, ...{ [form]: value } }))
    }

    const onChangeBranch = (form: string, ch: any, branchid: any) => {
        const sloc = allSloc.filter(({ doc_type_id, branch_id }) =>
            branch_id == branchid && doc_type_id == 'ZINC')

        if (form == 'from') {
            setFromCH(ch);
            setFromsloc(sloc[0]?.sloc_id || '')
        } else {
            setToCH(ch);
            setToSloc(sloc[0]?.sloc_id || '')
        }
        setOldCH(ch)
    }

    React.useEffect(() => {
        getSloc({ id: "PP01" })
            .then((result) => setAllScloc(result.data))
    }, [])

    React.useEffect(() => {
        console.log(dataForm)
    }, [dataForm])

    React.useEffect(() => {
        onChangeForm('from_channel', fromCH)
        onChangeForm('to_channel', toCH)
        onChangeForm('suppl_sloc_id', fromsloc)
        onChangeForm('receive_sloc_id', toSloc)
    }, [fromCH, toCH, fromsloc, toSloc])

    return (
        <Col>
            <Text variant={'h4'}>{titlePage}</Text>
            <Spacer size={20} />
            <Card style={{ overflow: 'unset' }}>
                <Row justifyContent="space-between" reverse>
                    <Row gap="16px">
                        <Button size="big" variant="tertiary" onClick={() => { setCancel(true); console.log('cancel', cancel) }}>
                            Cancel
                        </Button>
                        <Button size="big" variant="primary" onClick={() => {
                            createRequestIntraChannel({ ...initialValue, ...dataForm })
                                .then((response) => setNewQuotation(response.data.id))
                                .catch((e) => console.log(e))
                        }}>
                            Submit
                        </Button>
                    </Row>
                </Row>
            </Card>
            <Spacer size={10} />
            <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
                        <DebounceSelect
                            type='select'
                            label="Supplying Branch"
                            required
                            fetchOptions={(search) => fieldBranchSupply(search, oldCH)}
                            onChange={(val: any) => {
                                onChangeForm('suppl_branch_id', val.label.split(' - ')[0])
                                onChangeBranch('from', val.key, val.value)
                            }}
                        />
                        <Input
                            type="text"
                            label="From Channel"
                            disabled
                            value={fromCH}
                        />
                        <Input
                            type="text"
                            label="From Sloc"
                            disabled
                            value={fromsloc}
                        />
                        <Input
                            type="text"
                            label="Header Text"
                            placeholder="Type here..."
                            onChange={(e: any) => {
                                onChangeForm('remarks', e.value)
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
                        <DebounceSelect
                            type='select'
                            label="Receiving Branch"
                            required
                            fetchOptions={(search) => fieldBranchSupply(search, oldCH)}
                            onChange={(val: any) => {
                                onChangeForm('receive_plant_id', val.label.split(' - ')[0])
                                onChangeBranch('to', val.key, val.value)
                            }}
                        />
                        <Input
                            type="text"
                            label="To Channel"
                            disabled
                            value={toCH}
                        />
                        <Input
                            type="text"
                            label="To Sloc"
                            disabled
                            value={toSloc}
                        />
                        <DatePickerInput
                            fullWidth
                            onChange={(val: any) => {
                                onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
                            }}
                            label="Document Date"
                            defaultValue={moment()}
                            format={'DD-MMM-YYYY'}
                            required
                        />
                        <DatePickerInput
                            fullWidth
                            onChange={(val: any) => {
                                onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
                            }}
                            label="Posting Date"
                            defaultValue={moment()}
                            format={'DD-MMM-YYYY'}
                            required
                        />
                    </div>
                </div>
                <Divider style={{ borderColor: '#AAAAAA' }} />
                <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
                    + Add Item
                </Button>
                <Spacer size={20} />
                <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
                    <Table
                        editable
                        data={tableAddItems.data}
                        columns={tableAddItems.columns}
                        loading={tableAddItems.loading}
                    />
                </div>
                {/* <TableEditable data={data} setData={setData} columns={useColumns()} /> */}
            </Card>
            {
                (newQuotation || draftQuotation || cancel)
                && <Popup>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Text
                            variant="headingSmall"
                            textAlign="center"
                            style={{ ...(!cancel && { color: 'green' }), fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
                        >
                            {cancel ? 'Confirm Cancellation' : 'Success'}
                        </Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        {cancel
                            ? 'Are you sure want to cancel? Change you made so far will not saved'
                            : <>
                                Request Number
                                <Typography.Text copyable> {newQuotation || draftQuotation}</Typography.Text>
                                has been
                            </>
                        }
                    </div>
                    {!cancel
                        && <div style={{ display: 'flex', justifyContent: 'center' }}>
                            successfully created
                        </div>
                    }
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                        {cancel
                            && <>
                                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                                    setCancel(false)
                                }}>
                                    No
                                </Button>
                                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                                    router.push(`${PATH.LOGISTIC}/request-intra-channel`)
                                }}>
                                    Yes
                                </Button>
                            </>
                        }
                        {newQuotation
                            && <>
                                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                                    router.push(`${PATH.LOGISTIC}/request-intra-channel`)
                                }}>
                                    OK
                                </Button>
                            </>
                        }
                    </div>
                </Popup>
            }
        </Col>
    )
}