import PropTypes from "prop-types";

const ChatButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed right-4 bottom-4 z-50 flex h-16 w-16 transform items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            aria-label="Open chat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
        </button>
    );
};

ChatButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ChatButton;
