import { useState } from 'react'

const storageKey = 'devtinder-theme'

function readSavedTheme() {
  try {
    return localStorage.getItem(storageKey) === 'dark'
  } catch {
    return false
  }
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(readSavedTheme)

  function changeTheme(event) {
    const checked = event.target.checked
    setIsDark(checked)
    try {
      localStorage.setItem(storageKey, checked ? 'dark' : 'light')
    } catch {
      // The daisyUI controller still works when browser storage is unavailable.
    }
  }

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle" title="Toggle dark theme">
      <input type="checkbox" className="theme-controller" value="dark"
        aria-label="Dark theme" checked={isDark} onChange={changeTheme} />
      <svg className="swap-off size-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg className="swap-on size-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
      </svg>
    </label>
  )
}
