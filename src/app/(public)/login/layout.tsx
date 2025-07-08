import { Metadata } from "next"
import { PropsWithChildren, ReactNode } from "react"

type LoginLayoutProps = {
  navbar: ReactNode
}

export const metadata: Metadata = {
  title: "Login",
}

// prettier-ignore
const LoginLayout = ({ children, navbar, ...props }: PropsWithChildren<LoginLayoutProps>) => {

  return <div className="min-h-dvh flex flex-col">
    {
      // NOTE: enable navbar when needed
      // navbar
    }
    {children}
  </div>

}

export default LoginLayout
