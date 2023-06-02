import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

const PostLikeSchema = z.object({
  id: z.string(),
  isLiked: z.boolean(),
});

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = PostLikeSchema.parse(json);

    const post = await prisma.post.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!post) {
      return new Response("Post Not Found", { status: 403 });
    }

    let updatedPostLikes = [...(post.likedIds || [])];

    if (body.isLiked) {
      updatedPostLikes = updatedPostLikes.filter(
        (id) => id !== session.user.id
      );
    } else {
      updatedPostLikes.push(session.user.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        likedIds: updatedPostLikes,
      },
    });

    return new Response(JSON.stringify(updatedPost));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
