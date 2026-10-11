import type { Booking, ContactMessage } from '../types'

const BOOKING_KEY = 'elite-auto-detailing-bookings'
const CONTACT_KEY = 'elite-auto-detailing-contact-messages'

export const readStoredBookings = (): Booking[] => {
  try {
    const value = localStorage.getItem(BOOKING_KEY)
    if (!value) return []
    return JSON.parse(value) as Booking[]
  } catch {
    return []
  }
}

export const saveStoredBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings))
}

export const readStoredMessages = (): ContactMessage[] => {
  try {
    const value = localStorage.getItem(CONTACT_KEY)
    if (!value) return []
    return JSON.parse(value) as ContactMessage[]
  } catch {
    return []
  }
}

export const saveStoredMessages = (messages: ContactMessage[]) => {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(messages))
}

export const formatCurrency = (value: number, currency: 'USD' | 'INR' = 'USD') =>
  new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const makeReference = (prefix: string) => {
  const stamp = Date.now().toString().slice(-6)
  return `${prefix}-${stamp}`.toUpperCase()
}
