import i18n from '@Main/i18n'

export function formatMoney(money: number) {
  return money.toFixed(2) + ' ' + i18n.t('Common.Currency')
}
