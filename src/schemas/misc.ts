import { z } from "zod/v4"

export const lookUpSchema = z.object({
  id: z.string(),
  name: z.string()
})

export const uploadItem = z.object({
  name: z.string(),
  mime: z.string(),
  base64: z.base64(),
})

export const zId = z.string()
export const zNilString = z.string().nullable().optional()

export type UploadItem = z.infer<typeof uploadItem>
export type LookUpSchema = z.output<typeof lookUpSchema>