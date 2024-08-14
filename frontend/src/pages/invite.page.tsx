import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Invite } from "@/models/invite.model";
import { AuthenticationService } from "@/services/auth.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { User } from "@/models/user.model";

export default function InvitePage() {

    const [searchParams, _] = useSearchParams();

    const [user, setUser] = useState<User>();
    const [invite, setInvite] = useState<Invite>();

    const navigate = useNavigate();
    const token = searchParams.get("token") ?? "";

    async function checkInvite() {

        const response = await AuthenticationService.checkInvite(token);

        if(response == undefined) {
            return;
        } else if ("status" in response) {
            
        } else {
            setInvite(response);
        }

    }

    async function getIdentity() {

        const identity = await AuthenticationService.identity();

        if(identity == undefined) {

        } if ("status" in identity) {

        } else {
            setUser(identity);
        }

    }

    async function goToLogin() {
        TokenManager.removeTokens();
        navigate(`/login`, {
            state: {
                data: {
                    email: invite?.subject,
                    token: token
                }
            }
        });
    }

    useEffect(() => {

        if(token == null) {
            navigate("/");
        }

        getIdentity();
        checkInvite();

    }, []);

    return <div className="w-full h-[100dvh] flex items-center justify-center">
        <Card className="w-[250px]">
            <CardHeader>
                <h1>Invite</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {!invite && <p>Invalid invite</p>}
                {invite && <>
                    {!user && <>
                        <p>You need to be logged in to accept this invitation!</p>
                        <Button onClick={() => goToLogin()}><Icon className="mr-2" icon="mdi:login" fontSize="1.5em"/> Login</Button>
                    </>}
                    {user && <>
                        {invite.subject != user.email && <>
                            <p>You are not the intended recipient, please login into a different account</p>
                            <Button onClick={() => goToLogin()}><Icon className="mr-2" icon="mi:switch" fontSize="1.5em"/> Switch account</Button>
                        </>}
                        {invite.subject == user.email && <>
                            <p>You have been invited to be a {invite.type.toLowerCase()} of {invite.targetName}</p>
                            <Button><Icon className="mr-2" icon="ic:round-check" fontSize="1.5em"/> Accept</Button>
                        </>}
                    </>}
                </>}
            </CardContent>
        </Card>
    </div>

}