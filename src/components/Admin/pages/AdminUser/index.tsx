import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { Thumbnail } from "interfaces/interface";
import { makeStyles } from "@mui/styles";
import useAxios from "hooks/useAxios";
import { getUsers } from "redux/authSlice";

const useStyles = makeStyles({
    containerBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingAlias: {
        fontSize: "18px !important",
        lineHeight: "26px !important",
        textTransform: "capitalize",
        color: "#212121",
        paddingTop: "6px",
    },
    linkAddAlias: {
        textDecoration: "none",
        color: "#fff",
        alignItems: "center",
        display: "flex",
        textTransform: "capitalize",
    },
    linkTrash: {
        textDecoration: "none",
        color: "#2f80ed",
        fontSize: "14px",
        marginLeft: "16px",
    },
    thumbnailProduct: {
        width: "80px",
        height: "100px",
        margin: "16px",
        objectFit: "contain",
    },
    titleForm: {
        fontWeight: "700 !important",
        color: "var(--primary-color)",
        fontSize: "24px !important",
    },
});

const AdminUser = () => {
    const dispatch = useAppDispatch();
    const { entities, users } = useSelector((state: RootState) => state.auth);

    const classes = useStyles();
    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        { field: "surname", headerName: "Họ đệm", width: 200 },
        { field: "name", headerName: "Tên", width: 150 },
        { field: "email", headerName: "Email", width: 350 },
        {
            field: "phone",
            headerName: "Số điện thoại",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "role",
            headerName: "Vai trò",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
    ];

    useEffect(() => {
        dispatch(getUsers(axiosRefresh));
    }, [dispatch]);

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={`${classes.headingAlias}`}>Quản lý người dùng</Typography>
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                />
            </div>
        </>
    );
};

export default AdminUser;
