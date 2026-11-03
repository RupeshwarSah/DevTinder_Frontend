import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

export default function Profile() {
  const user = useSelector((store) => store.user);
  if (!user) return <p role="status">Loading profile…</p>;

  return <EditProfile key={user._id} user={user} />;
}
