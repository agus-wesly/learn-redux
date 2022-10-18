import { useAddReactionMutation } from "./postSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const [addReaction, { isLoading }] = useAddReactionMutation();

  const reactions = Object.entries(reactionEmoji).map(([reaction, logo]) => (
    <button
      key={reaction}
      className="reactionButton"
      onClick={async () => {
        const updatedReaction = post.reactions[reaction] + 1;
        await addReaction({ postId: post.id, reactions: { ...post.reactions, [reaction]: updatedReaction } });
      }}
      disabled={isLoading}
    >
      {logo} {post.reactions[reaction]}
    </button>
  ));

  return <>{reactions}</>;
};

export default ReactionButtons;
