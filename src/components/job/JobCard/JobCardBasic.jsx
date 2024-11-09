import { Card, CardHeader, CardContent, IconButton, Typography, Chip, Avatar, Box } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import PropTypes from "prop-types";

const JobCardBasic = ({ logo, title, companyName, remote, type, saved, onToggleSave }) => {
    return (
        <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 2 }}>
            <CardHeader
                avatar={
                    <Avatar
                        src={logo}
                        alt={`${companyName} logo`}
                        variant="square"
                        sx={{
                            height: 100,
                            width: 100,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "2px solid #f0f0f0",
                        }}
                    />
                }
                action={
                    <IconButton onClick={onToggleSave} aria-label="save job">
                        {saved ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                }
                title={companyName}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label={remote} color="primary" variant="outlined" />
                    <Chip label={type} color="secondary" variant="outlined" />
                </Box>
            </CardContent>
        </Card>
    );
};

JobCardBasic.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    remote: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    saved: PropTypes.bool.isRequired,
    onToggleSave: PropTypes.func.isRequired,
};

export default JobCardBasic;
