import { z } from "zod/v4"

export const categorySchema = z.object({
  _id: z.string(),
  category: z.string(),
  private: z.boolean(),
  active: z.boolean(),
  image: z.url(),
  theme: z.string(),
})

export type CategorySchema = z.output<typeof categorySchema>