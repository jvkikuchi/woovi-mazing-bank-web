import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { RegisterForm } from "./register-form"
import { LoginForm } from "./login-form"


export function Home() {
  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Woovi-Mazing Bank</h1>
        <p className="text-center text-gray-600">
        </p>
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
    </>
  )
}
