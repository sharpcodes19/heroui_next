import _ from "lodash"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { z } from "zod/v4"
import { NextResponse } from "next/server"
import { toDateTimeConversion } from "~/utils/date"

const isBackendResponseMatchedAsync = async <T>(data: T) => {
  return z
    .object({
      ok: z.boolean(),
    })
    .safeParseAsync(data)
}

// prettier-ignore
export const fetchRSAAsync = async <T> (url: string, { headers, ...init }: RequestInit = {}): Promise<BackendResponse<T>> => {
  const urlValidator = await z.string().refine((value) => String(value).startsWith("/")).safeParseAsync(url)

  if(!urlValidator.success)
    throw new Error("fetchRSAAsync URL must starts with a '/'")

  const cookieStore = await cookies()
  let authToken = cookieStore.get(process.env.AUTH_TOKEN_KEY)?.value ?? null

  const headersInit: HeadersInit = _.omitBy({
    Authorization: authToken ? ["Bearer", authToken].join(" ") : null, ...headers }, _.isNil)

  const absoluteURL = [process.env.API_BASE_URL, url].join("")
  return fetch(absoluteURL, { headers: headersInit, ...init })
    .then(async (res) => {
      if(!res.ok) {
        const text = await res.text()
        return JSON.parse(text)
      }
      const data = await res.json() as T
      const successValidator = await isBackendResponseMatchedAsync(data)
      if(!successValidator.success) {
        return { authToken, data, ok: true }
      }
      return data
    })
}

export const applyAuthTokenAsync = async (authToken: string | null) => {
  const cookieStore = await cookies()
  if (authToken) cookieStore.set(process.env.AUTH_TOKEN_KEY, authToken)
}

// prettier-ignore
export const signAuthTokenAsync = async <T> (response: BackendResponse<T>) => {
  if (response.ok && response.authToken) {
    const secret = process.env.AUTH_TOKEN_KEY_SECRET
    const decoded = await decodeAccountFromCookie()
    const dateConversion = toDateTimeConversion(new Date())
    const expiresIn = dateConversion.dateTime.add({ days: 1 }).toDate(dateConversion.timeZone).getTime()
    const authToken = jwt.sign(_.pick(decoded, ["id"]), secret, { expiresIn })
    return authToken
  }
  return null
}

// prettier-ignore
export const decodeAccountFromCookie = async <T extends JwtPayload> () => {
  const cookiStore = await cookies()
  const authToken = cookiStore.get(process.env.AUTH_TOKEN_KEY)

  if (!authToken) return null
  
  const secret = process.env.AUTH_TOKEN_KEY_SECRET
  const decoded = _.isNil(secret) ?
    jwt.decode(authToken.value) :
    jwt.verify(authToken.value, secret)

  // // @ts-expect-error Property 'exp' does not exist on type 'string | JwtPayload'.
  // const expiration = decoded.exp as number
  // const isExpired = false

  return _.omit(decoded as T, [ "iss", "sub", "aud", "exp", "nbf", "iat", "jti" ])
}

export const decodeFailureResponse = async (message?: string) =>
  NextResponse.json(
    {
      message: message || "Token was not found",
      ok: false,
    } as FailedBackedResponse,
    { status: 401 },
  )
