import { useState } from 'react'
import { Link } from 'react-router'

export default function Signup() {
  const [message, setMessage] = useState('')
  return (
    <section className="card mx-auto max-w-xl border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-7 sm:p-9">
        <p className="text-sm font-semibold text-accent">YOUR NEXT CHAPTER</p>
        <h1 className="text-3xl font-bold">Find your kind of people.</h1>
        <p className="text-base-content/70">Start with a little about yourself.</p>
        <p id="signup-preview" className="mt-3 text-sm text-base-content/60">Form preview only. Account creation is not available yet.</p>
        <form className="mt-3 space-y-4" aria-describedby="signup-preview" onSubmit={(event) => { event.preventDefault(); setMessage('This is a preview. No account has been created or details saved.') }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="fieldset"><label htmlFor="first-name" className="fieldset-legend">First name</label><input id="first-name" name="firstName" autoComplete="given-name" className="input w-full" required /></div>
            <div className="fieldset"><label htmlFor="last-name" className="fieldset-legend">Last name</label><input id="last-name" name="lastName" autoComplete="family-name" className="input w-full" required /></div>
          </div>
          <div className="fieldset"><label htmlFor="signup-email" className="fieldset-legend">Email</label><input id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full" required /></div>
          <div className="fieldset"><label htmlFor="signup-password" className="fieldset-legend">Password</label><input id="signup-password" name="password" type="password" autoComplete="new-password" className="input w-full" required /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="fieldset"><label htmlFor="age" className="fieldset-legend">Age</label><input id="age" name="age" type="number" min="1" step="1" className="input w-full" required /></div>
            <div className="fieldset"><label htmlFor="gender" className="fieldset-legend">Gender</label><select id="gender" name="gender" defaultValue="" className="select w-full" required><option value="" disabled>Select an option</option><option value="woman">Woman</option><option value="man">Man</option><option value="nonbinary">Non-binary</option><option value="self-described">Another identity</option><option value="undisclosed">Prefer not to say</option></select></div>
          </div>
          <button type="submit" className="btn btn-accent w-full">Create account</button>
          <p role="status" className="text-sm">{message}</p>
        </form>
        <p className="mt-3 text-center">Already have an account? <Link to="/login" className="link font-semibold">Login</Link></p>
      </div>
    </section>
  )
}
