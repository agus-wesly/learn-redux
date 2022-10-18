import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSinglePost, useUpdatePostMutation } from "./postSlice";
import { getAllUsers } from "../users/userSlice";

const EditPosts = () => {
  const { id } = useParams("id");
  const singlePost = useSelector((state) => getSinglePost(state, id));
  const navigate = useNavigate();

  const [newPostTitle, setNewPostTitle] = useState(singlePost.title);
  const [newPostContent, setNewPostContent] = useState(singlePost.body);
  const [newPostWriter, setNewPostWriter] = useState(singlePost.userId);

  const users = useSelector(getAllUsers);
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id, title: newPostTitle, body: newPostContent, userId: newPostWriter }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const EditPosts = isLoading ? (
    <p>Loading...</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTitle">Enter a new title</label>
      <input type="text" id="newTitle" autoComplete="off" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
      <label htmlFor="userSelect">Created By </label>
      <select defaultValue={newPostWriter} id="userSelect" onChange={(e) => setNewPostWriter(e.target.value)}>
        {users.map((user, i) => (
          <option key={i} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <label htmlFor="newContent">Enter a new content</label>
      <textarea rows="4" cols="30" type="text" id="newContent" autoComplete="off" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} />

      <button disabled={!newPostTitle || !newPostContent || isLoading}>Submit</button>
    </form>
  );
  return <>{singlePost ? EditPosts : <h1>Post not found</h1>}</>;
};

export default EditPosts;
