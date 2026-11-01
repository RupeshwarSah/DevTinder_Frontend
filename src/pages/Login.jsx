import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  const [emailId, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("managing login");
  };

  return (
    <section className="card mx-auto max-w-md border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-7 sm:p-9">
        <p className="text-2xl font-semibold text-accent">Login</p>
        <form
          className="mt-3 space-y-4"
          aria-describedby="login-preview"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage("This is a preview. You have not been signed in.");
          }}
        >
          <div className="fieldset">
            <label htmlFor="email" className="fieldset-legend">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={emailId}
              onChange={(e) => setEmailid(e.target.value)}
              className="input w-full"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="fieldset">
            <label htmlFor="password" className="fieldset-legend">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              required
            />
          </div>
          <button
            className="btn btn-accent w-full"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          New here?{" "}
          <Link to="/signup" className="link font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
