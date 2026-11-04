import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [emailId, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      const res = await axios.post(
        BASE_URL + "signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age: Number(age),
          gender,
        },
        { withCredentials: true },
      );

      console.log(res.data);

      setSuccess(res.data.message || "Data stored successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);

      const message = err.response?.data?.message || err.response?.data?.error;

      setError(
        typeof message === "string"
          ? message
          : "Signup failed. Please try again.",
      );
    }
  };

  return (
    <section className="card mx-auto max-w-xl border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-7 sm:p-9">
        <h1 className="text-3xl font-bold">Signup</h1>
        <p className="text-base-content/70">
          Start with a little about yourself.
        </p>

        <form
          className="mt-3 space-y-4"
          aria-describedby="signup-preview"
          onSubmit={handleSignup}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="fieldset">
              <label htmlFor="first-name" className="fieldset-legend">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                autoComplete="given-name"
                className="input w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="fieldset">
              <label htmlFor="last-name" className="fieldset-legend">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                autoComplete="family-name"
                className="input w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="fieldset">
            <label htmlFor="signup-email" className="fieldset-legend">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="input w-full"
              value={emailId}
              onChange={(e) => setEmailid(e.target.value)}
              required
            />
          </div>

          <div className="fieldset">
            <label htmlFor="signup-password" className="fieldset-legend">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="fieldset">
              <label htmlFor="age" className="fieldset-legend">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                step="1"
                className="input w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="fieldset">
              <label htmlFor="gender" className="fieldset-legend">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="select w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="others">Prefer not to say</option>
              </select>
            </div>
          </div>

          {error && (
            <div role="alert" className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="btn btn-accent w-full">
            Create account
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="link font-semibold">
            Login
          </Link>
        </p>
      </div>

      {success && (
        <div className="toast toast-end toast-bottom z-50">
          <div role="status" className="alert alert-success">
            <span>{success}</span>
          </div>
        </div>
      )}
    </section>
  );
}
