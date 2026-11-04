import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState("");

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log(res.data?.connections);
      dispatch(addConnection(res.data?.connections));
    } catch (err) {
      console.error(err);
      setError("Unable to load connections. Please try again.");
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <section
      className="mx-auto w-full max-w-6xl"
      aria-labelledby="connections-title"
    >
      <header className="mb-8 border-b border-base-300 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            id="connections-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            My Connections
          </h1>
          {connections && (
            <span className="badge badge-soft badge-accent">
              {connections.length}{" "}
              {connections.length === 1 ? "connection" : "connections"}
            </span>
          )}
        </div>
        <p className="mt-2 text-base-content/75">
          People you've connected with on DevTinder.
        </p>
      </header>

      {error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : connections == null ? (
        <div
          role="status"
          className="flex items-center justify-center gap-2 py-12"
        >
          <span
            aria-hidden="true"
            className="loading loading-spinner loading-sm text-accent"
          />
          Loading connections…
        </div>
      ) : connections.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">No connections yet.</h2>
          <p className="mt-2 text-base-content/75">
            Start connecting with other developers to see them here.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection, index) => {
            const name = [connection.firstName, connection.lastName]
              .filter(Boolean)
              .join(" ");
            const initials = [
              connection.firstName?.[0],
              connection.lastName?.[0],
            ].join("");
            const details = [
              connection.age != null && `${connection.age} years old`,
              connection.gender,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <li
                key={connection._id ?? index}
                className="card min-w-0 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm"
              >
                <figure className="aspect-4/3 bg-base-300">
                  {connection.photoUrl ? (
                    <img
                      src={connection.photoUrl}
                      alt={`Profile photo of ${name || "your connection"}`}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-20 place-items-center rounded-full bg-base-100 text-2xl font-semibold text-base-content/70"
                    >
                      {initials || "?"}
                    </span>
                  )}
                </figure>
                <div className="card-body gap-2 p-5 [wrap-anywhere]">
                  <h2 className="card-title">{name || "Developer"}</h2>
                  {details && (
                    <p className="grow-0 text-sm text-base-content/70">
                      {details}
                    </p>
                  )}
                  {connection.about && (
                    <p className="leading-relaxed">{connection.about}</p>
                  )}
                  <div className="mt-auto pt-3">
                    <span className="badge badge-soft badge-success">
                      Connected
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Connection;
