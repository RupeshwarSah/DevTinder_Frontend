import { Link } from "react-router";

const features = [
  [
    "01",
    "Find your people",
    "Connect over the languages, ideas, and side projects that keep you curious.",
  ],
  [
    "02",
    "Make something together",
    "Meet a future collaborator, a coding buddy, or someone to trade ideas with.",
  ],
  [
    "03",
    "Go beyond the code",
    "Great connections start with a conversation. Bring your whole self.",
  ],
];

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="grid items-center gap-12 py-4 lg:grid-cols-2 lg:py-8">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-accent">
            Welcome to DevTinder
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Good code starts
            <br />
            with <span className="text-accent">great connections.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-base-content/70">
            A space for developers to meet, share what they love, and find their
            next meaningful connection.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="btn btn-accent">
              Create your account <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </div>
          <p className="mt-5 text-sm text-base-content/60">
            For the people behind the pull requests.
          </p>
        </div>
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-6 p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm text-base-content/60">
                connection.js
              </span>
              <span className="badge badge-accent badge-soft">
                Made for developers
              </span>
            </div>
            <div className="rounded-box bg-base-200 p-6 font-mono text-sm leading-8 sm:text-base">
              <p className="text-base-content/50">Your next connection</p>
              <p>
                <span className="text-accent">const</span> ingredients = [
              </p>
              <p className="pl-4">'shared curiosity',</p>
              <p className="pl-4">'a new perspective',</p>
              <p className="pl-4">'you'</p>
              <p>];</p>
            </div>
            <div>
              <h2 className="card-title">Different stacks. Common ground.</h2>
              <p className="mt-2 text-base-content/70">
                Your next chapter could start with a hello.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Why DevTinder" className="grid gap-5 md:grid-cols-3">
        {features.map(([number, title, description]) => (
          <article
            key={number}
            className="card border border-base-300 bg-base-100"
          >
            <div className="card-body p-6">
              <span className="mb-3 font-mono text-sm text-accent">
                {number} /
              </span>
              <h2 className="card-title text-lg">{title}</h2>
              <p className="leading-relaxed text-base-content/70">
                {description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
