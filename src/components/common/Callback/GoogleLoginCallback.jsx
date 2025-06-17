import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import logoGoogle from "@assets/google.svg";

const GoogleLoginCallback = () => {
    const navigate = useNavigate();
    const [shouldRender, setShouldRender] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            navigate("/login", { replace: true });
            return;
        }

        setShouldRender(true);
        window.opener.postMessage({ code }, window.location.origin);
        window.close();
    }, [navigate]);

    return shouldRender ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                }}
            >
                <img src={logoGoogle} alt="Google" width={48} height={48} />
                <CircularProgress color="primary" size={48} />
                <Typography variant="h6">Vui lòng chờ trong giây lát...</Typography>
            </Box>
        </Box>
    ) : null;
};

export default GoogleLoginCallback;
