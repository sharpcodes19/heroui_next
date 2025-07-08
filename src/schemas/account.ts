import { z } from "zod/v4"
import { zId, zNilString } from './misc'

// TODO: shape it based on backend's account schema. Dont forget to update usage in navbar and other components.
export const accountSchema = z.object({
  id: zId,
  username: z.string(),
  password: zNilString,
  firstName: zNilString,
  lastName: zNilString,
  email: zNilString,
  avatarUrl: zNilString
})

export type AccountSchema = z.output<typeof accountSchema>