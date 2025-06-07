import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "@components/loaders/Loading/Loading";

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

import { registerStudent } from "@services/userService";
import { convertDate } from "@utils/dateUtil";

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
    name: yup.string().required("Không được để trống"),
    gender: yup.string().required("Không được để trống"),
    phone: yup
        .string()
        .required("Không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .length(10, "Số điện thoại không hợp lệ"),
    address: yup.string().required("Không được để trống"),
    dob: yup
        .date()
        .nullable()
        .transform((curr, originalValue) => (originalValue === "" ? null : curr))
        .required("Không được để trống"),
    expGrad: yup
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
    internStatus: yup.string().required("Không được để trống"),
});

const StudentRegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            gender: "",
            major: "",
            internStatus: "",
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            formData.dob = convertDate(formData.dob);
            formData.expGrad = convertDate(formData.expGrad);

            const data = await registerStudent(formData);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            navigate("/verify", { state: { email: formData.email, action: "activate-account" } });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
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
                                placeholder="Xác nhận mật khẩu"
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
                        <div className={`${styles.formGroup} ${!errors.name && !errors.gender ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                {...register("name")}
                                onBlur={() => trigger("name")}
                            />
                            <p>{errors.name?.message}</p>
                        </div>

                        <div className={`${styles.formGroup} ${!errors.gender && !errors.name ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faVenusMars} className={styles.icon} />
                            <select {...register("gender")} onBlur={() => trigger("gender")}>
                                <option value="" disabled>
                                    Chọn giới tính
                                </option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            <p>{errors.gender?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div
                            className={`${styles.formGroup} ${!errors.phone && !errors.internStatus ? styles.noError : ""}`}
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
                            className={`${styles.formGroup} ${!errors.internStatus && !errors.phone ? styles.noError : ""}`}
                        >
                            <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
                            <select {...register("internStatus")} onBlur={() => trigger("internStatus")}>
                                <option value="" disabled>
                                    Chọn trạng thái thực tập
                                </option>
                                <option value="SEARCHING">Đang tìm nơi thực tập</option>
                                <option value="WORKING">Đang thực tập</option>
                                <option value="COMPLETED">Đã hoàn thành thực tập</option>
                            </select>
                            <p>{errors.internStatus?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.formGroup} ${!errors.dob && !errors.expGrad ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
                            <input type="date" {...register("dob")} onBlur={() => trigger("dob")} />
                            <p>{errors.dob?.message}</p>
                        </div>

                        <div className={`${styles.formGroup} ${!errors.expGrad && !errors.dob ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faGraduationCap} className={styles.icon} />
                            <input type="date" {...register("expGrad")} onBlur={() => trigger("expGrad")} />
                            <p>{errors.expGrad?.message}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.formGroup} ${!errors.major && !errors.gpa ? styles.noError : ""}`}>
                            <FontAwesomeIcon icon={faBook} className={styles.icon} />
                            <select {...register("major")} onBlur={() => trigger("major")}>
                                <option value="" disabled>
                                    Chọn ngành
                                </option>
                                <option value="IT">Công nghệ thông tin</option>
                                <option value="DS">Kỹ thuật dữ liệu</option>
                                <option value="IS">An toàn thông tin</option>
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

                    <div className={`${styles.formGroup} ${!errors.address ? styles.noError : ""}`}>
                        <FontAwesomeIcon icon={faHome} className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            {...register("address")}
                            onBlur={() => trigger("address")}
                        />
                        <p>{errors.address?.message}</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        {loading ? <Loading /> : <button type="submit">Đăng ký</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegisterForm;
