import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getToken, removeToken } from "@services/localStorageService";
import { logout } from "@services/authService";

import useAuth from "@hooks/useAuth";
import Loading from "@components/loaders/Loading/Loading";

import { setProfileRedux, setAccountDetailsRedux } from "@/store/manufacturerData/manufacturerActions";

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasLogout = useRef(false);

    const { setUser, setIsAuthenticated } = useAuth();

    const handleLogout = useCallback(async () => {
        const accessToken = getToken();

        try {
            if (accessToken) {
                const data = await logout(accessToken);
                if (!data.success) {
                    if (data?.message) throw new Error(data.message);
                    else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
                }
                removeToken();

                const user = { role: "GUEST" };
                setUser(user);

                setIsAuthenticated(false);

                dispatch(setProfileRedux(null));
                dispatch(setAccountDetailsRedux(null));

                navigate("/login");
                toast.success(data?.message);
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [setUser, setIsAuthenticated, navigate, dispatch]);

    useEffect(() => {
        if (!hasLogout.current) {
            handleLogout();
            hasLogout.current = true;
        }
    }, [handleLogout]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Loading />
        </div>
    );
};

export default LogoutPage;
