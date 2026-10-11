import type { BusinessSettings, PackageTier, Service, Testimonial } from '../types'

export const BUSINESS_CONFIG: BusinessSettings = {
  name: 'Elite Auto Detailing',
  logoText: 'EAD',
  currency: 'INR',
  locale: 'en-IN',
  timezone: 'Asia/Kolkata',
  email: 'hello@eliteautodetailing.in',
  phone: '+91 98765 43210',
  address: 'Andheri West, Mumbai, Maharashtra 400053',
  hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
  whatsapp: '+919876543210',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  theme: 'Black Gold',
}

export const SERVICE_CATALOG: Service[] = [
  {
    id: 'exterior-detailing',
    name: 'Exterior Detailing',
    slug: 'exterior-detailing',
    description: 'Hand wash, decontamination, paint-safe protection, wheel and tire detailing.',
    duration: '2-3 hours',
    startingPrice: 129,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Exterior',
    featured: true,
  },
  {
    id: 'interior-detailing',
    name: 'Interior Detailing',
    slug: 'interior-detailing',
    description: 'Deep interior refresh with steam treatment, leather care, and stain removal.',
    duration: '2-4 hours',
    startingPrice: 149,
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Interior',
    featured: true,
  },
  {
    id: 'paint-correction',
    name: 'Paint Correction',
    slug: 'paint-correction',
    description: 'Leveling and correction to restore clarity, gloss, and depth to painted surfaces.',
    duration: '1-2 days',
    startingPrice: 399,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Paint',
    featured: true,
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    slug: 'ceramic-coating',
    description: 'Hydrophobic ceramic protection with long-term gloss and durability.',
    duration: '1 day',
    startingPrice: 699,
    image:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Protection',
    featured: true,
  },
  {
    id: 'full-detailing',
    name: 'Full Detailing',
    slug: 'full-detailing',
    description: 'Complete paint, exterior, interior, and trim treatment for a showroom finish.',
    duration: '6-8 hours',
    startingPrice: 299,
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Premium',
    featured: true,
  },
  {
    id: 'premium-polishing',
    name: 'Premium Polishing',
    slug: 'premium-polishing',
    description: 'Precision polishing to enhance depth, remove light defects, and maximize shine.',
    duration: '3-5 hours',
    startingPrice: 229,
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80',
    active: true,
    category: 'Premium',
    featured: true,
  },
]

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'express',
    name: 'Express Care',
    description: 'Fast refresh for weekly upkeep and silky finishing touch.',
    price: 129,
    badge: 'Best for routine care',
    included: ['Exterior wash', 'Wheel & tire detail', 'Interior vacuum', 'Glass cleaning'],
  },
  {
    id: 'signature',
    name: 'Signature Detail',
    description: 'Our most popular package for spotless presentation and premium finish.',
    price: 299,
    badge: 'Most popular',
    included: ['Full exterior detail', 'Interior deep clean', 'Leather conditioning', 'Paint sealant'],
  },
  {
    id: 'elite',
    name: 'Elite Protection',
    description: 'Comprehensive protection and correction package for discerning owners.',
    price: 699,
    badge: 'Premium protection',
    included: ['Paint correction', 'Ceramic coating', 'Engine bay detail', 'Interior premium care'],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya P.',
    location: 'Bengaluru, India',
    quote: 'The finish was showroom-level. Every surface looked and felt freshly restored.'
  },
  {
    name: 'Marcus H.',
    location: 'Austin, Texas',
    quote: 'Professional service, clear communication, and a noticeably deeper gloss after the detail.'
  },
  {
    name: 'Ritika G.',
    location: 'Delhi, India',
    quote: 'They did a full interior and ceramic coat on my SUV. It still looks premium months later.'
  },
]

export const FAQ_ITEMS = [
  { question: 'How long does a full detailing service take?', answer: 'Most full detailing packages take between 6 and 8 hours, depending on the condition of the vehicle and selected add-ons.' },
  { question: 'Do you offer paint correction and ceramic coating?', answer: 'Yes. These are available as standalone services or bundled into premium packages.' },
  { question: 'Can I book a weekend appointment?', answer: 'Weekend slots are available when booked in advance; we recommend reserving at least 5-7 days early for peak periods.' },
  { question: 'Do you work on premium and luxury vehicles?', answer: 'Absolutely. We handle premium, luxury, electric, SUVs, and performance vehicles with tailored detailing approaches.' },
]

export const BUSINESS_STATS = [
  { value: '3.5K+', label: 'Vehicles detailed' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '12+', label: 'Years of expertise' },
  { value: '48 hrs', label: 'Fast turnaround' },
]

export const DEFAULT_GALLERY = [
  { id: 'g1', title: 'Luxury coupe detail', category: 'Exterior', image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80', alt: 'Luxury coupe after exterior detail' },
  { id: 'g2', title: 'Leather interior refresh', category: 'Interior', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80', alt: 'Car interior leather and trim details' },
  { id: 'g3', title: 'Paint correction finish', category: 'Paint', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80', alt: 'Paint correction on a vehicle' },
  { id: 'g4', title: 'Ceramic protection gloss', category: 'Protection', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80', alt: 'Ceramic coated car under sunlight' },
]

export const ADMIN_NAV_ITEMS = [
  'Overview',
  'Bookings',
  'Services',
  'Gallery',
  'Customers',
  'Enquiries',
  'Settings',
  'Profile',
]

export const SITE_URL = 'http://localhost:5173'
