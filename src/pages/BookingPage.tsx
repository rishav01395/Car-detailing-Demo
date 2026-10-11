import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarRange, CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { BUSINESS_CONFIG, SERVICE_CATALOG } from '../lib/config'
import { bookingSchema } from '../schemas/forms'
import { formatCurrency, makeReference, readStoredBookings, saveStoredBookings } from '../lib/storage'
import type { Booking } from '../types'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState('')

  const defaultServiceId = useMemo(() => {
    const queryService = searchParams.get('service')
    const match = SERVICE_CATALOG.find((item) => item.slug === queryService)
    return match?.id ?? SERVICE_CATALOG[0]?.id ?? ''
  }, [searchParams])

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: defaultServiceId,
      preferredDate: '',
      preferredTime: '',
      message: '',
    },
  })

  useEffect(() => {
    if (defaultServiceId) setValue('serviceId', defaultServiceId)
  }, [defaultServiceId, setValue])

  const onSubmit = (values: any) => {
    const existing = readStoredBookings()
    const service = SERVICE_CATALOG.find((item) => item.id === values.serviceId)
    if (!service) {
      setError('Selected service is invalid.')
      return
    }

    const duplicate = existing.some((booking) =>
      booking.email.toLowerCase() === values.email.toLowerCase() &&
      booking.vehicle.toLowerCase() === values.vehicle.toLowerCase() &&
      booking.preferredDate === values.preferredDate &&
      booking.serviceId === values.serviceId,
    )

    if (duplicate) {
      setError('A booking with the same details is already pending for review.')
      return
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      customerName: values.customerName,
      email: values.email,
      phone: values.phone,
      vehicle: values.vehicle,
      serviceId: values.serviceId,
      serviceName: service.name,
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
      message: values.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reference: makeReference('BOOK'),
    }

    saveStoredBookings([booking, ...existing])
    setSuccess(`Booking request received. Your reference is ${booking.reference}.`)
    setError('')
    reset({ serviceId: defaultServiceId, preferredDate: '', preferredTime: '', message: '' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Booking</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Schedule your detailing appointment</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-[28px] border border-white/10 bg-stone-900 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-stone-300">Customer name</label>
              <input {...register('customerName')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.customerName && <p className="mt-1 text-sm text-red-400">{String(errors.customerName.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Email</label>
              <input type="email" {...register('email')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.email && <p className="mt-1 text-sm text-red-400">{String(errors.email.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Phone with country code</label>
              <input {...register('phone')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" placeholder="+1 415 555 0138" />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{String(errors.phone.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Vehicle make and model</label>
              <input {...register('vehicle')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" placeholder="BMW M3, Hyundai Creta" />
              {errors.vehicle && <p className="mt-1 text-sm text-red-400">{String(errors.vehicle.message)}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-stone-300">Selected service</label>
              <select {...register('serviceId')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]">
                {SERVICE_CATALOG.map((service) => (
                  <option key={service.id} value={service.id}>{service.name} — {formatCurrency(service.startingPrice, BUSINESS_CONFIG.currency)}</option>
                ))}
              </select>
              {errors.serviceId && <p className="mt-1 text-sm text-red-400">{String(errors.serviceId.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Preferred date</label>
              <input type="date" {...register('preferredDate')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.preferredDate && <p className="mt-1 text-sm text-red-400">{String(errors.preferredDate.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Preferred time</label>
              <input type="time" {...register('preferredTime')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.preferredTime && <p className="mt-1 text-sm text-red-400">{String(errors.preferredTime.message)}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-stone-300">Message (optional)</label>
              <textarea {...register('message')} rows={4} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.message && <p className="mt-1 text-sm text-red-400">{String(errors.message.message)}</p>}
            </div>
          </div>

          {error && <div className="mt-4 text-sm text-red-400">{error}</div>}
          {success && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-300">
              <CheckCircle2 className="mt-0.5" size={18} />
              <div>{success}</div>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-5 py-3 text-sm font-medium text-stone-950 disabled:opacity-60">
            <CalendarRange size={16} /> {isSubmitting ? 'Submitting...' : 'Submit booking'}
          </button>
        </form>

        <aside className="rounded-[28px] border border-[#C7A15D]/30 bg-gradient-to-br from-stone-900 to-stone-950 p-6">
          <h2 className="text-2xl font-semibold text-white">Why book with us</h2>
          <ul className="mt-6 space-y-4 text-stone-300">
            <li>• New enquiries start with pending review before owner approval.</li>
            <li>• Clear reference numbers for status tracking.</li>
            <li>• Premium detailing packages for luxury and family vehicles.</li>
            <li>• Transparent support via email and WhatsApp.</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
