import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

// prettier-ignore
export async function middleware (req: NextRequest) {
  console.log("✅ Middleware is running... Modify path matcher as needed")
  if(!req.cookies.get(process.env.AUTH_TOKEN_KEY))
    return NextResponse.redirect(new URL("/login", req.url))

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all paths except:
     * - /login
     * - /register
     * - _next (static files and assets)
     * - static files (e.g. .ico, .png)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
}
