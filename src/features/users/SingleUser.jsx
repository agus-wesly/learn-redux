import { getUserById } from "./userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleUser = ({ idUser }) => {
  const user = useSelector((state) => getUserById(state, idUser));
  return (
    <Link to={`${user.id}`}>
      <li key={user.id}>{user.name}</li>
    </Link>
  );
};

export default SingleUser;
