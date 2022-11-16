import { Empty, Select } from 'antd';
import { Spin } from 'pink-lava-ui';
import { useEffect, useState } from 'react';
import { MASTER_DATA_TYPES } from './config';

interface Props {
    type: 'PLANT' | 'MATERIAL' | 'SLOC' // TO DO tambah lagi nanti..
    style?: any
}

export default function SelectMasterData({ type, style = {}, ...props }: Props) {
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                setLoading(true)
                const res = await MASTER_DATA_TYPES[type].api()
                const opt = MASTER_DATA_TYPES[type].responseHandler(res)
                setOptions(opt)
                setLoading(false)
            }
            fetchData()
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [type])

    return (
        <div id='masterDataPlant' style={{ ...style }}>
            <Select
                labelInValue
                allowClear
                showSearch
                loading={loading}
                notFoundContent={loading ? <Spin /> : <Empty />}
                optionFilterProp="children"
                size="large"
                placeholder={MASTER_DATA_TYPES[type].placeholder}
                getPopupContainer={() => document.getElementById('masterDataPlant')}
                filterOption={(input, option) => option.props.children
                    .toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{
                    display: 'grid',
                    border: '1px solid #AAAAAA',
                    borderRadius: 8,
                    width: '100%',
                    minHeight: 48,
                }}
                {...props}
            >
                {options.map((opt) => (<Select.Option value={opt.value} key={opt.key ?? opt.value}>
                    {opt.label}
                </Select.Option>))}
            </Select>
        </div >

    )
}
