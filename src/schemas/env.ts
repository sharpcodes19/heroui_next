import { z } from "zod/v4"

const envSchema = z.object({
  API_BASE_URL: z.url(),
  AUTH_TOKEN_KEY: z.string(),
  APP_TIMEZONE: z.string(),
  AUTH_TOKEN_SECRET: z.string(),
  CURRENCY: z.string(),
  LOCALE: z.string()
})

envSchema.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.output<typeof envSchema> {}
  }
}