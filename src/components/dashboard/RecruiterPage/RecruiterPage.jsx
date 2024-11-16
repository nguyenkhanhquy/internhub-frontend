import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const recruiters = [
    {
        companyName: "Công ty ABC",
        website: "https://abc.com",
        logo: "https://via.placeholder.com/100",
        isActive: "Đã kích hoạt",
    },
    {
        companyName: "Công ty XYZ",
        website: "https://xyz.com",
        logo: "https://via.placeholder.com/100",
        isActive: "Chưa kích hoạt",
    },
    {
        companyName: "Công ty DEF",
        website: "https://def.com",
        logo: "https://via.placeholder.com/100",
        isActive: "Đã kích hoạt",
    },
    {
        companyName: "Công ty GHI",
        website: "https://ghi.com",
        logo: "https://via.placeholder.com/100",
        isActive: "Chưa kích hoạt",
    },
    {
        companyName: "Công ty JKL",
        website: "https://jkl.com",
        logo: "https://via.placeholder.com/100",
        isActive: "Đã kích hoạt",
    },
];

const getStatusStyle = (status) => {
    return status === "Đã kích hoạt"
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const RecruiterPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">DOANH NGHIỆP</Typography>
                <Button variant="contained" color="primary">
                    + Thêm doanh nghiệp
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>TÊN CÔNG TY</TableCell>
                            <TableCell>WEBSITE</TableCell>
                            <TableCell>LOGO</TableCell>
                            <TableCell>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recruiters.map((recruiter, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{recruiter.companyName}</TableCell>
                                <TableCell>
                                    <a
                                        href={recruiter.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {recruiter.website}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={recruiter.logo}
                                        alt={`${recruiter.companyName} logo`}
                                        className="h-10 w-10 object-contain"
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className={getStatusStyle(recruiter.isActive)}>{recruiter.isActive}</span>
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <MoreVert />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RecruiterPage;
