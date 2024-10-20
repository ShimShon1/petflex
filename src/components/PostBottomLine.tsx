import { PostType } from "../types";
import maleIcon from "../assets/male.svg";
import femaleIcon from "../assets/female.svg";
import questionIcon from "../assets/question.svg";

export default function PostBottomLine({
  post,
  inPage = false,
}: {
  post: PostType;
  inPage?: boolean;
}) {
  return (
    <p
      className={
        "h-content flex items-center gap-0.5 self-end text-xs font-light capitalize sm:text-sm md:text-base" +
        (inPage ? " lg:text-lg" : "")
      }
    >
      {post.petType + " "}|
      {
        <img
          src={
            post.gender == "male"
              ? maleIcon
              : post.gender === "female"
                ? femaleIcon
                : questionIcon
          }
          className="inline"
          alt={post.gender}
        />
      }
      | {post.age.years + " years old"} |
      {" created at " + new Date(post.createdAt).toLocaleDateString()}
    </p>
  );
}
