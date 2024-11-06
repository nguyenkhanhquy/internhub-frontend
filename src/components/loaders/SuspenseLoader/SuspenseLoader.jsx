const SuspenseLoader = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-4 border-gray-200"></div>

            <div className="ml-2 text-sm text-gray-700">Đang tải...</div>
        </div>
    );
};

export default SuspenseLoader;
