import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  const [error, setError] = useState("");

  const loadFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load feed");
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (users === null) {
    return <p className="text-center">Loading feed...</p>;
  }

  if (users.length === 0) {
    return <p className="text-center">No users available</p>;
  }

  return (
    <div className="flex justify-center">
      <UserCard user={users[0]} />
    </div>
  );
};

export default Feed;
