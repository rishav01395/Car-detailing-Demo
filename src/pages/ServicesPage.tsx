import { ArrowRight, Clock3, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS_CONFIG, SERVICE_CATALOG } from '../lib/config'
import { formatCurrency } from '../lib/storage'

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Our services</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Premium detailing services tailored to your vehicle</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {SERVICE_CATALOG.map((service) => (
          <div key={service.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-stone-900">
            <img src={service.image} alt={service.name} className="h-64 w-full object-cover" />
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#C7A15D]/40 bg-[#C7A15D]/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#E7C98E]">
                  {service.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-stone-300"><Star size={14} className="fill-[#E7C98E] text-[#E7C98E]" /> Premium</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
              <p className="mt-4 text-sm leading-6 text-stone-300">{service.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-stone-300">
                <span className="flex items-center gap-2"><Clock3 size={16} className="text-[#E7C98E]" /> {service.duration}</span>
                <span className="text-2xl font-semibold text-[#E7C98E]">{formatCurrency(service.startingPrice, BUSINESS_CONFIG.currency)}</span>
              </div>
              <Link to={`/booking?service=${service.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-[#D8B777]">
                Book this service <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
