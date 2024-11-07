import { Card, CardHeader, CardContent, IconButton, Typography, Chip, Avatar, Box } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import PropTypes from "prop-types";

const JobCard = ({ logo, title, companyName, remote, type, saved, onToggleSave }) => {
    return (
        <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 2 }}>
            <CardHeader
                avatar={<Avatar src={logo} alt={`${companyName} logo`} />}
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

JobCard.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    remote: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    saved: PropTypes.bool.isRequired,
    onToggleSave: PropTypes.func.isRequired,
};

export default JobCard;
