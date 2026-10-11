import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header, PageWrapper } from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminShortcutPage from './pages/AdminShortcutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-access" element={<AdminShortcutPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
