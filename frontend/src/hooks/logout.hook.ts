import { TokenManager } from "@/utils/token.manager";
import { useNavigate } from "react-router";

export function useLogout() {

    const navigate = useNavigate();

    return () => {
        TokenManager.removeTokens();
        navigate("/login");
    }

}