import { prisma } from "@/lib/db";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
