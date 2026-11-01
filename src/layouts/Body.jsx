import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Body() {
  return (
    <div className="flex min-h-dvh flex-col bg-base-200 text-base-content">
      <a href="#main-content" className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:z-50">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 lg:py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
