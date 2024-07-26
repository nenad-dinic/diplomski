import LoginForm, { LoginFormData } from "@/components/blocks/forms/login.form";
import RegistrationForm, { RegistrationFormData } from "@/components/blocks/forms/registartion.form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { AuthenticationService } from "@/services/auth.service";
import { TabsContent } from "@radix-ui/react-tabs";

export default function LoginPage() {

    const toast = useToast();

    async function handleLogin(values : LoginFormData) {
        try {
            const tokens = await AuthenticationService.login(values.username, values.password);
            console.log(tokens);
        } catch {
            toast.toast({
                title: "Login Failed",
                description: "Please check your parameters and try again!",
                variant: "destructive"
            })
        }

    }

    async function handleRegister(values : RegistrationFormData) {
        console.log(values);
    }

    return <>
        <Tabs className="mx-auto w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" defaultValue="login">
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