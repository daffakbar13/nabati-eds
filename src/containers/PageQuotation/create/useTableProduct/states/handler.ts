/* eslint-disable camelcase */
import { getPricingByCompany } from 'src/api/master-data';
import { baseReducer } from './reducer';

export function baseHandler(
    state: Parameters<typeof baseReducer>['0'],
    dispatch: (args: Parameters<typeof baseReducer>['1']) => void,
) {
    function getAllProduct(funcApi: () => Promise<any>) {
        getPricingByCompany()
            .then((response) => {
                const { data } = response
                const now = new Date().toISOString()
                const payload = [...data]
                    .filter(({ valid_from, valid_to }) => now > valid_from && now < valid_to)
                    .map((obj) => ({ ...obj, booked: false, bookByIndex: '' }))
                dispatch({
                    type: 'allProduct',
                    payload,
                })
            })
            .catch(() => {
                dispatch({
                    type: 'allProduct',
                    payload: [],
                })
            })
    }
    function bookingProduct(product_id: string, type: 'booking' | 'unBooking', index: number) {
        const allProduct = [...state.allProduct]
        if (allProduct.length > 0) {
            const getUnBookedUom = allProduct
                .filter((p) => p.product_id === product_id && !p.booked)
                .map((p) => p.uom_id)
            const payload = allProduct.map((p) => {
                if (p.product_id === product_id && getUnBookedUom[0] === p.uom_id) {
                    return { ...p, booked: type === 'booking', bookByIndex: index }
                }
                return p
            })
            dispatch({
                type: 'allProduct',
                payload,
            })
        }
    }
    function getOptionsUom(index: number) {
        const allProduct = [...state.allProduct]
        const { product_id } = state.data[index]
        if (product_id !== '') {
            const optionsUom = allProduct
                .filter((p) => p.product_id === product_id && (p.bookedByIndex === index || !p.booked))
        }
    }
}