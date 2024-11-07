import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faPhone,
    faUserTie,
    faBuilding,
    faEye,
    faEyeSlash,
    faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./RecruiterRegisterForm.module.css";

function RecruiterRegisterForm() {
    const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const schema = yup.object().shape({
        companyName: yup.string().required("Không được để trống"),
        representativeName: yup.string().required("Không được để trống"),
        representativePosition: yup.string().required("Không được để trống"),
        phone: yup
            .string()
            .required("Không được để trống")
            .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
        recruiterEmail: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
        email: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
        password: yup.string().required("Không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Mật khẩu không khớp")
            .required("Không được để trống"),
        agreeTerms: yup
            .bool()
            .required("Bạn phải đồng ý với Điều khoản và Điều kiện")
            .oneOf([true], "Bạn phải đồng ý với Điều khoản và Điều kiện"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const handleAgreeTermsChange = (event) => {
        setAgreeTerms(event.target.checked);
    };

    const onSubmit = (dataForm) => {
        console.log(dataForm);
    };

    return (
        <div className={styles.container}>
            <h4>Đăng ký Nhà tuyển dụng</h4>
            <hr />
            <div className={styles.registerContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                    <h5>
                        Thông tin liên hệ <span className={styles.required}>*</span>
                    </h5>

                    <div className={`${styles.formGroup} ${!errors.companyName ? styles.noError : ""}`}>
                        <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Tên công ty"
                            {...register("companyName")}
                            onBlur={() => trigger("companyName")}
                        />
                        <p>{errors.companyName?.message}</p>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${
                                !errors.representativeName && !errors.representativePosition ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faUserTie} className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Họ và tên Người đại diện"
                                {...register("representativeName")}
                                onBlur={() => trigger("representativeName")}
                            />
                            <p>{errors.representativeName?.message}</p>
                        </div>

                        <div
                            className={`${styles.formGroup} ${
                                !errors.representativePosition && !errors.representativeName ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faBriefcase} className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Chức vụ"
                                {...register("representativePosition")}
                                onBlur={() => trigger("representativePosition")}
                            />
                            <p>{errors.representativePosition?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${!errors.phone && !errors.recruiterEmail ? styles.noError : ""}`}
                        >
                            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                            <input
                                type="tel"
                                placeholder="Điện thoại"
                                {...register("phone")}
                                onBlur={() => trigger("phone")}
                            />
                            <p>{errors.phone?.message}</p>
                        </div>

                        <div
                            className={`${styles.formGroup} ${!errors.recruiterEmail && !errors.phone ? styles.noError : ""}`}
                        >
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                            <input
                                type="email"
                                placeholder="Email Người đại diện"
                                {...register("recruiterEmail")}
                                onBlur={() => trigger("recruiterEmail")}
                            />
                            <p>{errors.recruiterEmail?.message}</p>
                        </div>
                    </div>

                    <hr />
                    <h5>
                        Thông tin đăng nhập <span className={styles.required}>*</span>
                    </h5>

                    <div className={`${styles.formGroup} ${!errors.email ? styles.noError : ""}`}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                        <input
                            type="email"
                            placeholder="Email đăng nhập"
                            {...register("email")}
                            onBlur={() => trigger("email")}
                        />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${
                                !errors.password && !errors.confirmPassword ? styles.noError : ""
                            }`}
                        >
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

                        <div
                            className={`${styles.formGroup} ${
                                !errors.confirmPassword && !errors.password ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faLock} className={styles.icon} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                {...register("confirmPassword")}
                                onBlur={() => trigger("confirmPassword")}
                            />
                            <div className={styles.togglePassword} onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                            </div>
                            <p>{errors.confirmPassword?.message}</p>
                        </div>
                    </div>

                    <div className={styles.agreeTermsContainer}>
                        <input
                            type="checkbox"
                            {...register("agreeTerms")}
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={handleAgreeTermsChange}
                        />
                        <label htmlFor="agreeTerms">Tôi đồng ý với Điều khoản và Điều kiện trên.</label>
                        <p>{errors.agreeTerms?.message}</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button type="submit" disabled={!agreeTerms}>
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecruiterRegisterForm;
