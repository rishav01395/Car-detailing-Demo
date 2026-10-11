import { ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'

const values = [
  { icon: ShieldCheck, title: 'Integrity', text: 'Transparent service, honest recommendations, and no-pressure pricing.' },
  { icon: Sparkles, title: 'Craftsmanship', text: 'Precision detailing methods that bring depth, gloss, and clean finish to every finish.' },
  { icon: Trophy, title: 'Results', text: 'Consistent premium outcomes that make your vehicle feel new again.' },
  { icon: Users, title: 'Care', text: 'Friendly service and personalized advice for every owner and vehicle type.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">About us</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Detailing is our craft, and quality is our promise.</h1>
          <p className="mt-6 text-stone-300">
            Elite Auto Detailing brings together high-end detailing expertise, premium products, and a customer-first experience designed for modern car owners. We work with premium vehicles, family cars, luxury SUVs, and daily drivers alike.
          </p>
          <p className="mt-4 text-stone-300">
            Our focus is simple: preserve paint, elevate interior comfort, and deliver long-lasting finishes that stand out on the road and at a glance.
          </p>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-stone-900">
          <img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80" alt="Detailing team and premium car" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[24px] border border-white/10 bg-stone-900 p-6">
            <div className="inline-flex rounded-full bg-[#C7A15D]/10 p-3 text-[#E7C98E]">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm text-stone-300">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Our team</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Experts focused on precision and presentation</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: 'Rafael M.', role: 'Lead Detail Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80' },
            { name: 'Priya N.', role: 'Interior Care Expert', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80' },
            { name: 'Daniel K.', role: 'Paint Correction Artist', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80' },
          ].map((member) => (
            <div key={member.name} className="overflow-hidden rounded-[28px] border border-white/10 bg-stone-900">
              <img src={member.image} alt={member.name} className="h-80 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-2 text-sm text-[#E7C98E]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
