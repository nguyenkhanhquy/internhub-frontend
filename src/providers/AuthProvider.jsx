import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import AuthContext from "@contexts/AuthContext";

import useWebSocket from "@hooks/useWebSocket";

import { getToken } from "@services/localStorageService";
import { getAuthUser, getAuthProfile } from "@services/authService";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const { connectWebSocket, disconnectWebSocket, flag } = useWebSocket(user.id);

    const fetchUser = useCallback(async () => {
        try {
            const dataUser = await getAuthUser();
            if (!dataUser.success) {
                throw new Error(dataUser.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setUser(dataUser.result);

            if (dataUser.result.role !== "FIT") {
                const dataProfile = await getAuthProfile();
                if (!dataProfile.success) {
                    throw new Error(dataProfile.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                setUser((prevUser) => ({
                    ...prevUser,
                    name: dataProfile.result?.name,
                    approved: dataProfile.result?.approved ?? true,
                    logo: dataProfile.result?.company?.logo,
                }));
            }

            setIsAuthenticated(true);
        } catch (error) {
            toast.error(error.message);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchUser();
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, [fetchUser]);

    useEffect(() => {
        if (isAuthenticated && user?.email) {
            connectWebSocket();
        } else {
            disconnectWebSocket();
        }

        return () => disconnectWebSocket();
    }, [isAuthenticated, user?.email, connectWebSocket, disconnectWebSocket]);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, flag }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
