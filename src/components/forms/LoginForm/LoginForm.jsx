import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import { setToken } from "../../../services/localStorageService";
import useAuth from "../../../hooks/useAuth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
    // const { isOpen, email, error, openModal, closeModal, handleEmailChange, handleRequestReset } =
    //     useForgotPasswordModal(); // Sử dụng hook cho modal

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const onSubmit = async (formData) => {
        try {
            const data = await login(formData.email, formData.password);

            if (data.success === false) {
                throw new Error(data.message);
            }

            setToken(data.result?.accessToken);

            setIsAuthenticated(true);

            navigate("/");
        } catch (error) {
            setSnackBarMessage(error.message);
            setSnackBarOpen(true);
        }
    };

    return (
        <>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackBar} severity="error" variant="filled" sx={{ width: "100%" }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
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
                            <button type="submit">Đăng nhập</button>
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
        </>
    );
}

export default LoginForm;
