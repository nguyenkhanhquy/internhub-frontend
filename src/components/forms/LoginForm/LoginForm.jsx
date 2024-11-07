import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../services/authService";
import { setToken } from "../../../services/localStorageService";
import useAuth from "../../../hooks/useAuth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
// import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
// import useForgotPasswordModal from "../ForgotPasswordModal/useForgotPasswordModal";

import styles from "./Login.module.css";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
    email: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
    password: yup.string().required("Không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

function LoginForm() {
    const { setIsAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // const { isOpen, email, error, openModal, closeModal, handleEmailChange, handleRequestReset } =
    //     useForgotPasswordModal(); // Sử dụng hook cho modal

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            const data = await login(formData.email, formData.password);
            setLoading(false);

            if (data.success !== true) {
                if (data?.message) throw new Error(data.message);
                else throw new Error("Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setToken(data.result?.accessToken);

            setIsAuthenticated(true);

            navigate("/");
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h4>Đăng nhập</h4>
                <hr />
                <div className={styles.loginContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={`${styles.formGroup} ${!errors.email ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                onBlur={() => trigger("email")}
                            />
                            <p>{errors.email?.message}</p>
                        </div>

                        <div className={`${styles.formGroup} ${!errors.password ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faLock} className={styles.icon} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                {...register("password")}
                                onBlur={() => trigger("password")}
                            />
                            <div className={styles.togglePassword} onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                            </div>
                            <p>{errors.password?.message}</p>
                        </div>

                        <div className={styles.row}>
                            {/* Ghi nhớ đăng nhập */}
                            <div className={styles.rememberMeContainer}>
                                <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
                                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
                            </div>

                            {/* Quên mật khẩu */}
                            <div className={styles.forgotPassword}>
                                <a>Quên mật khẩu?</a>
                            </div>
                        </div>

                        <div className={styles.buttonWrapper}>
                            {loading ? <CircularProgress /> : <button type="submit">Đăng nhập</button>}
                        </div>
                    </form>
                </div>

                {/* Modal "Quên mật khẩu" */}
                {/* <ForgotPasswordModal
                    open={isOpen}
                    email={email}
                    error={error}
                    onClose={closeModal}
                    onEmailChange={handleEmailChange}
                    onRequestReset={handleRequestReset}
                /> */}
            </div>
            <ToastContainer />
        </>
    );
}

export default LoginForm;
