import { useState } from 'react'
import { DEFAULT_GALLERY } from '../lib/config'

const filters = ['All', 'Exterior', 'Interior', 'Paint', 'Protection']

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const items = activeFilter === 'All' ? DEFAULT_GALLERY : DEFAULT_GALLERY.filter((item) => item.category === activeFilter)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Gallery</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">A closer look at our craftsmanship</h1>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? 'border-[#C7A15D] bg-[#C7A15D]/10 text-[#E7C98E]'
                : 'border-white/10 bg-stone-900 text-stone-300 hover:border-[#C7A15D]/40'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-[28px] border border-white/10 bg-stone-900">
            <img src={item.image} alt={item.alt} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-[#E7C98E]">{item.category}</div>
              <h2 className="mt-3 text-xl font-semibold text-white">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
