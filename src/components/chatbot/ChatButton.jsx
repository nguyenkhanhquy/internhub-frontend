import PropTypes from "prop-types";

const ChatButton = ({ onClick }) => {
    return (
        <div className="fixed right-4 bottom-4 z-50">
            {/* Custom CSS for slow bounce animation */}
            <style>
                {`
                    @keyframes bounce-slow {
                        0%, 100% {
                            transform: translateY(0);
                            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                        }
                        50% {
                            transform: translateY(-10px);
                            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                        }
                    }
                    
                    .animate-bounce-slow {
                        animation: bounce-slow 3s infinite;
                    }
                `}
            </style>

            <button
                onClick={onClick}
                className="animate-bounce-slow group flex h-16 w-16 transform cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg transition-all duration-300 hover:scale-110 hover:from-indigo-700 hover:to-blue-600 hover:shadow-xl"
                aria-label="Open chat"
            >
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white transition-transform duration-200 group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                    {/* Notification dot indicator */}
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
                    </div>
                </div>
            </button>
        </div>
    );
};

ChatButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ChatButton;
