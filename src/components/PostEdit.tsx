import { useMutation } from "@tanstack/react-query";
import PostForm from "./PostForm";
import { PostSubmitionObject, PostType, QueryError } from "../types";
import { appContext } from "../appContext";
import { useContext } from "react";
import { queryClient } from "../main";
import { fetchApi } from "../fetchApi";
import ErrorPage from "../pages/ErrorPage";

export default function PostEdit({
  post,
  cancelEdit,
}: {
  post: PostType;
  cancelEdit: () => void;
}) {
  const { user, userLoading } = useContext(appContext).userQuery;

  const editMut = useMutation({
    mutationFn: (newPet: PostSubmitionObject) =>
      fetchApi<PostType>(
        "posts/" + post._id,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPet),
        },
        true
      ),
    onError: (err: QueryError) => err,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      cancelEdit();
    },
  });

  if (!user && !userLoading) {
    return <ErrorPage status={401} />;
  }
  return (
    <main>
      <PostForm
        cancelEdit={cancelEdit}
        formType="editing"
        post={post}
        mutation={editMut}
      />
    </main>
  );
}
