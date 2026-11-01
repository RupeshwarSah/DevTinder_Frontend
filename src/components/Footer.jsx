import { Link } from 'react-router'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer footer-center border-t border-base-300 bg-base-100 p-8 text-base-content">
      <aside>
        <Link to="/" className="text-lg font-bold">DevTinder<span className="text-accent">.</span></Link>
        <p>A little shared curiosity. A new connection.</p>
        <p className="text-xs">Copyright © {currentYear} DevTinder. All rights reserved.</p>
      </aside>
      <nav aria-label="Footer navigation" className="grid grid-flow-col gap-5">
        <Link className="link link-hover" to="/">Home</Link>
        <Link className="link link-hover" to="/login">Login</Link>
        <Link className="link link-hover" to="/signup">Signup</Link>
        <Link className="link link-hover" to="/profile">Profile</Link>
      </nav>
    </footer>
  )
}
