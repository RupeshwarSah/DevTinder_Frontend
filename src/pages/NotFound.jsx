import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="py-12 text-center">
      <p className="font-mono text-7xl font-bold text-accent">404</p>
      <h1 className="mt-6 text-3xl font-bold">This connection went missing.</h1>
      <p className="mt-4 text-base-content/70">We couldn’t find that page. Let’s get you back to familiar ground.</p>
      <Link to="/" className="btn btn-accent mt-8">Back to Home</Link>
    </section>
  )
}
