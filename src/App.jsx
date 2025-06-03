import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import AppRoutes from "@routes/AppRoutes";

import ChatButton from "@components/chatbot/ChatButton";
import Chat from "@components/chatbot/Chat";

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prevState) => !prevState);
    };

    return (
        <>
            <CssBaseline />

            <AppRoutes />

            <ChatButton onClick={toggleChat} />
            <Chat isOpen={isChatOpen} onClose={toggleChat} />
        </>
    );
}

export default App;
