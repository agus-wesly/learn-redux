import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSinglePost } from "./postSlice";
import ReactionButtons from "./ReactionButtons";
import { useDeletePostMutation } from "./postSlice";
import Users from "../users/Users";
import CreatedAt from "./CreatedAt";

const SinglePost = () => {
  const searchId = useParams("id");
  const singlePost = useSelector((state) => getSinglePost(state, searchId.id));
  const [deletePost] = useDeletePostMutation();

  const navigate = useNavigate();
  if (!singlePost) return <p>No post found</p>;

  const handleDelete = async () => {
    try {
      await deletePost({ id: singlePost.id }).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article>
      <h2>{singlePost.title}</h2>
      <p>{singlePost.body.substring(0, 100)}</p>
      <div className="poss-credit">
        <Users idUser={singlePost.userId} />
        <CreatedAt post={singlePost} />
        <div className="reactionContainer singlePost">
          <ReactionButtons post={singlePost} />
        </div>
        <Link to={`/posts/edit/${singlePost.id}`}>Edit Post</Link>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default SinglePost;
