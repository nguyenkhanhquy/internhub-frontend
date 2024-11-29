import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { getToken } from "../services/localStorageService";
import { getAuthUser } from "../services/authService";
import AuthContext from "../context/AuthContext";
import useWebSocket from "../hooks/useWebSocket";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const { connectWebSocket, disconnectWebSocket } = useWebSocket(user.email);

    const fetchUser = useCallback(async () => {
        try {
            const data = await getAuthUser();
            if (data.success) {
                setUser(data?.result);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            console.error(error.message);
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
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
