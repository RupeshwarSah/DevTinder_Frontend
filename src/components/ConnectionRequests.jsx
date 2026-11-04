import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setError("");

      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });

      //   console.log(res.data?.requests);
      dispatch(addRequests(res.data?.requests));
    } catch (err) {
      console.error(err);
      setError("Unable to load connection requests. Please try again.");
    }
  };

  const reviewRequest = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "request/review/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      },
    );
    // console.log(res);
    dispatch(removeRequests(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <section
      className="mx-auto w-full max-w-4xl"
      aria-labelledby="requests-title"
    >
      <header className="mb-8 border-b border-base-300 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            id="requests-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Connection Requests
          </h1>
          {requests && (
            <span className="badge badge-soft badge-accent">
              {requests.length} pending
            </span>
          )}
        </div>
        <p className="mt-2 text-base-content/75">
          Review developers who want to connect with you.
        </p>
      </header>

      {error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : requests == null ? (
        <p role="status" className="py-10 text-center text-base-content/70">
          Loading requests…
        </p>
      ) : requests.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">No pending requests</h2>
          <p className="mt-2 text-base-content/75">
            New connection requests will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => {
            const sender = request.fromUserId;
            const name =
              [sender.firstName, sender.lastName].filter(Boolean).join(" ") ||
              "Developer";
            const initials = [sender.firstName?.[0], sender.lastName?.[0]].join(
              "",
            );
            const details = [
              sender.age != null && `${sender.age} years old`,
              sender.gender,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <li
                key={request._id ?? request.requestId}
                className="card flex-row flex-wrap items-center gap-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm sm:flex-nowrap sm:p-5"
              >
                <figure className="size-16 shrink-0 rounded-box bg-base-200 sm:size-20">
                  {sender.photoUrl ? (
                    <img
                      src={sender.photoUrl}
                      alt={`Profile photo of ${name}`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="text-xl font-semibold text-base-content/70"
                    >
                      {initials || "?"}
                    </span>
                  )}
                </figure>
                <div className="min-w-0 flex-1 [wrap-anywhere]">
                  <h2 className="card-title">{name}</h2>
                  {details && (
                    <p className="mt-1 text-sm text-base-content/70">
                      {details}
                    </p>
                  )}
                  {sender.about && (
                    <p className="mt-2 text-sm leading-relaxed">
                      {sender.about}
                    </p>
                  )}
                </div>
                <div className="card-actions w-full shrink-0 flex-nowrap justify-end gap-2 sm:w-auto">
                  <button
                    type="button"
                    className="btn btn-success btn-sm w-20"
                    onClick={() => reviewRequest("accepted", request.requestId)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-error btn-sm w-20"
                    onClick={() => reviewRequest("rejected", request.requestId)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ConnectionRequests;
