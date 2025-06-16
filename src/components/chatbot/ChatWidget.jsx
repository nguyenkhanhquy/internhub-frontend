import { useState } from "react";
import { useLocation } from "react-router-dom";

import Chat from "./Chat";
import ChatButton from "./ChatButton";

const ChatWidget = () => {
    const location = useLocation();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    const isHidden = ["/auth/callback"].includes(location.pathname);

    if (isHidden) return null;

    return (
        <>
            <ChatButton onClick={toggleChat} />
            <Chat isOpen={isChatOpen} onClose={toggleChat} />
        </>
    );
};

export default ChatWidget;
