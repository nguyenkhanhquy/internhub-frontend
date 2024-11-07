import { createContext, useEffect, useState } from "react";
import { getAuthUser } from "../services/authService";
import PropTypes from "prop-types";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const data = await getAuthUser();

            if (data.success !== true) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            } else {
                setUser(data.result);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            fetchUser();
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
