import { Link } from 'react-router'

export default function Profile() {
  return (
    <section className="card mx-auto max-w-2xl border border-base-300 bg-base-100">
      <div className="card-body items-center gap-5 p-8 text-center sm:p-12">
        <span className="badge badge-outline">Coming soon</span>
        <div aria-hidden="true" className="flex size-20 items-center justify-center rounded-full bg-base-200 font-mono text-3xl text-accent">{'{ }'}</div>
        <h1 className="text-3xl font-bold">Your story belongs here.</h1>
        <p className="max-w-md leading-relaxed text-base-content/70">This will be your space to share your skills, interests, and what you’re looking for in a connection.</p>
        <p className="text-sm text-base-content/60">Profile details will appear once account integration is ready. No user is currently signed in.</p>
        <Link to="/" className="btn btn-accent mt-3">Back to Home</Link>
      </div>
    </section>
  )
}
