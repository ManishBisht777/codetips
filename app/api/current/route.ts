import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request, res: Response) {
  const session = await getCurrentUser();

  return new Response(JSON.stringify(session));
}
