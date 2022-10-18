import PostExcerpt from "../posts/PostExcerpt";
import { useParams } from "react-router-dom";
import { useGetPostByUserIdQuery } from "../posts/postSlice";

const PostByUser = () => {
  const { id } = useParams();
  const { data: posts, isLoading, isError, isSuccess } = useGetPostByUserIdQuery(id);

  let PostUser;
  if (isLoading) PostUser = <p>Loading...</p>;
  if (isSuccess) PostUser = posts.ids.map((post, i) => <PostExcerpt key={i} postId={post} />);
  if (isError) PostUser = <p>Error</p>;

  return PostUser;
};

export default PostByUser;
