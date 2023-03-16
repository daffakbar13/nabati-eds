import { menuSales } from './menu-sales'
import { menuLogistic } from './menu-logistic'
import { PATH } from '../path'
import { menuSFA } from './menu-sfa'

export const setMenu = (path: string) => {
  if (path === PATH.HOME) return menuSales
  if (path === PATH.SALES) return menuSales
  if (path === PATH.LOGISTIC) return menuLogistic
  if (path === PATH.SFA) return menuSFA
  return menuSales
}
