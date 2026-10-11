import { ArrowRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminShortcutPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20 text-center">
      <div className="rounded-[30px] border border-white/10 bg-stone-900 p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#C7A15D] bg-[#C7A15D]/10 text-[#E7C98E]">
          <LockKeyhole size={28} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Admin access</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Owner dashboard</h1>
        <p className="mt-4 max-w-lg text-stone-300">Login to manage bookings, service packages, customer enquiries, and business settings.</p>
        <Link to="/login" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-6 py-3 font-medium text-stone-950">
          Open login <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
