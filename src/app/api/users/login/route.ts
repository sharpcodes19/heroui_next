import { NextRequest, NextResponse } from "next/server"
import { applyAuthTokenAsync, signAuthTokenAsync } from "~/config/fetch.server"
import { accountSchema, AccountSchema } from "~/schemas/account"
import { treeifyError } from "zod/v4"
import { generateKey } from "~/utils/id"

// prettier-ignore
export const POST = async (req: NextRequest) => {
  const payload = await req.json()
  const payloadValidator = await accountSchema.pick({ password: true, username: true }).safeParseAsync(payload)

  if(!payloadValidator.success)
    return NextResponse.json({
      ok: false,
      message: "Login failed",
      error: treeifyError(payloadValidator.error).properties
    } as FailedBackedResponse)

  const response = await 
    // fetchRSAAsync<BackendResponse<Partial<AccountSchema>>>("/login")
    new Promise<BackendResponse<Partial<AccountSchema>>>((resolve) => {
      // TODO: request login endpoint from a server
      const response = {
        authToken: "",
        data: {
          id: generateKey(),
          username: "sample_USERNAME",
          password: undefined
        },
        ok: true,
        message: "This is a dummy response. Fetch real information from a server using fetchRSAAsync.",
      }
      resolve(response)
    })
    .then(async (response) => {
      if(!response.ok) return response
      const authToken = await signAuthTokenAsync(response)
      await applyAuthTokenAsync(authToken)
      return { ...response, authToken }
    })
  return NextResponse.json({ ...response, message: response.message ?? "Login success" } as SuccessfullResponse)
}
