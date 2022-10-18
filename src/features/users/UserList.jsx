import { useSelector } from "react-redux";
import { getUserIds, useGetUsersQuery } from "./userSlice";
import SingleUser from "./SingleUser";

const UserList = () => {
  const { isLoading, isSuccess, isError } = useGetUsersQuery();
  const userIds = useSelector(getUserIds);
  let userList;

  if (isLoading) userList = <p>Loading...</p>;
  if (isSuccess)
    userList = (
      <ol>
        {userIds.map((id) => (
          <SingleUser idUser={id} />
        ))}
      </ol>
    );
  if (isError) userList = <p>Error :'( </p>;

  return <>{userList}</>;
};

export default UserList;
