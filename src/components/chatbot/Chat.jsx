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
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const messagesEndRef = useRef(null);

    // Xử lý animation khi mở/đóng chat
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Delay một chút để đảm bảo element được render trước khi thêm class animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            // Chờ animation hoàn thành trước khi unmount
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);

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

    const getGreetingMessage = () => {
        // Lấy thời gian hiện tại ở Việt Nam (UTC+7)
        const now = new Date();
        const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // UTC+7
        const hour = vietnamTime.getUTCHours();

        if (hour >= 5 && hour < 12) {
            return "Chào buổi sáng ☀️";
        } else if (hour >= 12 && hour < 18) {
            return "Chào buổi chiều 🌞";
        } else if (hour >= 18 && hour < 22) {
            return "Chào buổi tối 🌆";
        } else {
            return "Chào buổi đêm 🌙";
        }
    };

    const popularQuestions = [
        "📋 Làm thế nào để đăng ký thực tập?",
        "🏢 Có những công ty nào đang tuyển thực tập sinh?",
        "📝 Cách viết CV hiệu quả cho thực tập sinh?",
        "💰 Mức lương thực tập trung bình là bao nhiêu?",
        "⏰ Thời gian thực tập thường kéo dài bao lâu?",
        "🎓 Yêu cầu kỹ năng cho thực tập sinh IT?",
    ];

    const handleSuggestionClick = async (question) => {
        // Loại bỏ emoji và ký tự đặc biệt ở đầu câu hỏi
        const cleanQuestion = question.replace(/^[^\w\s]+\s*/, "").trim();

        if (!cleanQuestion) return;

        const currentTime = getCurrentTime();
        setInput("");
        setMessages((prev) => [...prev, { text: cleanQuestion, isUser: true, time: currentTime }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${CHATBOT_URL}/inference`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: cleanQuestion,
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

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed right-4 bottom-24 z-40 flex h-[500px] w-[500px] transform flex-col rounded-xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-in-out sm:h-[600px] sm:w-[600px] ${
                isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
            }`}
        >
            <div className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-500 p-3 text-white">
                <div className="flex items-center">
                    <div className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <h1 className="text-lg font-semibold">Trợ lý AI</h1>
                </div>
                <button
                    onClick={onClose}
                    className="cursor-pointer text-white transition-all duration-200 hover:scale-110 hover:rotate-90 hover:text-gray-200"
                >
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

            <div className="scrollbar-thumb-gray-300 scrollbar-track-gray-50 flex-1 overflow-y-auto bg-gray-50 p-4">
                {messages.length === 0 && (
                    <div className="mt-4 text-center text-gray-500">
                        <p className="text-2xl font-bold text-blue-500">{getGreetingMessage()}</p>
                        <p className="text-sx mt-2">
                            Tôi là trợ lý AI của website InternHub. Tôi có thể giúp gì cho bạn?
                        </p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-3`}>
                        <div
                            className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                                message.isUser
                                    ? "border border-gray-200 bg-gray-200 text-gray-800"
                                    : "border border-gray-200 bg-white text-gray-800"
                            }`}
                        >
                            <div className={`prose prose-sm ${message.isUser ? "prose-invert" : ""} text-left`}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({ href, children }) => (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {children}
                                            </a>
                                        ),
                                    }}
                                >
                                    {message.text}
                                </ReactMarkdown>
                            </div>
                            {/* <div
                                className={`mt-1 text-[10px] ${
                                    message.isUser ? "text-right text-gray-500" : "text-left text-gray-500"
                                }`}
                            >
                                {message.time}
                            </div> */}
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.isUser && <LoadingAnimation />}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="rounded-b-xl border-t border-gray-200 bg-white p-3">
                {/* Câu hỏi phổ biến */}
                {messages.length === 0 && (
                    <div className="mb-4 border-b border-gray-100 pb-3">
                        <p className="mb-2 text-sm font-medium text-gray-600">✨ Các câu hỏi phổ biến</p>
                        <div className="grid grid-cols-1 gap-2">
                            {popularQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSuggestionClick(question)}
                                    className="bg-gray-40 cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isResetting || isLoading}
                        className="cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-2 text-white transition-all duration-200 hover:scale-110 hover:from-purple-700 hover:to-pink-600 disabled:scale-100 disabled:bg-gray-300 disabled:opacity-70"
                        title="Làm mới cuộc trò chuyện"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform duration-500 ${isResetting ? "animate-spin" : ""}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hỏi bất kỳ điều gì"
                        disabled={isLoading}
                        className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition-all duration-200 focus:scale-[1.005] focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 p-2 text-white transition-all duration-200 hover:scale-110 hover:from-indigo-700 hover:to-blue-600 disabled:scale-100 disabled:bg-gray-300 disabled:opacity-70"
                        title="Gửi tin nhắn"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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
