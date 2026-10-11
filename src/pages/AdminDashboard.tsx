import { Bell, BriefcaseBusiness, CalendarDays, CircleDollarSign, LayoutDashboard, LogOut, MessageSquareText, Package, Settings, ShieldCheck, Users } from 'lucide-react'
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link, Navigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { BUSINESS_CONFIG, SERVICE_CATALOG } from '../lib/config'
import { readStoredBookings, readStoredMessages } from '../lib/storage'
import { getSupabaseFlagMessage, supabase } from '../lib/supabase'

const data = [
  { name: 'Jan', bookings: 16 },
  { name: 'Feb', bookings: 24 },
  { name: 'Mar', bookings: 28 },
  { name: 'Apr', bookings: 34 },
  { name: 'May', bookings: 40 },
  { name: 'Jun', bookings: 36 },
]

export default function AdminDashboard() {
  const [section, setSection] = useState('Overview')
  const bookings = readStoredBookings()
  const messages = readStoredMessages()

  const supabaseMessage = getSupabaseFlagMessage()
  const isAuthenticated = !!supabase && !supabaseMessage

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const totalRevenue = useMemo(
    () => bookings.filter((booking) => booking.status === 'completed').length * 450,
    [bookings],
  )

  const actions = [
    { label: 'Total bookings', value: String(bookings.length), icon: CalendarDays },
    { label: 'Pending bookings', value: String(bookings.filter((b) => b.status === 'pending').length), icon: BriefcaseBusiness },
    { label: 'Approved bookings', value: String(bookings.filter((b) => b.status === 'approved').length), icon: ShieldCheck },
    { label: 'Customer enquiries', value: String(messages.length), icon: MessageSquareText },
    { label: 'Revenue', value: `$${totalRevenue}`, icon: CircleDollarSign },
  ]

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-white/10 bg-stone-900 p-5 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7A15D] bg-[#C7A15D]/10 text-sm font-semibold text-[#E7C98E]">{BUSINESS_CONFIG.logoText}</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{BUSINESS_CONFIG.name}</div>
            </div>
          </div>
          <nav className="mt-8 space-y-2">
            {['Overview', 'Bookings', 'Services', 'Gallery', 'Customers', 'Enquiries', 'Settings', 'Profile'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSection(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
                  section === item ? 'bg-[#C7A15D]/10 text-[#E7C98E]' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                {item === 'Overview' && <LayoutDashboard size={16} />}
                {item === 'Bookings' && <CalendarDays size={16} />}
                {item === 'Services' && <Package size={16} />}
                {item === 'Gallery' && <Bell size={16} />}
                {item === 'Customers' && <Users size={16} />}
                {item === 'Enquiries' && <MessageSquareText size={16} />}
                {item === 'Settings' && <Settings size={16} />}
                {item === 'Profile' && <ShieldCheck size={16} />}
                {item}
              </button>
            ))}
          </nav>
          <button onClick={logout} type="button" className="mt-10 flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-3 text-sm text-stone-300 hover:border-[#C7A15D] hover:text-[#E7C98E]">
            <LogOut size={16} /> Logout
          </button>
        </aside>

        <div className="flex-1">
          <header className="mb-8 flex items-center justify-between rounded-[28px] border border-white/10 bg-stone-900 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E7C98E]">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{section}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#C7A15D]/30 bg-[#C7A15D]/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#E7C98E]">Owner</span>
              <Link to="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-stone-200">View site</Link>
            </div>
          </header>

          {section === 'Overview' && (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {actions.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-stone-900 p-5">
                    <div className="flex items-center justify-between text-sm text-stone-300">
                      <span>{label}</span>
                      <Icon className="text-[#E7C98E]" size={18} />
                    </div>
                    <div className="mt-4 text-3xl font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-[28px] border border-white/10 bg-stone-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Booking trends</h2>
                  <div className="mt-5 h-64 w-full">
                    <ResponsiveContainer>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis dataKey="name" stroke="#a1a1aa" />
                        <YAxis stroke="#a1a1aa" />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#C7A15D" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-stone-900 p-5">
                  <h2 className="text-xl font-semibold text-white">Recent bookings</h2>
                  <div className="mt-5 space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="rounded-2xl border border-white/10 bg-stone-950 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="font-medium text-white">{booking.customerName}</div>
                            <div className="text-xs text-stone-400">{booking.serviceName}</div>
                          </div>
                          <span className="rounded-full border border-[#C7A15D]/30 bg-[#C7A15D]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#E7C98E]">{booking.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {section === 'Bookings' && (
            <div className="rounded-[28px] border border-white/10 bg-stone-900 p-5">
              <h2 className="text-xl font-semibold text-white">Booking management</h2>
              <div className="mt-6 divide-y divide-white/10">
                {bookings.length === 0 ? (
                  <p className="py-4 text-stone-400">No bookings submitted yet.</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-medium text-white">{booking.customerName}</div>
                        <div className="text-sm text-stone-400">{booking.vehicle} • {booking.serviceName}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-stone-300">{booking.reference}</span>
                        <span className="rounded-full border border-[#C7A15D]/30 bg-[#C7A15D]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#E7C98E]">{booking.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {section === 'Services' && (
            <div className="rounded-[28px] border border-white/10 bg-stone-900 p-5">
              <h2 className="text-xl font-semibold text-white">Services catalog</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {SERVICE_CATALOG.map((service) => (
                  <div key={service.id} className="rounded-2xl border border-white/10 bg-stone-950 p-4">
                    <div className="font-medium text-white">{service.name}</div>
                    <div className="mt-2 text-sm text-stone-300">{service.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'Enquiries' && (
            <div className="rounded-[28px] border border-white/10 bg-stone-900 p-5">
              <h2 className="text-xl font-semibold text-white">Contact enquiries</h2>
              <div className="mt-6 divide-y divide-white/10">
                {messages.length === 0 ? <p className="py-4 text-stone-400">No contact enquiries received.</p> : messages.map((message) => (
                  <div key={message.id} className="py-4">
                    <div className="font-medium text-white">{message.name}</div>
                    <div className="text-sm text-stone-400">{message.subject}</div>
                    <div className="mt-2 text-sm text-stone-300">{message.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
