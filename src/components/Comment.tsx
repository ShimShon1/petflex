import { useState } from "react";
import { CommentType } from "../types";
import PostCommentForm from "./PostCommentForm";
import { fetchApi } from "../fetchApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

type CommentProps = {
  comment: CommentType;
  replyComments: CommentType[];
  postId: string;
  userId: string | undefined;
};
export default function Comment({
  comment,
  replyComments,
  postId,
  userId,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => {
      return fetchApi<CommentType[]>(
        "comments" + "/" + postId + "/" + comment._id,
        {
          method: "DELETE",
        },
        true
      );
    },
    onSuccess: comments => {
      queryClient.setQueryData(["comments", postId], comments);
    },
  });
  const replies = replyComments.filter(
    reply => reply.parentId === comment._id
  );
  return (
    <>
      <div className="gray-bg mt-2 w-full space-y-1.5 overflow-scroll rounded-md p-2 text-base">
        <p className="w-[95%] lg:w-[90%]">{comment.content}</p>
        <p className="text-sm font-light italic">
          posted by{" "}
          <span className="font-semibold">
            {comment.user.username + " "}
          </span>
          at: {new Date(comment.createdAt).toLocaleString()}
        </p>

        <div className="flex items-center gap-1 text-xs">
          <button
            className="normal-btn rounded-lg px-1.5 py-0.5 font-semibold"
            onClick={() => setIsReplying(true)}
          >
            Reply
          </button>
          {comment.user._id === userId && (
            <button
              onClick={() => deleteComment()}
              className="rounded-lg border-2 border-stone-700 px-1 py-[1px] text-stone-900 hover:border-red-500 hover:text-red-500 active:bg-red-200"
            >
              Delete
            </button>
          )}
        </div>

        {isReplying && (
          <>
            <PostCommentForm
              postId={postId!}
              parentId={comment._id}
              cancelReply={() => setIsReplying(false)}
            />
          </>
        )}
      </div>

      {replies.map(reply => {
        return (
          <div key={reply._id} className="ml-6 mt-1">
            <Comment
              comment={reply}
              replyComments={replyComments}
              postId={postId}
              userId={userId}
            />
          </div>
        );
      })}
    </>
  );
}
