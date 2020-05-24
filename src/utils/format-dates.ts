import i18n from '@Main/i18n'

function formatDateNumbers(number: number) {
  return number < 10 ? '0' + number : number
}

export function formatDateToDisplay(inputDate: string) {
  console.log(i18n.language)
  const date = new Date(inputDate)
  const monthNames = [
    i18n.t('MonthNames.January'),
    i18n.t('MonthNames.February'),
    i18n.t('MonthNames.March'),
    i18n.t('MonthNames.April'),
    i18n.t('MonthNames.May'),
    i18n.t('MonthNames.June'),
    i18n.t('MonthNames.July'),
    i18n.t('MonthNames.August'),
    i18n.t('MonthNames.September'),
    i18n.t('MonthNames.October'),
    i18n.t('MonthNames.November'),
    i18n.t('MonthNames.December'),
  ]
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  const hours = formatDateNumbers(date.getHours())
  const minutes = formatDateNumbers(date.getMinutes())

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes
}

export function formatDateToCalendar(inputDate: Date, actionDates?: number) {
  const date = inputDate
  let year = date.getFullYear()
  let monthIndex = date.getMonth() + 1
  let day = date.getDate()
  if (actionDates) {
    const daysInCurrentMonth = new Date(year, monthIndex, 0).getDate()
    const previousYear = monthIndex === 1 ? year - 1 : year
    const previousMonth = monthIndex === 1 ? 12 : monthIndex - 1
    const daysInPreviousMonth = new Date(previousYear, previousMonth, 0).getDate()
    day += actionDates
    if (day > daysInCurrentMonth) {
      day = day - daysInCurrentMonth
      monthIndex += 1
    } else if (day <= 0) {
      day = daysInPreviousMonth + day
      monthIndex = previousMonth
      if (monthIndex === 12) {
        year = year - 1
      }
    }
  }
  return year + '-' + formatDateNumbers(monthIndex) + '-' + formatDateNumbers(day)
}
