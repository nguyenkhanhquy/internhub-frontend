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

const students = [
    {
        name: "Nguyễn Văn A",
        mssv: "20123456",
        internStatus: "Đã hoàn thành",
        isActive: "Đã kích hoạt",
    },
    {
        name: "Trần Thị B",
        mssv: "20123457",
        internStatus: "Đang thực tập",
        isActive: "Đã kích hoạt",
    },
    {
        name: "Lê Văn C",
        mssv: "20123458",
        internStatus: "Chưa thực tập",
        isActive: "Chưa kích hoạt",
    },
    {
        name: "Phạm Thị D",
        mssv: "20123459",
        internStatus: "Đã hoàn thành",
        isActive: "Đã kích hoạt",
    },
    {
        name: "Nguyễn Thị E",
        mssv: "20123460",
        internStatus: "Chưa thực tập",
        isActive: "Chưa kích hoạt",
    },
];

const getStatusStyle = (status) => {
    return status === "Đã kích hoạt"
        ? "bg-green-100 text-green-700 px-2 py-1 rounded"
        : "bg-red-100 text-red-700 px-2 py-1 rounded";
};

const StudentPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">SINH VIÊN</Typography>
                <Button variant="contained" color="primary">
                    + Thêm sinh viên
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>HỌ VÀ TÊN</TableCell>
                            <TableCell>MSSV</TableCell>
                            <TableCell>TRẠNG THÁI THỰC TẬP</TableCell>
                            <TableCell>TRẠNG THÁI TÀI KHOẢN</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.mssv}</TableCell>
                                <TableCell>{student.internStatus}</TableCell>
                                <TableCell>
                                    <span className={getStatusStyle(student.isActive)}>{student.isActive}</span>
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

export default StudentPage;
