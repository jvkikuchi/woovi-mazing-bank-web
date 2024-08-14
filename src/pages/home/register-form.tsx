import { CreateUserMutation } from "@/api/mutations/create-user.mutation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TabsContent } from "@radix-ui/react-tabs"
import { useForm } from "react-hook-form"
import { useMutation } from "react-relay"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { TokenInfo } from "./login-form"
import { jwtDecode } from "jwt-decode"
import { createUserMutation } from "@/api/__generated__/createUserMutation.graphql"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

const registerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createUserMutation] = useMutation<createUserMutation>(CreateUserMutation);

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const registerFormOnSubmit = (input: z.infer<typeof registerFormSchema>) => {
    createUserMutation({
      variables: {
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: input.password,
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error Logging In",
          description: "Something went wrong, try again. If the problem persists, contact support.",
        });

        setIsLoading(false);

        return;
      },
      onCompleted: (response, errors) => {
        if (!response) {
          toast({
            variant: "destructive",
            title: "Error Logging In",
            description: "Something went wrong, try again",
          });

          setIsLoading(false);

          return;
        }

        if (errors?.length) {
          toast({
            variant: "destructive",
            title: "Error Logging In",
            description: errors[0].message,
          });

          setIsLoading(false);

          return;
        }

        const token = response!.createUser!.token as string;

        const userInfoFromToken: TokenInfo = jwtDecode(token);

        localStorage.setItem("USER", JSON.stringify(userInfoFromToken));
        localStorage.setItem("TOKEN", token);

        navigate("/account");

        setIsLoading(false);
      },
    });
  };

  return (
    <TabsContent value="register" className="">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Fill in the form to register on Woo-Bank.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(registerFormOnSubmit)} className="space-y-2">
              <FormField control={registerForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={registerForm.control} name="surname" render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your surname.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={registerForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={registerForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a strong password. Minimum 8 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={registerForm.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Confirm your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
              {<Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ?
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
              </Button>}
            </form>
          </Form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </TabsContent>
  )
}