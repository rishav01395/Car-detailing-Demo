import { Check } from 'lucide-react'
import { PACKAGE_TIERS } from '../lib/config'
import { formatCurrency } from '../lib/storage'

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Pricing</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Luxury packages designed for every vehicle and lifestyle</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {PACKAGE_TIERS.map((tier) => (
          <div key={tier.id} className="rounded-[28px] border border-white/10 bg-stone-900 p-8">
            {tier.badge && (
              <div className="mb-5 inline-flex rounded-full border border-[#C7A15D]/40 bg-[#C7A15D]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#E7C98E]">
                {tier.badge}
              </div>
            )}
            <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
            <p className="mt-3 text-sm text-stone-300">{tier.description}</p>
            <div className="mt-8 text-4xl font-bold text-[#E7C98E]">{formatCurrency(tier.price)}</div>
            <ul className="mt-8 space-y-4 text-sm text-stone-200">
              {tier.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 text-[#E7C98E]" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
