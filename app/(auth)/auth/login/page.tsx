import { LoginForm } from "@/components/auth/login-form"

const LoginPage = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div>
        <LoginForm />
      </div>
    </main>
  )
}
export default LoginPage