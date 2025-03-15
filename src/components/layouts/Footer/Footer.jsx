import { Box, Typography, Divider, Paper, Link } from "@mui/material";
import logoImage from "/images/fit_logo.png";

const Footer = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                paddingY: 2,
                boxShadow: 2,
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: 0,
                overflowX: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 4,
                    textAlign: { xs: "center", sm: "left" },
                    maxWidth: "1200px",
                    margin: "0 auto",
                    paddingX: 3,
                }}
            >
                {/* Phần bên trái */}
                <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
                    <Box component="img" src={logoImage} alt="Logo" sx={{ width: 92, marginRight: 2 }} />
                    <Box>
                        <Typography variant="body1" fontWeight="600">
                            Trường Đại Học Sư Phạm Kỹ Thuật
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Thành Phố Hồ Chí Minh
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Khoa Công Nghệ Thông Tin
                        </Typography>
                    </Box>
                </Box>

                {/* Phần bên phải */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="600">
                        Liên hệ với chúng tôi
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Địa chỉ: 01 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. HCM
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Điện thoại: (+84 - 028) 37221223 - 8370
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        E-mail: kcntt@hcmute.edu.vn
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Website:{" "}
                        <Link href="https://fit.hcmute.edu.vn" target="_blank" rel="noopener">
                            fit.hcmute.edu.vn
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/* Thanh ngang và dòng cuối */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} FIT - HCMUTE. Thiết kế & Phát triển bởi{" "}
                <Link href="https://github.com/nguyenkhanhquy" target="_blank" rel="noopener">
                    Nguyễn Khánh Quy
                </Link>{" "}
                và{" "}
                <Link href="https://github.com/NguyenDink" target="_blank" rel="noopener">
                    Đinh Trung Nguyên
                </Link>
                .
            </Typography>
        </Paper>
    );
};

export default Footer;
