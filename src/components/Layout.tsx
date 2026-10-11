import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShieldCheck, Truck, X } from 'lucide-react'
import { BUSINESS_CONFIG } from '../lib/config'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/booking', label: 'Book now' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7A15D] bg-[#C7A15D]/10 text-sm font-semibold text-[#E7C98E]">
            {BUSINESS_CONFIG.logoText}
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[0.18em] text-white">{BUSINESS_CONFIG.name}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${isActive ? 'text-[#E7C98E]' : 'hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/admin-access" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-[#C7A15D] hover:text-[#E7C98E]">
            Admin
          </Link>
          <Link to="/booking" className="rounded-full border border-[#C7A15D] px-4 py-2 text-sm font-medium text-[#E7C98E] transition hover:bg-[#C7A15D]/10">
            Book appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 p-2 text-stone-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-stone-950 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-stone-200">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="py-1">
                {item.label}
              </NavLink>
            ))}
            <Link to="/admin-access" onClick={() => setOpen(false)} className="py-1 text-[#E7C98E]">
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-stone-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7A15D] bg-[#C7A15D]/10 text-sm font-semibold text-[#E7C98E]">
              {BUSINESS_CONFIG.logoText}
            </div>
            <div className="text-lg font-semibold tracking-[0.18em] text-white">{BUSINESS_CONFIG.name}</div>
          </div>
          <p className="text-sm text-stone-400">Luxury paint correction, ceramic protection, and interior detailing services for discerning drivers.</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E7C98E]">Explore</h3>
          <ul className="space-y-2 text-sm text-stone-300">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E7C98E]">Visit</h3>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{BUSINESS_CONFIG.address}</li>
            <li>{BUSINESS_CONFIG.hours}</li>
            <li>{BUSINESS_CONFIG.phone}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E7C98E]">Why clients choose us</h3>
          <div className="space-y-3 text-sm text-stone-300">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#E7C98E]" /> Detail-driven finish</div>
            <div className="flex items-center gap-2"><Truck size={16} className="text-[#E7C98E]" /> Mobile and in-studio options</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-stone-500">
        © 2025 {BUSINESS_CONFIG.name}. Premium detailing for clients in the USA and India.
      </div>
    </footer>
  )
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-stone-950 text-stone-100">{children}</main>
}
