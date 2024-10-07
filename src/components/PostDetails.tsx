import { PostType } from "../types";

export default function PostDetails({ post }: { post: PostType }) {
  if (post) {
    return (
      <section className="p-6 text-xl">
        <h1 className="text-4xl">{post.name}</h1>
        <img className="max-h-[70vh]" src={post.image}></img>
        <p>{post.description}</p>
        <p>{post.age.years} years old!</p>
        <p>created by: {post.user.username}</p>
        at {new Date(post.createdAt).toLocaleDateString()}
        <br />
        he is a {post.petType}
        <br />
        and recieved {post.likesCount} likes!
      </section>
    );
  }
}