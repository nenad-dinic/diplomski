import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useForm } from "react-hook-form";

export default function LoginPage() {

    const loginForm = useForm({
        values: {
            username: "",
            password: ""
        }
    });

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
                        <Form {...loginForm}>
                            <FormField control={loginForm.control} name="username" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username: </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your username" {...field}></Input>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField control={loginForm.control} name="password" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password: </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <Button className="block mx-auto mt-4 w-full">Login</Button>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardTitle className="my-4 text-center text-xl">Register</CardTitle>
                    <CardContent>

                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </>

}