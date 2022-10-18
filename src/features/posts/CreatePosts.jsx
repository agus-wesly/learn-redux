import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "./postSlice";

const CreatePosts = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [writer, setWriter] = useState("");

  const [addPost, { isLoading }] = useAddPostMutation();

  const users = useSelector(getAllUsers);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newContent && newTitle && !isLoading) {
      try {
        await addPost({ title: newTitle, body: newContent, userId: writer }).unwrap();
        setNewContent("");
        setNewTitle("");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTitle">Enter a new title</label>
      <input type="text" id="newTitle" autoComplete="off" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <label htmlFor="userSelect">Created By </label>
      <select value={writer} id="userSelect" onChange={(e) => setWriter(e.target.value)}>
        <option value=""></option>
        {users.map((user, i) => (
          <option key={i} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <label htmlFor="newContent">Enter a new content</label>
      <textarea rows="4" cols="30" type="text" id="newContent" autoComplete="off" value={newContent} onChange={(e) => setNewContent(e.target.value)} />

      <button disabled={!newTitle || !newContent || isLoading}>Submit</button>
    </form>
  );
};

export default CreatePosts;
