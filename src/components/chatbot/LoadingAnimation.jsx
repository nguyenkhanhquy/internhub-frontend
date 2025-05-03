const LoadingAnimation = () => {
    return (
        <div className="mb-3 flex justify-start">
            <div className="max-w-[85%] rounded-2xl border border-gray-200 bg-white p-3 shadow-md">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:150ms]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:300ms]"></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
