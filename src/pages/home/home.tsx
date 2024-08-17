import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { RegisterForm } from "./register-form"
import { LoginForm } from "./login-form"


export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center mb-4">Woovi-Mazing Bank</h1>

      </div>

      <Tabs defaultValue="login" className="w-[400px]">
        <div className="flex flex-col gap-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <LoginForm />
          <RegisterForm />
        </div>
      </Tabs>
    </div>
  )
}
