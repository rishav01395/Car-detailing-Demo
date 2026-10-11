import { z } from 'zod'

export const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(8, 'Phone number is required'),
  vehicle: z.string().min(2, 'Vehicle details are required'),
  serviceId: z.string().min(1, 'Please choose a service'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  message: z.string().max(500).optional().or(z.literal('')),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(8, 'Phone is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please write a short message'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
