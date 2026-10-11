export type Service = {
  id: string
  name: string
  slug: string
  description: string
  duration: string
  startingPrice: number
  monthlyPrice?: number
  image: string
  featured?: boolean
  active: boolean
  category: 'Exterior' | 'Interior' | 'Paint' | 'Protection' | 'Premium'
}

export type PackageTier = {
  id: string
  name: string
  description: string
  price: number
  badge?: string
  included: string[]
}

export type BookingStatus = 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected'

export type Booking = {
  id: string
  customerName: string
  email: string
  phone: string
  vehicle: string
  serviceId: string
  serviceName: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: BookingStatus
  createdAt: string
  updatedAt: string
  reference: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export type BusinessSettings = {
  name: string
  logoText: string
  currency: 'USD' | 'INR'
  locale: string
  timezone: string
  email: string
  phone: string
  address: string
  hours: string
  whatsapp: string
  instagram: string
  facebook: string
  theme: 'Black Gold' | 'Silver' | 'Classic'
}

export type GalleryItem = {
  id: string
  title: string
  category: string
  image: string
  alt: string
}

export type Testimonial = {
  name: string
  location: string
  quote: string
}

export type CustomerRecord = {
  id: string
  name: string
  email: string
  phone: string
  vehicle: string
  bookings: number
}

export type LegalNotice = {
  id: string
  text: string
}
