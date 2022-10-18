import { useDispatch } from "react-redux";
import Posts from "./features/posts/Posts";
import CreatePosts from "./features/posts/CreatePosts";
import SinglePost from "./features/posts/SinglePost";
import EditPosts from "./features/posts/EditPosts";
import UserList from "./features/users/UserList";
import PostByUser from "./features/users/PostByUser";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />

        <Route path="posts">
          <Route index element={<CreatePosts />} />
          <Route path="edit/:id" element={<EditPosts />} />
          <Route path=":id" element={<SinglePost />} />
        </Route>

        <Route path="users">
          <Route index element={<UserList />} />
          <Route path=":id" element={<PostByUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
