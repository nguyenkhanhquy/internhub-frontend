import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faUser,
    faVenusMars,
    faPhone,
    faHome,
    faCalendarAlt,
    faGraduationCap,
    faBook,
    faClipboard,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./StudentRegisterForm.module.css";

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
    email: yup.string().required("Không được để trống").matches(regexEmail, "Email không hợp lệ"),
    password: yup.string().required("Không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp")
        .required("Không được để trống"),
    fullName: yup.string().required("Không được để trống"),
    gender: yup.string().required("Không được để trống"),
    phone: yup
        .string()
        .required("Không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .length(10, "Số điện thoại không hợp lệ"),
    address: yup.string().required("Không được để trống"),
    birthdate: yup
        .date()
        .nullable()
        .transform((curr, originalValue) => (originalValue === "" ? null : curr))
        .required("Không được để trống"),
    graduationDate: yup
        .date()
        .nullable()
        .transform((curr, originalValue) => (originalValue === "" ? null : curr))
        .required("Không được để trống"),
    major: yup.string().required("Không được để trống"),
    gpa: yup
        .number()
        .nullable()
        .transform((curr, originalValue) => (originalValue === "" ? null : curr))
        .min(0, "GPA phải lớn hơn hoặc bằng 0")
        .max(4, "GPA phải nhỏ hơn hoặc bằng 4")
        .required("Không được để trống"),
    internshipStatus: yup.string().required("Không được để trống"),
});

const StudentRegisterForm = () => {
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

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const onSubmit = (dataForm) => {
        console.log(dataForm);
    };

    return (
        <div className={styles.container}>
            <h4>Đăng ký Thực tập sinh</h4>
            <hr />
            <div className={styles.registerContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                    <h5>
                        Thông tin đăng nhập <span className={styles.required}>*</span>
                    </h5>

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

                    <hr />

                    <h5>
                        Thông tin cá nhân <span className={styles.required}>*</span>
                    </h5>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${
                                !errors.fullName && !errors.gender ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                {...register("fullName")}
                                onBlur={() => trigger("fullName")}
                            />
                            <p>{errors.fullName?.message}</p>
                        </div>

                        <div
                            className={`${styles.formGroup} ${
                                !errors.gender && !errors.fullName ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faVenusMars} className={styles.icon} />
                            <select {...register("gender")} onBlur={() => trigger("gender")}>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            <p>{errors.gender?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${!errors.phone && !errors.address ? styles.noError : ""}`}
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
                            className={`${styles.formGroup} ${!errors.address && !errors.phone ? styles.noError : ""}`}
                        >
                            <FontAwesomeIcon icon={faHome} className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                {...register("address")}
                                onBlur={() => trigger("address")}
                            />
                            <p>{errors.address?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${
                                !errors.birthdate && !errors.graduationDate ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
                            <input type="date" {...register("birthdate")} onBlur={() => trigger("birthdate")} />
                            <p>{errors.birthdate?.message}</p>
                        </div>

                        <div
                            className={`${styles.formGroup} ${
                                !errors.graduationDate && !errors.birthdate ? styles.noError : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faGraduationCap} className={styles.icon} />
                            <input
                                type="date"
                                {...register("graduationDate")}
                                onBlur={() => trigger("graduationDate")}
                            />
                            <p>{errors.graduationDate?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.formGroup} ${!errors.major && !errors.gpa ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faBook} className={styles.icon} />
                            <select {...register("major")} onBlur={() => trigger("major")}>
                                <option value="">Chọn ngành</option>
                                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                <option value="Kỹ thuật dữ liệu">Kỹ thuật dữ liệu</option>
                                <option value="An toàn thông tin">An toàn thông tin</option>
                            </select>
                            <p>{errors.major?.message}</p>
                        </div>

                        <div className={`${styles.formGroup} ${!errors.gpa && !errors.major ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="GPA"
                                {...register("gpa")}
                                onBlur={() => trigger("gpa")}
                            />
                            <p>{errors.gpa?.message}</p>
                        </div>
                    </div>

                    <div className={`${styles.formGroup} ${!errors.internshipStatus ? styles.noError : ""}`}>
                        <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
                        <select {...register("internshipStatus")} onBlur={() => trigger("internshipStatus")}>
                            <option value="">Chọn trạng thái thực tập</option>
                            <option value="Đang tìm nơi thực tập">Đang tìm nơi thực tập</option>
                            <option value="Đang thực tập">Đang thực tập</option>
                            <option value="Đã hoàn thành thực tập">Đã hoàn thành thực tập</option>
                        </select>
                        <p>{errors.internshipStatus?.message}</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button type="submit">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegisterForm;
