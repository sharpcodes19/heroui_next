import { Fragment, PropsWithChildren } from "react"

type NavbarSectionLayoutProps = {}

// prettier-ignore
const NavbarSectionLayout = ({ children, ...props }: PropsWithChildren<NavbarSectionLayoutProps>) => {

  return <Fragment>
    {children}
  </Fragment>

}

export default NavbarSectionLayout
