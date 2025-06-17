import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const AdvancedFilter = ({ filters, onApplyFilters, onResetFilters }) => {
    const defaultFilters = {
        salary: "",
        major: { label: "Tất cả ngành", value: "" },
        address: { label: "Tất cả địa điểm", value: "" },
        type: "",
        remote: "",
    };

    // Local state để track những thay đổi chưa apply
    const [localFilters, setLocalFilters] = useState(filters);

    const [isExpanded, setIsExpanded] = useState(false);

    // Sync local filters với props khi filters thay đổi từ bên ngoài (reset)
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const isFiltersDefault = () => {
        return JSON.stringify(filters) === JSON.stringify(defaultFilters);
    };

    const isLocalFiltersChanged = () => {
        return JSON.stringify(localFilters) !== JSON.stringify(filters);
    };

    const handleLocalFilterChange = (key, value) => {
        setLocalFilters({ ...localFilters, [key]: value });
    };

    const handleApplyFilters = () => {
        onApplyFilters(localFilters);
        setIsExpanded(false);
    };

    const handleResetFilters = () => {
        setLocalFilters(defaultFilters);
        onResetFilters(defaultFilters);
        setIsExpanded(false);
    };

    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <Box
            sx={{
                pt: 1,
                px: 2,
                mb: { xs: 0, md: 1 },
                borderRadius: 1,
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                maxHeight: { xs: "auto", md: "calc(100vh - 100px)", lg: "calc(100vh - 200px)" },
                position: { xs: "relative", md: "sticky" },
                top: { xs: 0, md: 70 },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: { xs: "none", md: "2px solid #e0e0e0" },
                    pb: 1,
                    cursor: { xs: "pointer", md: "default" },
                }}
                onClick={(e) => {
                    // Chỉ toggle khi ở mobile breakpoint và không phải click vào IconButton
                    if (window.innerWidth < 900 && !e.target.closest(".MuiIconButton-root")) {
                        toggleExpanded();
                    }
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterAltIcon sx={{ color: "#1f2061" }} />
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#1f2061" }}>
                        Lọc nâng cao
                    </Typography>
                </Box>

                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded();
                    }}
                    sx={{
                        color: "#1f2061",
                        display: { xs: "flex", md: "none" },
                    }}
                >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>

            {/* Collapsible Content */}
            <Box
                sx={{
                    // Trên mobile: sử dụng Collapse để ẩn/hiện
                    display: { xs: isExpanded ? "block" : "none", md: "block" },
                }}
            >
                {/* Scrollable Content */}
                <Box
                    sx={{
                        flex: 1,
                        overflow: { xs: "visible", md: "hidden" },
                        scrollbarGutter: "stable",
                        paddingRight: { xs: 0, md: 1 },
                        marginRight: { xs: 0, md: -1 },
                        maxHeight: { xs: "none", md: "calc(100vh - 300px)" },
                        "&:hover": {
                            overflow: { xs: "visible", md: "auto" },
                        },
                        "&::-webkit-scrollbar": {
                            width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#e0e0e0",
                            borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#9e9e9e",
                            borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: "#757575",
                        },
                    }}
                >
                    {/* Mức trợ cấp */}
                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Mức trợ cấp
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={localFilters.salary}
                                onChange={(e) => handleLocalFilterChange("salary", e.target.value)}
                                sx={{ gap: 0 }}
                            >
                                {[
                                    { label: "Tất cả", value: "" },
                                    { label: "Có trợ cấp", value: "Có trợ cấp" },
                                    { label: "Thỏa thuận", value: "Thỏa thuận" },
                                ].map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={
                                            <Radio
                                                size="small"
                                                sx={{
                                                    color: "#2e3090",
                                                    "&.Mui-checked": { color: "#1f2061" },
                                                    py: 0.25,
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                {item.label}
                                            </Typography>
                                        }
                                        sx={{ margin: 0, height: 28 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    {/* Ngành đào tạo */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Ngành đào tạo
                        </Typography>
                        <Autocomplete
                            size="small"
                            options={[
                                { label: "Tất cả ngành", value: "" },
                                { label: "Công nghệ thông tin", value: "IT" },
                                { label: "Kỹ thuật dữ liệu", value: "DS" },
                                { label: "An toàn thông tin", value: "IS" },
                            ]}
                            getOptionLabel={(option) => option.label}
                            value={localFilters.major}
                            onChange={(event, newValue) =>
                                handleLocalFilterChange("major", newValue || defaultFilters.major)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Chọn ngành"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover fieldset": { borderColor: "#1f2061" },
                                            "&.Mui-focused fieldset": { borderColor: "#1f2061" },
                                        },
                                    }}
                                />
                            )}
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    color: "#1f2061",
                                },
                            }}
                        />
                    </Box>

                    {/* Địa điểm làm việc */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Địa điểm làm việc
                        </Typography>
                        <Autocomplete
                            size="small"
                            options={[
                                { label: "Tất cả địa điểm", value: "" },
                                { label: "Quận 1", value: "Quận 1" },
                                { label: "Quận 3", value: "Quận 3" },
                                { label: "Quận 4", value: "Quận 4" },
                                { label: "Quận 5", value: "Quận 5" },
                                { label: "Quận 6", value: "Quận 6" },
                                { label: "Quận 7", value: "Quận 7" },
                                { label: "Quận 8", value: "Quận 8" },
                                { label: "Quận 10", value: "Quận 10" },
                                { label: "Quận 11", value: "Quận 11" },
                                { label: "Quận 12", value: "Quận 12" },
                                { label: "Quận Phú Nhuận", value: "Quận Phú Nhuận" },
                                { label: "Quận Bình Thạnh", value: "Quận Bình Thạnh" },
                                { label: "Quận Gò Vấp", value: "Quận Gò Vấp" },
                                { label: "Quận Tân Bình", value: "Quận Tân Bình" },
                                { label: "Quận Bình Tân", value: "Quận Bình Tân" },
                                { label: "Quận Tân Phú", value: "Quận Tân Phú" },
                                { label: "Huyện Nhà Bè", value: "Huyện Nhà Bè" },
                                { label: "Huyện Cần Giờ", value: "Huyện Cần Giờ" },
                                { label: "Huyện Hóc Môn", value: "Huyện Hóc Môn" },
                                { label: "Huyện Củ Chi", value: "Huyện Củ Chi" },
                                { label: "Huyện Bình Chánh", value: "Huyện Bình Chánh" },
                                { label: "Thành phố Thủ Đức", value: "Thành phố Thủ Đức" },
                            ]}
                            getOptionLabel={(option) => option.label}
                            value={localFilters.address}
                            onChange={(event, newValue) =>
                                handleLocalFilterChange("address", newValue || defaultFilters.address)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Tìm kiếm địa điểm"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover fieldset": { borderColor: "#1f2061" },
                                            "&.Mui-focused fieldset": { borderColor: "#1f2061" },
                                        },
                                    }}
                                />
                            )}
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    color: "#1f2061",
                                },
                            }}
                        />
                    </Box>

                    {/* Loại hợp đồng */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Loại hợp đồng
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={localFilters.type}
                                onChange={(e) => handleLocalFilterChange("type", e.target.value)}
                                sx={{ gap: 0 }}
                            >
                                {[
                                    { label: "Tất cả", value: "" },
                                    { label: "Bán thời gian", value: "Bán thời gian" },
                                    { label: "Toàn thời gian", value: "Toàn thời gian" },
                                ].map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={
                                            <Radio
                                                size="small"
                                                sx={{
                                                    color: "#2e3090",
                                                    "&.Mui-checked": { color: "#1f2061" },
                                                    py: 0.25,
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                {item.label}
                                            </Typography>
                                        }
                                        sx={{ margin: 0, height: 28 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    {/* Hình thức làm việc */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Hình thức làm việc
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={localFilters.remote}
                                onChange={(e) => handleLocalFilterChange("remote", e.target.value)}
                                sx={{ gap: 0 }}
                            >
                                {[
                                    { label: "Tất cả", value: "" },
                                    { label: "Trực tiếp", value: "Trực tiếp" },
                                    { label: "Từ xa", value: "Từ xa" },
                                    { label: "Kết hợp", value: "Kết hợp" },
                                ].map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={
                                            <Radio
                                                size="small"
                                                sx={{
                                                    color: "#2e3090",
                                                    "&.Mui-checked": { color: "#1f2061" },
                                                    py: 0.25,
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                                {item.label}
                                            </Typography>
                                        }
                                        sx={{ margin: 0, height: 28 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>

                {/* Sticky Action Buttons */}
                <Box
                    sx={{
                        borderTop: "2px solid #e0e0e0",
                        backgroundColor: "white",
                        position: { xs: "relative", md: "sticky" },
                        bottom: 0,
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        py: 1,
                        flexWrap: { xs: "nowrap", md: "wrap" },
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <Button
                        variant="text"
                        size="medium"
                        disabled={isFiltersDefault()}
                        onClick={handleResetFilters}
                        startIcon={<FilterAltOffIcon />}
                        sx={{
                            minWidth: 95,
                            width: { xs: "100%", lg: "auto" },
                            py: 0.5,
                            borderRadius: 4,
                            color: "#f44336",
                            backgroundColor: "transparent",
                            border: "1px solid #ccc",
                            textTransform: "none",
                            "&:hover": {
                                border: "1px solid #f44336",
                            },
                        }}
                    >
                        Xóa lọc
                    </Button>
                    <Button
                        variant="text"
                        size="medium"
                        disabled={!isLocalFiltersChanged()}
                        startIcon={<FilterAltIcon />}
                        sx={{
                            minWidth: 95,
                            width: { xs: "100%", lg: "auto" },
                            py: 0.5,
                            borderRadius: 4,
                            color: "#1f2061",
                            backgroundColor: "transparent",
                            border: "1px solid #ccc",
                            textTransform: "none",
                            "&:hover": {
                                border: "1px solid #1f2061",
                            },
                        }}
                        onClick={handleApplyFilters}
                    >
                        Lọc
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

AdvancedFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onResetFilters: PropTypes.func.isRequired,
};

export default AdvancedFilter;
