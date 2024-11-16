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

const teachers = [
    {
        name: "Nguyễn Minh Đạo",
        email: "daonm@hcmute.edu.vn",
    },
    {
        name: "Trương Thị Ngọc Phượng",
        email: "phuongttn@hcmute.edu.vn",
    },
    {
        name: "Lê Vĩnh Thịnh",
        email: "thinhlv@hcmute.edu.vn",
    },
    {
        name: "Mai Anh Thơ",
        email: "thoma@hcmute.edu.vn",
    },
    {
        name: "Nguyễn Hữu Trung",

        email: "trunghn@hcmute.edu.vn",
    },
];

const TeacherPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5">GIÁO VIÊN</Typography>
                <Button variant="contained" color="primary">
                    + Thêm giáo viên
                </Button>
            </div>
            <TableContainer className="rounded bg-white shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>HỌ VÀ TÊN</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>{teacher.email}</TableCell>
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

export default TeacherPage;
