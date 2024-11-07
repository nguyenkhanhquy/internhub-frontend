import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [user, setUser] = useState({
        accessToken: localStorage.getItem("accessToken"),
    });

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            setIsAuthenticated(true);
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
