import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";
import { createJobPost } from "../../../services/jobPostService";
import { convertDate } from "../../../utils/dateUtil";

// Định nghĩa schema validation bằng Yup
const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tiêu đề").max(150, "Tiêu đề không được vượt quá 150 ký tự"),
    jobPosition: yup.string().required("Vui lòng nhập vị trí tuyển dụng").max(100, "Không được vượt quá 100 ký tự"),
    salary: yup.string().required("Vui lòng nhập mức lương").max(100, "Không được vượt quá 100 ký tự"),
    quantity: yup
        .number()
        .typeError("Số lượng phải là một số")
        .positive("Số lượng phải lớn hơn 0")
        .integer("Số lượng phải là một số nguyên")
        .required("Vui lòng nhập số lượng tuyển dụng"),
    type: yup.string().required("Vui lòng chọn loại hợp đồng"),
    remote: yup.string().required("Vui lòng chọn hình thức làm việc"),
    description: yup.string().required("Vui lòng nhập mô tả công việc"),
    requirements: yup.string().required("Vui lòng nhập yêu cầu ứng viên"),
    benefits: yup.string().required("Vui lòng nhập quyền lợi"),
    address: yup.string().required("Vui lòng nhập địa điểm làm việc").max(150, "Không được vượt quá 150 ký tự"),
    expiryDate: yup
        .date()
        .typeError("Vui lòng nhập ngày hợp lệ")
        .required("Vui lòng nhập thời hạn ứng tuyển")
        .min(new Date(), "Thời hạn ứng tuyển phải lớn hơn ngày hiện tại"),
    majors: yup
        .array()
        .of(yup.string().oneOf(["IT", "DS", "IS"], "Ngành không hợp lệ"))
        .min(1, "Vui lòng chọn ít nhất một ngành đào tạo"),
});

const CreateJobPostForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            majors: [],
            type: "",
            remote: "",
        },
    });

    // Xử lý khi submit form
    const onSubmit = async (dataForm) => {
        try {
            dataForm.expiryDate = convertDate(dataForm.expiryDate);
            const data = await createJobPost(dataForm);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            reset();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-4xl p-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">ĐĂNG TIN TUYỂN DỤNG</h2>

            {/* Tiêu đề */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Tiêu đề</label>
                <input
                    type="text"
                    {...register("title")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.title ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                />
                <p className="mt-1 text-xs text-red-600">{errors.title?.message}</p>
            </div>

            {/* Vị trí tuyển dụng */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Vị trí tuyển dụng</label>
                <input
                    type="text"
                    {...register("jobPosition")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.jobPosition ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                />
                <p className="mt-1 text-xs text-red-600">{errors.jobPosition?.message}</p>
            </div>

            {/* Mức lương và Số lượng tuyển dụng cùng một hàng */}
            <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Mức lương</label>
                    <input
                        type="text"
                        {...register("salary")}
                        className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.salary ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    />
                    <p className="mt-1 text-xs text-red-600">{errors.salary?.message}</p>
                </div>

                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Số lượng tuyển dụng</label>
                    <input
                        type="number"
                        {...register("quantity")}
                        className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.quantity ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    />
                    <p className="mt-1 text-xs text-red-600">{errors.quantity?.message}</p>
                </div>
            </div>

            {/* Loại hợp đồng và Hình thức làm việc cùng một hàng */}
            <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Loại hợp đồng</label>
                    <select
                        {...register("type")}
                        className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.type ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    >
                        <option value="" disabled>
                            Chọn loại hợp đồng
                        </option>
                        <option value="Toàn thời gian">Toàn thời gian</option>
                        <option value="Bán thời gian">Bán thời gian</option>
                    </select>
                    <p className="mt-1 text-xs text-red-600">{errors.type?.message}</p>
                </div>

                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Hình thức làm việc</label>
                    <select
                        {...register("remote")}
                        className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.remote ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    >
                        <option value="" disabled>
                            Chọn hình thức làm việc
                        </option>
                        <option value="Trực tiếp">Trực tiếp</option>
                        <option value="Từ xa">Từ xa</option>
                        <option value="Kết hợp">Kết hợp</option>
                    </select>
                    <p className="mt-1 text-xs text-red-600">{errors.remote?.message}</p>
                </div>
            </div>

            {/* Ngành đào tạo và thời hạn ứng tuyển cùng một dòng */}
            <div className="mb-4 flex space-x-4">
                {/* Ngành đào tạo */}
                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Ngành đào tạo</label>
                    <div className="mt-1 flex flex-col space-y-2">
                        <label className="mr-4 inline-flex items-center">
                            <input
                                type="checkbox"
                                value="IT"
                                {...register("majors")}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2">Công nghệ thông tin</span>
                        </label>
                        <label className="mr-4 inline-flex items-center">
                            <input
                                type="checkbox"
                                value="DS"
                                {...register("majors")}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2">Kỹ thuật dữ liệu</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="IS"
                                {...register("majors")}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2">An toàn thông tin</span>
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-red-600">{errors.majors?.message}</p>
                </div>
                {/* Thời hạn ứng tuyển */}
                <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700">Thời hạn ứng tuyển</label>
                    <input
                        type="date"
                        {...register("expiryDate")}
                        className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.expiryDate ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    />
                    <p className="mt-1 text-xs text-red-600">{errors.expiryDate?.message}</p>
                </div>
            </div>

            {/* Địa điểm làm việc */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Địa điểm làm việc</label>
                <input
                    type="text"
                    {...register("address")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                />
                <p className="mt-1 text-xs text-red-600">{errors.address?.message}</p>
            </div>

            {/* Mô tả công việc */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Mô tả công việc</label>
                <textarea
                    {...register("description")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    rows="4"
                ></textarea>
                <p className="mt-1 text-xs text-red-600">{errors.description?.message}</p>
            </div>

            {/* Yêu cầu ứng viên */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Yêu cầu ứng viên</label>
                <textarea
                    {...register("requirements")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.requirements ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    rows="4"
                ></textarea>
                <p className="mt-1 text-xs text-red-600">{errors.requirements?.message}</p>
            </div>

            {/* Quyền lợi */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Quyền lợi</label>
                <textarea
                    {...register("benefits")}
                    className={`mt-1 w-full rounded-lg border p-2 focus:outline-none ${errors.benefits ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    rows="4"
                ></textarea>
                <p className="mt-1 text-xs text-red-600">{errors.benefits?.message}</p>
            </div>

            <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-blue-800 py-3 font-semibold text-white hover:bg-blue-900"
            >
                {isSubmitting ? "Đang tạo bài đăng..." : "Tạo bài đăng"}
            </button>
        </form>
    );
};

export default CreateJobPostForm;
