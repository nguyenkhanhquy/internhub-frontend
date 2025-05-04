import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import LoadingAnimation from "./LoadingAnimation";

const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL;

const SESSION_ID = Math.random().toString(36).substring(2, 15);

const Chat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        const currentTime = getCurrentTime();
        setInput("");
        setMessages((prev) => [...prev, { text: userMessage, isUser: true, time: currentTime }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${CHATBOT_URL}/inference`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: userMessage,
                    sessionId: SESSION_ID,
                }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let aiResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                aiResponse += chunk;

                setMessages((prevMessages) => {
                    const last = prevMessages[prevMessages.length - 1];
                    if (last && !last.isUser) {
                        return prevMessages.map((msg, i) =>
                            i === prevMessages.length - 1 ? { ...msg, text: aiResponse } : msg,
                        );
                    } else {
                        return [...prevMessages, { text: chunk, isUser: false, time: getCurrentTime() }];
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
                    isUser: false,
                    time: getCurrentTime(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async () => {
        if (isResetting) return;

        setIsResetting(true);
        try {
            await fetch(`${CHATBOT_URL}/reset/${SESSION_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            setMessages([]);
        } catch (error) {
            console.error("Reset error:", error);
            setMessages([
                {
                    text: "Có lỗi xảy ra khi làm mới cuộc trò chuyện. Vui lòng thử lại.",
                    isUser: false,
                    time: getCurrentTime(),
                },
            ]);
        } finally {
            setIsResetting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="animate-slide-up fixed right-4 bottom-24 z-40 flex h-[500px] w-[500px] flex-col rounded-xl border border-gray-200 bg-white shadow-2xl sm:h-[600px] sm:w-[600px]">
            <div className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-500 p-3 text-white">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold">AI Assistant</h1>
                </div>
                <button onClick={onClose} className="text-white transition-colors hover:text-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50 flex-1 overflow-y-auto bg-gray-50 p-4">
                {messages.length === 0 && (
                    <div className="mt-4 text-center text-gray-500">
                        <p className="font-medium">Chào bạn!</p>
                        <p className="mt-2 text-sm">Tôi là AI Assistant. Hãy đặt câu hỏi để bắt đầu cuộc trò chuyện.</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-3`}>
                        <div
                            className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                                message.isUser
                                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                                    : "border border-gray-200 bg-white text-gray-800"
                            }`}
                        >
                            <div className={`prose prose-sm ${message.isUser ? "prose-invert" : ""} text-left`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                            </div>
                            <div
                                className={`mt-1 text-[10px] ${
                                    message.isUser ? "text-right text-blue-100" : "text-left text-gray-500"
                                }`}
                            >
                                {message.time}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.isUser && <LoadingAnimation />}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="rounded-b-xl border-t border-gray-200 bg-white p-3">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isResetting || isLoading}
                        className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-2 text-white transition-colors hover:from-purple-700 hover:to-pink-600 disabled:bg-gray-300 disabled:opacity-70"
                        title="Làm mới cuộc trò chuyện"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn của bạn..."
                        disabled={isLoading}
                        className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 p-2 text-white transition-colors hover:from-indigo-700 hover:to-blue-600 disabled:bg-gray-300 disabled:opacity-70"
                        title="Gửi tin nhắn"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

Chat.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Chat;
