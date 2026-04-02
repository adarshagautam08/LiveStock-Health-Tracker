import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🐄</span>
          <span className="font-semibold text-gray-900 text-lg tracking-tight">
            PashuSwasthya
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/vets"
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            Find a Vet
          </Link>
          <Link
            href="/admin/login"
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#e8f5ee] text-[#2D6A4F] text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] inline-block"></span>
            Free for all Nepali farmers
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-6 tracking-tight">
            Is your livestock
            <br />
            <span className="text-[#2D6A4F]">unwell?</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">
            Select your animal, describe the symptoms, and get an instant
            diagnosis with treatment recommendations — no vet visit needed.
          </p>

          {/* CTA Button */}
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2.5 bg-[#2D6A4F] hover:bg-[#235a3f] text-white font-medium px-8 py-3.5 rounded-xl transition text-base"
          >
            Start Diagnosis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          {/* Sub CTA */}
          <p className="text-sm text-gray-400 mt-4">
            No login required · Takes less than a minute
          </p>
        </div>
      </main>

      {/* Stats */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-900">5+</p>
            <p className="text-sm text-gray-500 mt-1">Animal types</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">20+</p>
            <p className="text-sm text-gray-500 mt-1">Diseases tracked</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">Free</p>
            <p className="text-sm text-gray-500 mt-1">Always</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-400 bg-[#f8f7f4]">
        PashuSwasthya — Livestock Health Tracker · Nepal
      </div>
    </div>
  )
}