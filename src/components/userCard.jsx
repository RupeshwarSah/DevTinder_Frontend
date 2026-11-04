import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export default function UserCard({ user, isPreview = false }) {
  const name = `${user.firstName} ${user.lastName || ""}`.trim();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleRequest = async (status, _id) => {
    try {
      setError("");

      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );

      // console.log(res);
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error(err);
      setError("Unable to process your request. Please try again.");
    }
  };

  return (
    <article className="card w-full max-w-96 overflow-hidden bg-base-100 shadow-sm">
      <figure className="aspect-square bg-base-200">
        <img
          src={user.photoUrl}
          alt={`Profile photo of ${name}`}
          className="size-full object-cover"
        />
      </figure>

      <div className="card-body wrap-break-word">
        <h1 className="card-title">{name}</h1>

        <p>
          {user.age} years old · {user.gender}
        </p>

        <p>{user.about}</p>

        <div className="card-actions mt-3 justify-end">
          <button
            type="button"
            disabled={isPreview}
            onClick={() => handleRequest("ignored", user._id)}
            className="btn border-pink-700 bg-pink-700 text-white hover:border-pink-800 hover:bg-pink-800"
          >
            Ignore
          </button>

          <button
            type="button"
            disabled={isPreview}
            onClick={() => handleRequest("interested", user._id)}
            className="btn btn-primary"
          >
            Interested
          </button>
        </div>

        {error && (
          <div role="alert" className="alert alert-error mt-3 text-sm">
            <span>{error}</span>
          </div>
        )}

        {isPreview && (
          <p className="text-xs text-base-content/70">
            Preview only · Connection actions are disabled.
          </p>
        )}
      </div>
    </article>
  );
}
