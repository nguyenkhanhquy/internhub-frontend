import { useEffect } from "react";

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} | Intern Hub` : "Intern Hub";
    }, [title]);
};

export default usePageTitle;
