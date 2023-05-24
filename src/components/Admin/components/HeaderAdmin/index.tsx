import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import "./headerAdmin.scss";
import { Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: "14px",
            backgroundColor: "#fff",
            padding: " 6px 15px",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #dedede",
        },
        headerRight: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: "14px",
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
        },
    })
);

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

const HeaderAdmin: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <MenuIcon sx={{ color: "#878787", marginRight: "25px" }} />
            <Box className={classes.headerRight}>
                <StyledBadge
                    overlap='circular'
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant='dot'
                    sx={{ marginLeft: "9px" }}
                >
                    <Avatar
                        alt='Remy Sharp'
                        src='https://hencework.com/theme/philbert/img/user1.png'
                    />
                </StyledBadge>
            </Box>
        </div>
    );
};

export default HeaderAdmin;
