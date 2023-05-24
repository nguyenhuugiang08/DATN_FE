import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "interfaces/interface";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { getAllCategory } from "redux/categorySlice";
import categoryApi from "api/categoryApi";
import useAxios from "hooks/useAxios";

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
    },
    titleForm: {
        fontWeight: "700 !important",
        color: "var(--primary-color)",
        fontSize: "24px !important",
    },
});

const AdminCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);

    const dispatch = useAppDispatch();
    const { categories } = useSelector((state: RootState) => state.category);
    const navigate = useNavigate();

    const classes = useStyles();

    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        { field: "_id", headerName: "Mã danh mục", width: 320, sortable: false },
        { field: "name", headerName: "Tên danh mục", width: 240, sortable: false },
        {
            field: "deleted",
            headerName: "Trạng thái xóa",
            width: 170,
            renderCell(params) {
                return <div>{params.value ? "Đã xóa" : "Đang sử dụng"}</div>;
            },
            sortable: false,
        },
        {
            field: "action",
            headerName: "Hành động",
            sortable: false,
            width: 200,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                const onClickEditCategory = (
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    navigate(`edit-category/${thisRow._id}`);
                };

                const onClickDeleteCategory = (
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    const category = {} as Category;
                    category["_id"] = thisRow["_id"]!.toString();
                    category["name"] = thisRow["name"]!.toString();
                    category["deleted"] = Boolean(thisRow["deleted"]);

                    setIsOpen(true);
                    setSelectedCategory(category);
                };

                return (
                    <>
                        <Button onClick={onClickEditCategory} color='warning'>
                            <EditIcon fontSize='small' />
                        </Button>
                        <Button onClick={onClickDeleteCategory} color='error'>
                            <DeleteIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteCategory = () => {
        const deleteCategory = async () => {
            try {
                await categoryApi.deleteCategory(selectedCategory._id, axiosRefresh);
            } catch (error) {
                console.log(error);
            }
        };

        handleClose();
        toast
            .promise(deleteCategory, {
                pending: "Đang chờ xử lý",
                success: "Xóa category thành công",
                error: {
                    render({ data }) {
                        const { response } = data;
                        return `Xóa category thất bại ${response.data?.message}`;
                    },
                },
            })
            .then(() => dispatch(getAllCategory()));
    };

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={`${classes.headingAlias}`}>Danh mục sản phẩm</Typography>
                <Button color='success' variant='contained'>
                    <Link to='create-category' className={classes.linkAddAlias}>
                        <CreateNewFolderIcon sx={{ mr: 1 }} />
                        Thêm mới
                    </Link>
                </Button>
            </Box>
            <div style={{ minHeight: 620, height: 400, width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={categories}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'> User </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Bạn có chắc chắn muốn xóa category này?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary' variant='contained'>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteCategory} color='error' variant='contained'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AdminCategory;
