import { handleErrors, sleep } from "./support";

export interface Post  {
    userId : number,
    id: number,
    title: string,
    body: string
}
export type Posts = Array<Post>;

export async function  fetchPosts() : Promise<Posts>{
    await sleep(1000);
    const Post:Response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json:Posts = await handleErrors(Post).json()
    return json;
}