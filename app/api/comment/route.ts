import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string(),
  postId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getCurrentUser();

    if (!session) return new Response("Unauthorized", { status: 403 });

    const json = await req.json();
    const body = commentSchema.parse(json);

    const comment = await prisma.comment.create({
      data: {
        body: body.comment,
        userId: session.id,
        postId: body.postId,
      },
    });

    return new Response(JSON.stringify(comment));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError)
      return new Response(JSON.stringify(error.issues), { status: 422 });

    return new Response(null, { status: 500 });
  }
}
