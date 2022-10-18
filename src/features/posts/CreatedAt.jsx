import { parseISO, formatDistanceToNow } from "date-fns";

const CreatedAt = ({ post }) => {
  const parsedDate = parseISO(post.date);
  const fromNow = formatDistanceToNow(parsedDate);

  return <p>{fromNow} ago</p>;
};

export default CreatedAt;
