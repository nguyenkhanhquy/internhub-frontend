import { useState } from "react";

import AppRoutes from "@routes/AppRoutes";
import CssBaseline from "@mui/material/CssBaseline";

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

            {/* Chatbot components */}
            <ChatButton onClick={toggleChat} />
            <Chat isOpen={isChatOpen} onClose={toggleChat} />
        </>
    );
}

export default App;
