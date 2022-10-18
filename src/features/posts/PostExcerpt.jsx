import { useSelector } from "react-redux";
import { getSinglePost } from "./postSlice";
import ReactionButtons from "./ReactionButtons";
import Users from "../users/Users";
import CreatedAt from "./CreatedAt";
import { Link } from "react-router-dom";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => getSinglePost(state, postId));
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body?.substring(0, 75)}</p>
      <div className="poss-credit">
        <Users idUser={post.userId} />
        <CreatedAt post={post} />
        <Link to={`/posts/${post.id}`}>Show more...</Link>
        <div className="reactionContainer">
          <ReactionButtons post={post} />
        </div>
      </div>
    </article>
  );
};

export default PostExcerpt;
