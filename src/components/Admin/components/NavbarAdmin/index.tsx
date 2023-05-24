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
                <Typography className='navbar-admin-header__title'>HuuGiang Shop</Typography>
            </Box>
            <Typography className='navbar-admin-main'>MAIN</Typography>
            <Box className='navbar-admin-list'>
                <Link to='/admin' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <DashboardIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Trang  chủ' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/categories' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <CategoryIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Quản lý danh mục' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/products' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <DashboardIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Quản lý sản phẩm' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/users' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <GroupIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Quản lý người dùng' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/news' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <NewspaperIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Quản lý tin tức' />
                    </ListItemButton>
                </Link>
            </Box>
            <Box className='navbar-admin-list'>
                <Link to='/admin/orders' className='navbar-admin-list__link'>
                    <ListItemButton>
                        <SellIcon sx={{ fontSize: "18px", marginRight: "20px" }} />
                        <ListItemText primary='Quản lý đơn hàng' />
                    </ListItemButton>
                </Link>
            </Box>
        </div>
    );
};

export default NavbarAdmin;
