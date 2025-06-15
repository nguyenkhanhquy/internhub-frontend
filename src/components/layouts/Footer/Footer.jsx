import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

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
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "center", sm: "center" },
                    flexWrap: "wrap",
                    gap: { xs: 0, sm: 4 },
                    textAlign: "left",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    paddingX: { xs: 4, sm: 4 },
                    paddingY: { xs: 1, sm: 0 },
                }}
            >
                {/* Phần bên trái */}
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        flex: 1,
                        justifyContent: { xs: "center", sm: "flex-start" },
                        mb: { xs: 2, sm: 0 },
                        textAlign: "left",
                    }}
                >
                    <Box
                        component="img"
                        src="/images/fit_logo.png"
                        alt="fit_logo"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        sx={{ width: 80, marginRight: 2 }}
                    />
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
                <Box sx={{ flex: 1, textAlign: "left" }}>
                    <Divider sx={{ my: 1, display: { xs: "block", sm: "none" } }} />
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
            <Divider sx={{ my: { xs: 1, sm: 2 } }} />
            <Typography variant="body2" color="text.secondary" sx={{ px: 4 }}>
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
