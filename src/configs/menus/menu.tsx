import { menuSales } from './menu-sales';
import { menuLogistic } from './menu-logistic';

export const setMenu = (str: string) => {
    if (str === '') return menuSales
    if (str === 'home') return menuSales
    if (str === 'sales') return menuSales
    if (str === 'logistic') return menuLogistic
    return menuSales
}