// React & Hooks
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Libraries
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Services
import { login, getAuthUser, getAuthProfile, loginWithGoogle } from "@services/authService";
import { setToken, setRememberMe, getRememberMe, removeRememberMe } from "@services/localStorageService";

// Hooks
import useAuth from "@hooks/useAuth";

// Configs
import { OAuthConfig } from "@config/config";

// Assets
import logoGoogle from "@assets/google.svg";

// Components
import LoadingOverlay from "@components/loaders/LoadingOverlay/LoadingOverlay";
import ForgotPasswordModal from "@components/modals/ForgotPasswordModal/ForgotPasswordModal";
import ActivateAccountModal from "@components/modals/ActivateAccountModal/ActivateAccountModal";

// Styles
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
            setToken(data.result?.accessToken, data.result?.expirationTime);

            const dataUser = await getAuthUser();
            if (!dataUser.success) {
                throw new Error(dataUser.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            let userData = dataUser.result;

            if (dataUser.result.role !== "FIT") {
                const dataProfile = await getAuthProfile();
                if (!dataProfile.success) {
                    throw new Error(dataProfile.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                userData = {
                    ...userData,
                    name: dataProfile.result?.name,
                    approved: dataProfile.result?.approved ?? true,
                    logo: dataProfile.result?.company?.logo,
                };
            }

            setUser(userData);
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

    const hasFetchAuthCode = useRef(false);

    const fetchAuthCode = async (authCode) => {
        if (!authCode || hasFetchAuthCode.current) return; // Ngăn gọi API lặp lại khi đã lấy authCode
        hasFetchAuthCode.current = true; // Đặt ngay khi bắt đầu để tránh gọi lại

        setLoading(true);
        try {
            const data = await loginWithGoogle(authCode);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setToken(data.result?.accessToken, data.result?.expirationTime);

            const dataUser = await getAuthUser();
            if (!dataUser.success) {
                throw new Error(dataUser.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            let userData = dataUser.result;

            if (dataUser.result.role !== "FIT") {
                const dataProfile = await getAuthProfile();
                if (!dataProfile.success) {
                    throw new Error(dataProfile.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                userData = {
                    ...userData,
                    name: dataProfile.result?.name,
                    approved: dataProfile.result?.approved ?? true,
                    logo: dataProfile.result?.company?.logo,
                };
            }

            setUser(userData);
            setIsAuthenticated(true);

            removeRememberMe();
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            hasFetchAuthCode.current = false; // Đặt lại để có thể thử lại
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const clientId = OAuthConfig.clientId;
        const authUri = OAuthConfig.authUri;
        const redirectUri = OAuthConfig.redirectUri;
        const scopes = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid",
        ].join(" ");
        const responseType = "code";
        const accessType = "offline";

        const targetUrl = `${authUri}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&access_type=${accessType}`;

        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        // Mở popup
        window.open(targetUrl, "_blank", `width=${width},height=${height},top=${top},left=${left}`);

        // Đợi code trả về (chỉ chạy 1 lần)
        window.addEventListener(
            "message",
            async (event) => {
                if (event.origin !== window.location.origin) return;
                const { code } = event.data;
                if (code) {
                    await fetchAuthCode(code);
                }
            },
            { once: true },
        );
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
                            <button type="submit">Đăng nhập</button>
                        </div>

                        <div className={styles.activateAccount}>
                            Bạn chưa kích hoạt tài khoản? <a onClick={handleOpenActivate}>Kích hoạt ngay</a>
                        </div>

                        <div className={styles.googleLogin}>
                            <button type="button" onClick={handleGoogleLogin}>
                                <img src={logoGoogle} alt="Google" width={20} height={20} />
                                &nbsp;Đăng nhập với Google
                            </button>
                        </div>
                    </form>
                </div>

                {/* Modal "Quên mật khẩu" */}
                <ForgotPasswordModal open={open} handleClose={handleClose} />

                {/* Modal "Kích hoạt tài khoản" */}
                <ActivateAccountModal open={openActivate} handleClose={handleCloseActivate} />
            </div>
            <LoadingOverlay open={loading} />
        </>
    );
}

export default LoginForm;
