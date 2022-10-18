import { useSelector, useDispatch } from "react-redux";
import { getPostIds, useGetPostsQuery } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const Posts = () => {
  const { isLoading, isError } = useGetPostsQuery();

  const ids = useSelector(getPostIds);

  const allPosts = ids.map((id, i) => <PostExcerpt key={i} postId={id} />);

  return <>{isLoading ? <p>Loading...</p> : isError ? <p>Error...</p> : <div>{allPosts}</div>}</>;
};

export default Posts;
