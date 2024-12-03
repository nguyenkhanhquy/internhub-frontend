import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";

function NotFoundPage() {
    const navigate = useNavigate();

    const handleNBackHome = () => {
        navigate("/");
    };

    return (
        <div className="mx-auto grid h-screen place-items-center px-8 text-center">
            <div>
                <FlagIcon style={{ height: 80, width: 80, marginBottom: 20 }} />
                <Typography
                    style={{ marginBottom: 20 }}
                    variant="h1"
                    color="blue-gray"
                    className="mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                    Ooops...Error 404 <br /> Trang không tồn tại
                </Typography>
                <Typography style={{ marginBottom: 20 }} className="text-[20px] font-normal text-gray-500">
                    Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </Typography>
                <Button color="gray" variant="outlined" onClick={handleNBackHome}>
                    <HomeIcon className="mr-1" /> Quay lại trang chủ
                </Button>
            </div>
        </div>
    );
}

export default NotFoundPage;
