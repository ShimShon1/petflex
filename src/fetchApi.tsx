import { PostSubmitionObject, PostType } from "./types";

export async function fetchApi<DataT>(
  route: string,
  options: RequestInit,
  auth: boolean
): Promise<DataT> {
  // console.log("fetching something");
  try {
    // console.log("fetching", options);
    const token = localStorage.getItem("token");
    //if needs to be authenticated, check for token, if available, attach to head
    if (auth) {
      if (!token) {
        return Promise.reject({
          message: "unauthorized",
          status: 403,
        });
      } else {
        options = {
          ...options,
          headers: {
            ...options.headers,
            authorization: token,
          },
        };
      }
    }
    // console.log(import.meta.env.VITE_ENDPOINT + route);
    const response = await fetch(
      import.meta.env.VITE_ENDPOINT + route,
      options
    ).catch(() => {
      // console.log("couldn't reach endpoint");
      throw Error;
    });
    const responseJson = await response.json().catch(() => {
      throw Error;
    });
    if (!response.ok) {
      return Promise.reject({
        message: responseJson.errors[0].msg,
        status: response.status,
      });
    }

    // console.log("response good ", responseJson);
    return responseJson;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Promise.reject({
      message: "Unexpected error",
      status: 500,
    });
  }
}

export async function postPet(newPet: PostSubmitionObject) {
  const data = new FormData();
  data.append("name", newPet.name);
  data.append("description", newPet.description);
  data.append("petType", newPet.petType);
  data.append("gender", newPet.gender);
  data.append("image", newPet.image as any);

  data.append("isDead", String(newPet.isDead));

  data.append(
    "birthDate",
    newPet.isDead
      ? newPet.birthDate || new Date().getFullYear()
      : (newPet.birthDate as any)
  );
  // console.log("sending post", data, newPet);
  return fetchApi<PostType>(
    "posts",
    {
      method: "POST",
      body: data,
    },
    true
  );
}
