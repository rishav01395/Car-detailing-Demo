import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { contactSchema } from '../schemas/forms'
import { BUSINESS_CONFIG } from '../lib/config'
import { readStoredMessages, saveStoredMessages } from '../lib/storage'
import { useState } from 'react'
import type { ContactMessage } from '../types'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = (values: any) => {
    const stored = readStoredMessages()
    const nextMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.subject,
      message: values.message,
      read: false,
      createdAt: new Date().toISOString(),
    }
    saveStoredMessages([nextMessage, ...stored])
    setSubmitted(true)
    setError('')
    reset()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Let’s plan your next detailing upgrade</h1>
          <div className="mt-8 space-y-6 text-stone-300">
            <div className="flex items-center gap-3"><Mail className="text-[#E7C98E]" size={18} /> {BUSINESS_CONFIG.email}</div>
            <div className="flex items-center gap-3"><Phone className="text-[#E7C98E]" size={18} /> {BUSINESS_CONFIG.phone}</div>
            <div className="flex items-center gap-3"><MapPin className="text-[#E7C98E]" size={18} /> {BUSINESS_CONFIG.address}</div>
          </div>
          {BUSINESS_CONFIG.whatsapp && (
            <a href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full border border-[#C7A15D] px-5 py-3 text-sm font-medium text-[#E7C98E]">
              WhatsApp us
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-[28px] border border-white/10 bg-stone-900 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-stone-300">Name</label>
              <input {...register('name')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.name && <p className="mt-1 text-sm text-red-400">{String(errors.name.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Email</label>
              <input {...register('email')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.email && <p className="mt-1 text-sm text-red-400">{String(errors.email.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Phone</label>
              <input {...register('phone')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{String(errors.phone.message)}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-stone-300">Subject</label>
              <input {...register('subject')} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
              {errors.subject && <p className="mt-1 text-sm text-red-400">{String(errors.subject.message)}</p>}
            </div>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-sm text-stone-300">Message</label>
            <textarea {...register('message')} rows={5} className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none focus:border-[#C7A15D]" />
            {errors.message && <p className="mt-1 text-sm text-red-400">{String(errors.message.message)}</p>}
          </div>
          {error && <div className="mt-4 text-sm text-red-400">{error}</div>}
          {submitted && <div className="mt-4 text-sm text-emerald-400">Your enquiry has been submitted successfully. We will review it promptly.</div>}
          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-5 py-3 text-sm font-medium text-stone-950 disabled:cursor-not-allowed disabled:opacity-60">
            <Send size={16} /> {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  )
}
