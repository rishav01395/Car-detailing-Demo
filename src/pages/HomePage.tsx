import { ArrowRight, Check, ChevronRight, MapPin, ShieldCheck, Star, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BUSINESS_CONFIG, BUSINESS_STATS, DEFAULT_GALLERY, FAQ_ITEMS, SERVICE_CATALOG, TESTIMONIALS } from '../lib/config'
import { formatCurrency } from '../lib/storage'

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(199,161,93,0.18),_transparent_38%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-[#C7A15D]/40 bg-[#C7A15D]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#E7C98E]">
              Premium car care
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elevate every drive with a showroom-finish detail.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-stone-300">
              Elite Auto Detailing delivers premium paint correction, ceramic coatings, and interior refinishing for drivers who expect perfection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-6 py-3 font-medium text-stone-950 transition hover:bg-[#D8B777]">
                Book Appointment <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-[#C7A15D] hover:text-[#E7C98E]">
                Explore Services <ChevronRight size={18} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-stone-300">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#E7C98E]" /> Certified detail specialists</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-[#E7C98E]" /> Serving Mumbai and India-wide clients</div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[28px] border border-[#C7A15D]/30 bg-stone-900 p-2 shadow-[0_0_80px_rgba(199,161,93,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury car detailing"
                className="h-[560px] w-full rounded-[22px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-white/10 bg-stone-900/90 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3 text-[#E7C98E]">
                <Star className="fill-current" size={18} />
                <span className="text-sm font-medium text-white">4.9/5 customer satisfaction</span>
              </div>
              <p className="mt-2 text-sm text-stone-300">Trusted by premium car owners across major metro cities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Featured packages</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Detailing services built for premium finishes</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_CATALOG.map((service) => (
            <div key={service.id} className="overflow-hidden rounded-3xl border border-white/10 bg-stone-900">
              <img src={service.image} alt={service.name} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full border border-[#C7A15D]/40 bg-[#C7A15D]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#E7C98E]">
                    {service.category}
                  </span>
                  <span className="text-sm text-stone-300">{service.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-3 text-sm text-stone-300">{service.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-semibold text-[#E7C98E]">{formatCurrency(service.startingPrice, BUSINESS_CONFIG.currency)}</span>
                  <Link to={`/booking?service=${service.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#E7C98E]">
                    Book now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900/60 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Why choose us</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Luxury results with meticulous attention to detail.</h2>
            <div className="mt-8 space-y-5">
              {[
                'Paint-safe techniques and premium-grade products',
                'Certified care for luxury, sports, and family vehicles',
                'Transparent scheduling and communication',
                'Long-lasting protection that keeps your vehicle showroom-ready',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-stone-950/60 p-4">
                  <Check className="mt-0.5 text-[#E7C98E]" size={18} />
                  <p className="text-stone-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-[#C7A15D]/30 bg-stone-950 p-4">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Detailed premium car interior"
              className="h-full min-h-[300px] w-full rounded-[22px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Transformation</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Before-and-after excellence</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {DEFAULT_GALLERY.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-stone-900">
              <img src={item.image} alt={item.alt} className="h-72 w-full object-cover" />
              <div className="p-4 text-sm text-stone-300">{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Client feedback</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Trusted by owners who expect perfection</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-stone-950 p-6">
                <div className="mb-4 flex gap-1 text-[#E7C98E]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="fill-current" size={16} />
                  ))}
                </div>
                <p className="text-stone-200">“{testimonial.quote}”</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-stone-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Business stats</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Reliable results and long-term trust</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {BUSINESS_STATS.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-stone-900 p-6 text-center">
              <div className="text-3xl font-bold text-[#E7C98E]">{stat.value}</div>
              <div className="mt-2 text-sm text-stone-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900/70 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-stone-950 p-5">
                <div className="flex items-center justify-between gap-3 text-left">
                  <h3 className="text-lg font-medium text-white">{item.question}</h3>
                  <Sparkles className="text-[#E7C98E]" size={18} />
                </div>
                <p className="mt-3 text-stone-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#C7A15D]/30 bg-gradient-to-br from-stone-900 to-stone-950 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Contact us</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Book your premium detailing session today</h2>
              <p className="mt-4 max-w-xl text-stone-300">Tell us about your vehicle and preferred service. We’ll confirm the next available window and schedule a consultation.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-stone-950/70 p-6">
              <div className="text-sm text-stone-300">{BUSINESS_CONFIG.email}</div>
              <div className="mt-2 text-sm text-stone-300">{BUSINESS_CONFIG.phone}</div>
              <div className="mt-2 text-sm text-stone-300">{BUSINESS_CONFIG.address}</div>
              <Link to="/booking" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C7A15D] px-5 py-3 text-sm font-medium text-stone-950 hover:bg-[#D8B777]">
                Schedule now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
