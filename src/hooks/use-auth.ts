import { validateTokenTime } from "@/lib/utils";
import { TokenInfo } from "@/pages/home/login-form";

export const useAuth = () => {
    const user = localStorage.getItem('USER');

    if (user === null) {
        return {
            isAuthenticated: false,
            use: undefined
        };
    };

    const tokenInfo: TokenInfo = JSON.parse(user);

    const { exp } = tokenInfo;

    const isTokenValid = validateTokenTime(exp);

    if (!isTokenValid) {
        localStorage.removeItem('USER');

        return {
            isAuthenticated: false,
            use: undefined
        };
    }

    return {
        isAuthenticated: true,
        user: tokenInfo
    }
}