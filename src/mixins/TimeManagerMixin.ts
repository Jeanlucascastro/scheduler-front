
export interface TimeManagerMixin {
  getToday: () => Promise<string>,
  formatDate: (date: Date) => string,
  getTomorrow: () => Promise<string>,
}

export const useTimeManagerMixin = (): TimeManagerMixin => {
  const getToday = async () => {
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0]
  }

  const getTomorrow = async () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    return currentDate.toISOString().split('T')[0]
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return { getToday, formatDate, getTomorrow }
}
