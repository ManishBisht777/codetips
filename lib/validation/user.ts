import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  bio: z.string(),
});
