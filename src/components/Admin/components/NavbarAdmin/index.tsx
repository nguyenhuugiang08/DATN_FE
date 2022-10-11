import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { Box } from "@mui/system";
import { Typography, ListItemButton, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SellIcon from '@mui/icons-material/Sell';
import "./navbarAdmin.scss";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    return (
        <div className='navbar-admin'>
            <Box className='navbar-admin-header'>
                <DiamondOutlinedIcon
                    sx={{ color: "#2ECD99" }}
                    className='navbar-admin-header__icon'
                />
                <Typography className='navbar-admin-header__title'>Ega-Style</Typography>
            </Box>
            <Typography className='navbar-admin-main'>MAIN</Typography>
            <Box className='navbar-admin-list'>
                <Link to='/admin' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <DashboardIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Dashboard' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/alias' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <SubtitlesIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Alias' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/categories' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <CategoryIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Categories' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/products' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <DashboardIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Products' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/user' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <GroupIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Users' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/news' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <NewspaperIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='News' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/orders' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <SellIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Orders' />
                    </ListItemButton>
                </Link>
            </Box>
        </div>
    );
};

export default NavbarAdmin;
