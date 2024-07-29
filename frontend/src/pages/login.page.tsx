import LoginForm, { LoginFormData } from "@/components/blocks/forms/login.form";
import RegistrationForm, { RegistrationFormData } from "@/components/blocks/forms/registartion.form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { AuthenticationService } from "@/services/auth.service";
import { TokenManager } from "@/utils/token.manager";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {

    const [tab, setTab] = useState("login");

    const toast = useToast();
    const navigate = useNavigate();

    async function handleLogin(values : LoginFormData) {
        try {
            const tokens = await AuthenticationService.login(values.username, values.password);
            TokenManager.setTokens(tokens.accessToken, tokens.refreshToken);
            navigate("/");
        } catch {
            toast.toast({
                title: "Login Failed",
                description: "Please check your parameters and try again!",
                variant: "destructive"
            })
        }

    }

    async function handleRegister(values : RegistrationFormData) {

        try {
            await AuthenticationService.register(values.username, values.password, values.fullName, values.email, values.phoneNumber);

            toast.toast({
                title: "Registration Successful",
                description: "You can login now!",
                variant: "default"
            });

            setTab("login");

        } catch {
            toast.toast({
                title: "Registration Failed",
                description: "Please check your parameters and try again!",
                variant: "destructive"
            });
        }

    }

    return <>
        <Tabs value={tab} onValueChange={(v => setTab(v))} className="mx-auto w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" defaultValue="login">
            <TabsList className="w-full flex mb-4">
                <TabsTrigger className="flex-grow" value="login">Login</TabsTrigger>
                <TabsTrigger className="flex-grow" value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card className="w-full">
                    <CardTitle className="my-4 text-center text-xl">Login</CardTitle>
                    <CardContent>
                        <LoginForm onSubmit={handleLogin}/>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardTitle className="my-4 text-center text-xl">Register</CardTitle>
                    <CardContent>
                        <RegistrationForm onSubmit={handleRegister}></RegistrationForm>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </>

}