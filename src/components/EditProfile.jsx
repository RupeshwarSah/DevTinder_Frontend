import { useEffect, useRef, useState } from "react";

import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function EditProfile({ user }) {
  const [draft, setDraft] = useState(() => ({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    photoUrl: user.photoUrl ?? "",
    age: String(user.age ?? ""),
    gender: user.gender ?? "",
    about: user.about ?? "",
  }));
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function edit(event) {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
    setError("");
    setShowToast(false);
  }

  const dispatch = useDispatch();

  const editProfile = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          ...draft,
          age: Number(draft.age),
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res);
      dispatch(addUser(res.data.data));
    } catch (error) {
      // console.log(error.response?.data?.error);
      setError(error.response?.data?.error);
    }

    clearTimeout(timer.current);
    setShowToast(true);
    timer.current = setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="mx-auto grid max-w-4xl items-start gap-8 lg:grid-cols-2">
      <form
        onSubmit={editProfile}
        className="card min-w-0 border border-base-300 bg-base-100 shadow-sm"
        noValidate
      >
        <div className="card-body gap-4">
          <h1 className="card-title text-2xl">Edit Profile</h1>
          {[
            ["firstName", "First Name", "text"],
            ["lastName", "Last Name", "text"],
            ["photoUrl", "Photo URL", "url"],
            ["age", "Age", "number"],
          ].map(([name, label, type]) => (
            <label key={name} className="fieldset">
              <span className="font-semibold">{label}</span>
              <input
                className="input w-full"
                name={name}
                type={type}
                value={draft[name]}
                onChange={edit}
                required={name === "firstName" || name === "age"}
                min={name === "age" ? 16 : undefined}
                max={name === "age" ? 100 : undefined}
              />
            </label>
          ))}
          <label className="fieldset">
            <span className="font-semibold">Gender</span>
            <select
              className="select w-full"
              name="gender"
              value={draft.gender}
              onChange={edit}
              required
            >
              <option value="" disabled>
                Select a gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </label>
          <label className="fieldset">
            <span className="font-semibold">About</span>
            <textarea
              className="textarea w-full"
              rows={3}
              name="about"
              value={draft.about}
              onChange={edit}
            />
          </label>
          <p className="text-sm text-base-content/70">
            Try your edits here. Changes last until you leave this page.
          </p>
          {error && (
            <div
              role="alert"
              className="alert alert-error alert-horizontal gap-2 px-3 py-2 text-sm"
            >
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m9 9 6 6m0-6-6 6" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <button type="submit" className="btn btn-accent">
            Save Profile
          </button>
        </div>
      </form>
      <section className="mx-auto w-full min-w-0 max-w-96 space-y-3">
        <h2 className="text-xl font-bold">Profile Preview</h2>
        <p className="text-sm text-base-content/70">
          This is how your profile will appear to other users.
        </p>
        <UserCard isPreview user={draft} />
      </section>
      {!error && showToast && (
        <div className="toast toast-end toast-bottom z-30">
          <div role="status" className="alert alert-success">
            Profile Edited successfully
          </div>
        </div>
      )}
    </div>
  );
}
