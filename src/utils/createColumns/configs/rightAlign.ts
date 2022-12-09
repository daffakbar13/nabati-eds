export const rightAlign = [
    'Total Amount',
    'Based Price',
    'Sub Total',
    'Gross',
    'Discount',
    'Disc 1',
    'Disc 2',
    'Disc 3',
    'Disc 4',
    'Net 1',
    'Net 2',
    'Net 3',
    'Net 4',
]

export function isRightAlign(title: unknown) {
    return typeof title === 'string' && rightAlign.includes(title)
}