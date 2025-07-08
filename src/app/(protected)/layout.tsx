import { PropsWithChildren, ReactNode } from "react"
import { ProtectedProviders } from "./_components/providers"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { AppFooter } from "~/components/footer"
import { Metadata } from "next"
import { decodeAccountFromCookie } from "~/config/fetch.server"
import { AccountSchema } from "~/schemas/account"
import { generateKey } from "~/utils/id"

type ProtectedLayoutProps = {
  navbar: ReactNode
  sidebar: ReactNode
}

export const metadata: Metadata = {
  title: "Dashboard",
}

// prettier-ignore
const ProtectedLayout = async ({ sidebar, navbar, children, ...props }: PropsWithChildren<ProtectedLayoutProps>) => {
  const account = await decodeAccountFromCookie<AccountSchema>()

  // TODO: fetch logged in user profile
  const response: BackendResponse<AccountSchema> = {
    authToken: "sample_TOKEN",
    data: {
      id: generateKey(),
      username: "sample_USERNAME",
      password: undefined,
      avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
      email: "sample@domain.com",
      firstName: "Sample",
      lastName: "Sample"
    },
    ok: true,
    message: "This is a dummy response. Fetch real information from a server using fetchRSAAsync.",
  }

  return <ProtectedProviders account={response.ok ? response.data : null} authToken={response.ok ? response.authToken : null}>
    <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr]">
      <ScrollShadow hideScrollBar className="row-span-full h-dvh">{sidebar}</ScrollShadow>
      <ScrollShadow className="h-dvh flex flex-col" style={{ maskImage: "none" }}>
        {navbar}
        <div className="flex flex-1 flex-col">{children}</div>
        <AppFooter classNames={{ base: "mt-5 border-t border-dashed" }} />
      </ScrollShadow>
    </div>
  </ProtectedProviders>
}

export default ProtectedLayout
