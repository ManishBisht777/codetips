import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.any().optional(),
});

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   const pageNumberParam = searchParams.get("page");
//   const pageNumber = pageNumberParam ? parseInt(pageNumberParam) : 0;

//   const pageSizeParam = process.env.PAGE_SIZE;
//   const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 20;
//   console.log(pageNumber);
//   console.log(pageSize);

//   const skipAmount = pageNumber * pageSize;

//   const posts = await prisma.post.findMany({
//     skip: skipAmount,
//     take: pageSize,
//   });

//   return new Response(JSON.stringify(posts));
// }

export async function GET(req: Request) {
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          user: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      },
      author: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(posts));
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    console.log(session);
    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.log(error);
    return new Response(null, { status: 500 });
  }
}
