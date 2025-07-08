import { z } from "zod/v4"

export const featuredListItemSchema = z.object({
  _id: z.string(),
  photo: z.url().optional(),
  name: z.string().min(1),
  price: z.coerce.number().positive(),
  description: z.string(),
  quantity: z.coerce.number().positive(),
  links: z.array(z.url())
})

export const featuredListSchema = z.object({
  _id: z.string(),
  categoryId: z.string(),
  themeId: z.string(),
  photo: z.url(),
  date: z.coerce.date(),
  name: z.string(),
  description: z.string(),
  items: z.array(featuredListItemSchema),
  // cashList: z.array(z.any()),
  // reservedItems: z.array(z.any()),
  // setting: z.any(),
  __v: z.number()
})

export type FeaturedListItemSchema = z.output<typeof featuredListItemSchema>
export type FeaturedListSchema = z.output<typeof featuredListSchema>