import { useSelector } from "react-redux";
import { getAllUsers } from "./userSlice";

const Users = ({ idUser }) => {
  const users = useSelector(getAllUsers);

  const findUser = users.find((user) => {
    return user.id === idUser;
  });

  const renderUser = findUser ? findUser.name : "undefined";

  return <>Created By : {renderUser}</>;
};

export default Users;
