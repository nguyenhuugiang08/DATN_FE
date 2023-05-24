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
import { Product, Thumbnail } from "interfaces/interface";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { getProductByFilters } from "redux/productSlice";
import productApi from "api/productApi";
import useAxios from "hooks/useAxios";
import { formatPrice } from "utilities/formatPrice";

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
});

const AdminCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);

    const dispatch = useAppDispatch();
    const { products } = useSelector((state: RootState) => state.product);
    const navigate = useNavigate();

    const classes = useStyles();
    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        {
            field: "thumbnails",
            headerName: "Ảnh sản phẩm",
            width: 180,
            headerClassName: "MuiDataGrid-columnHeaders--product",
            renderCell: (params) => {
                const listThumbnails: Thumbnail[] = params.value;
                return (
                    <>
                        {listThumbnails?.map(
                            (thumbnail: Thumbnail, index: number) =>
                                index === 0 && (
                                    <img
                                        src={thumbnail.url}
                                        alt='thumbnail'
                                        key={thumbnail._id}
                                        className={classes.thumbnailProduct}
                                    />
                                )
                        )}
                    </>
                );
            },
        },
        { field: "_id", headerName: "Mã sản phẩm", width: 240 },
        { field: "name", headerName: "Tên sản phẩm", width: 400 },
        {
            field: "quantity",
            headerName: "Số lượng",
            width: 160,
            valueFormatter: (params) => formatPrice(params?.value),
        },
        {
            field: "price",
            headerName: "Giá bán",
            width: 120,
            valueFormatter: (params) => formatPrice(params?.value),
        },
        {
            field: "action",
            headerName: "Hành động",
            sortable: false,
            width: 100,
            renderCell: (params) => {
                const onClickEditProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    navigate(`edit-product/${thisRow._id}`);
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

                    const product = {} as Product;
                    product["_id"] = thisRow["_id"]!.toString();
                    product["name"] = thisRow["name"]!.toString();

                    setIsOpen(true);
                    setSelectedProduct(product);
                };

                return (
                    <>
                        <Button onClick={onClickEditProduct} color='warning'>
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
        dispatch(getProductByFilters());
    }, [dispatch]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteProduct = () => {
        const deleteProduct = async () => {
            try {
                await productApi.deleteProduct(selectedProduct._id, axiosRefresh);
            } catch (error) {
                console.log(error);
            }
        };

        handleClose();
        toast
            .promise(deleteProduct, {
                pending: "Đang chờ xử lý",
                success: "Xóa product thành công",
                error: {
                    render({ data }) {
                        const { response } = data;
                        return `Xóa prodcut thất bại ${response.data?.message}`;
                    },
                },
            })
            .then(() => dispatch(getProductByFilters()));
    };

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingAlias}>sản phẩm</Typography>
                <Button color='success' variant='contained'>
                    <Link to='create-product' className={classes.linkAddAlias}>
                        <CreateNewFolderIcon sx={{ mr: 1 }} />
                        Thêm mới
                    </Link>
                </Button>
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={products}
                    loading={products.length === 0}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    pagination={true}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
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
                        <Button onClick={handleDeleteProduct} color='error' variant='contained'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AdminCategory;
