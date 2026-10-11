export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-20 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-stone-300">The page you requested does not exist or may have moved.</p>
      </div>
    </div>
  )
}
