import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userSchema } from "@/lib/validation/user";
import { getServerSession } from "next-auth";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions);
    const { params } = routeContextSchema.parse(context);
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const body = await req.json();
    const payload = userSchema.parse(body);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: payload.name,
        bio: payload.bio,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
