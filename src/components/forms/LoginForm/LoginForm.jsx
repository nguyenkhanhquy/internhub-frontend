import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, getAuthUser } from "../../../services/authService";
import { setToken, setRememberMe, getRememberMe, removeRememberMe } from "../../../services/localStorageService";
import useAuth from "../../../hooks/useAuth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../loaders/Loading/Loading";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal/ForgotPasswordModal";
import ActivateAccountModal from "../../modals/ActivateAccountModal/ActivateAccountModal";

import styles from "./Login.module.css";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
    email: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
    password: yup.string().required("Không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

function LoginForm() {
    const { setUser, setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const rememberedUser = getRememberMe();

    // Modal "Quên mật khẩu"
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Modal "Kích hoạt tài khoản"
    const [openActivate, setOpenActivate] = useState(false);
    const handleOpenActivate = () => setOpenActivate(true);
    const handleCloseActivate = () => setOpenActivate(false);

    const defaultValues = {
        email: rememberedUser.rememberMe ? rememberedUser.email : "",
        password: rememberedUser.rememberMe ? rememberedUser.password : "",
        rememberMe: rememberedUser.rememberMe || false,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const data = await login(formData.email, formData.password);

            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }

            setToken(data.result?.accessToken);

            const dataUser = await getAuthUser(data.result?.accessToken);
            setUser(dataUser?.result);

            setIsAuthenticated(true);

            if (formData.rememberMe) {
                setRememberMe(formData.email, formData.password);
            } else {
                removeRememberMe();
            }
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h4>Đăng nhập</h4>
                <hr />
                <div className={styles.loginContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                        <div className={`${styles.formGroup} ${!errors.email ? styles.noError : styles.isError}`}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                onBlur={() => trigger("email")}
                            />
                            <p>{errors.email?.message}</p>
                        </div>

                        <div className={`${styles.formGroup} ${!errors.password ? styles.noError : styles.isError}`}>
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
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register("rememberMe")}
                                    onChange={(e) => {
                                        if (!e.target.checked) {
                                            removeRememberMe();
                                        }
                                    }}
                                />
                                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
                            </div>

                            {/* Quên mật khẩu */}
                            <div className={styles.forgotPassword}>
                                <a onClick={handleOpen}>Quên mật khẩu?</a>
                            </div>
                        </div>

                        <div className={styles.buttonWrapper}>
                            {loading ? <Loading /> : <button type="submit">Đăng nhập</button>}
                        </div>

                        <div className={styles.activateAccount}>
                            Bạn chưa kích hoạt tài khoản? <a onClick={handleOpenActivate}>Kích hoạt tài khoản</a>
                        </div>
                    </form>
                </div>

                {/* Modal "Quên mật khẩu" */}
                <ForgotPasswordModal open={open} handleClose={handleClose} />

                {/* Modal "Kích hoạt tài khoản" */}
                <ActivateAccountModal open={openActivate} handleClose={handleCloseActivate} />
            </div>
        </>
    );
}

export default LoginForm;
