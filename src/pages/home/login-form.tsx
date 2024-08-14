import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TabsContent } from "@radix-ui/react-tabs"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { LoginMutation } from "@/api/mutations/login.mutation"
import { useMutation } from "react-relay"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { loginMutation } from "@/api/__generated__/loginMutation.graphql"

export type TokenInfo = {
    accountNumber: string;
    exp: number;
    iat: number;
    name: string;
    surname: string;
    userId: string;
}

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string({
        required_error: "Password is required",
    }).min(8, "Password must have at least 8 characters"),
})

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [loginMutation] = useMutation<loginMutation>(LoginMutation);


    const loginFormOnSubmit = (input: z.infer<typeof loginFormSchema>) => {
        setIsLoading(true);

        loginMutation({
            variables: {
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
                if(!response) {
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

                const token = response!.login!.token as string;

                const userInfoFromToken: TokenInfo = jwtDecode(token);

                localStorage.setItem("USER", JSON.stringify(userInfoFromToken));
                localStorage.setItem("TOKEN", token);

                navigate("/account");

                setIsLoading(false);
            },
        });
    };

    return (
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        If you have an account, log in here. Otherwise, register.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(loginFormOnSubmit)} className="space-y-8">
                            <FormField control={loginForm.control} name="email" render={({ field }) => (
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
                            <FormField control={loginForm.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a strong password.
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
            </Card>
        </TabsContent >
    )
}