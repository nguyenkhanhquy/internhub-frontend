import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => (
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="light"
    />
);

export default ToastProvider;
