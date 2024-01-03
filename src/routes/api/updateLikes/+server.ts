import { db } from "$lib";
import { error, fail, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

// handles likes count
export async function POST({ request }: RequestEvent) {
  const {id, userId, type} = await request.json();

  const post = await db.posts.findUnique({
    where: {id: id},
  })

  if (!post) {
    return new Response( JSON.stringify({message: "Post could not be found"}), { status: 400 } )
  }

  const hasAlreadyLiked = await db.userLikes.findFirst({
    where: { userId: userId, postId: id }
  })

  if (type === "like") {
    if (hasAlreadyLiked) {
      return new Response( JSON.stringify({message: "You have already liked this post"}), { status: 409 } )
    }

    await db.posts.update({
      where: {id: id},
      data: {
        likes: post.likes +1
      }
    });

    // user may only like a post once, so we keep track using a separate table
    // add the userid, and the postid, means the user liked that post
    await db.userLikes.create({
      data: {
        userId: userId,
        postId: id
      }
    });

    return json({ message: "You liked this post", update: "like" })
  }

  if (type === "dislike") {
    if (!hasAlreadyLiked) {
      return new Response( JSON.stringify({message: "You haven't given a like to remove"}), { status: 409 } )
    }
    await db.posts.update({
      where: {id: id},
      data: {
        likes: post.likes -1
      }
    });

    // user may only like a post once, so we keep track using a separate table
    // remove the userid & postId, user no longer likes this post
    await db.userLikes.delete({
      where: {id: hasAlreadyLiked.id}
    });
    
    return json({ message: "You disliked this post", update: "dislike" })
  }

  else {
    return new Response( JSON.stringify("Invalid Request"), { status: 400 } )
  }
}