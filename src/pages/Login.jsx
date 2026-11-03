import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Login() {
  const [emailId, setEmailid] = useState("rojesh@gmail.com");
  const [password, setPassword] = useState("Rojesh@321");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(result.data));
      console.log(result.data);
      return navigate("/feed");
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  return (
    <section className="card mx-auto max-w-md border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-7 sm:p-9">
        <p className="text-2xl font-semibold text-accent">Login</p>
        <form
          className="mt-3 space-y-4"
          aria-describedby="login-preview"
          onSubmit={handleLogin}
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
          <button className="btn btn-accent w-full" type="submit">
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
