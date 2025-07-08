import { LoginForm } from "./_components/form"

type LoginPageProps = {}

// prettier-ignore
const LoginPage = ({ ...props }: LoginPageProps) => {

  return <main className="flex flex-col flex-1 p-2">
    <LoginForm />
  </main>

}

export default LoginPage
