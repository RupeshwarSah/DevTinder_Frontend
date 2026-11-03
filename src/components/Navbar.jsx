import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";

const links = [
  ["/", "Home"],
  ["/login", "Login"],
  ["/signup", "Signup"],
  ["/profile", "Profile"],
];

function closeDropdown(event) {
  event.currentTarget.closest("details").open = false;
}

function dismissWithEscape(event) {
  if (event.key === "Escape") {
    event.currentTarget.open = false;
    event.currentTarget.querySelector("summary").focus();
  }
}

function NavigationLinks({ onNavigate }) {
  return links.map(([to, label]) => (
    <li key={to}>
      <NavLink
        to={to}
        end={to === "/"}
        onClick={onNavigate}
        className={({ isActive }) => (isActive ? "menu-active" : "")}
      >
        {label}
      </NavLink>
    </li>
  ));
}

export default function Navbar() {
  const user = useSelector((store) => store.user);

  const firstLetter = user?.firstName?.charAt(0).toUpperCase() || "G";

  return (
    <header className="border-b border-base-300 bg-base-100">
      <nav
        aria-label="Main navigation"
        className="navbar mx-auto max-w-screen-2xl flex-wrap gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-6 lg:px-8"
      >
        <div className="navbar-start w-auto flex-1 gap-1 sm:gap-3">
          <details
            name="navbar-dropdown"
            className="dropdown lg:hidden"
            onKeyDown={dismissWithEscape}
          >
            <summary
              className="btn btn-ghost btn-square"
              aria-label="Toggle navigation menu"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <ul className="menu dropdown-content z-20 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              <NavigationLinks onNavigate={closeDropdown} />
            </ul>
          </details>
          <Link
            to="/"
            className="btn btn-ghost gap-2 px-2 text-lg font-bold tracking-tight"
          >
            <span className="text-accent" aria-hidden="true">
              {"</>"}
            </span>{" "}
            DevTinder
          </Link>
          <ThemeToggle />
        </div>
        <div className="navbar-end w-full gap-3 sm:w-auto">
          <ul className="menu menu-horizontal hidden gap-1 lg:flex">
            <NavigationLinks />
          </ul>
          <Link to="/signup" className="btn btn-accent btn-sm sm:btn-md">
            Get started <span aria-hidden="true">↗</span>
          </Link>
          <details
            name="navbar-dropdown"
            className="dropdown dropdown-end"
            onKeyDown={dismissWithEscape}
          >
            <summary
              className="btn btn-ghost btn-circle avatar avatar-placeholder"
              aria-label="Open guest profile menu"
            >
              <div className="w-10 rounded-full bg-base-200 text-base-content ring-1 ring-base-300">
                <span className="text-sm font-semibold" aria-hidden="true">
                  {firstLetter}
                </span>
              </div>
            </summary>
            <ul className="menu dropdown-content z-20 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              <li className="menu-title">Guest · Account preview</li>
              <li>
                <Link to="/profile" onClick={closeDropdown}>
                  Profile
                </Link>
              </li>
              <li>
                <button type="button" disabled>
                  Settings · Coming soon
                </button>
              </li>
              <li>
                <button type="button" disabled>
                  Logout · Not signed in
                </button>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
