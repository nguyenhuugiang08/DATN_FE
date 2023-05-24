import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAxios from "hooks/useAxios";
import { getAllOrder } from "redux/orderSlice";
import { formatDate } from "utilities/formatDatetime";
import { formatPrice } from "utilities/formatPrice";
import { ProductInOrder } from "interfaces/interface";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import orderApi from "api/orderApi";

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

const AdminOrder = () => {
    const dispatch = useAppDispatch();
    const { allOrders } = useSelector((state: RootState) => state.order);

    const classes = useStyles();
    const axiosRefresh = useAxios();

    useEffect(() => {
        dispatch(getAllOrder(axiosRefresh));
    }, [dispatch]);

    const handleComfirm = (id: string | undefined) => {
        toast
            .promise(orderApi.changeStatusOrder(id, "Đang giao", axiosRefresh), {
                pending: "Đang xử lý.",
                success: "Đơn hàng đã được hủy.",
                error: {
                    render({ data }) {
                        const { response } = data;
                        return `Cập nhật trạng thái đơn hàng thất bại.`;
                    },
                },
            })
            .then(() => dispatch(getAllOrder(axiosRefresh)));
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Thông tin giao hàng",
            width: 250,
            valueGetter({ row }) {
                return {
                    name: row.name,
                    phone: row.phone,
                    address: row.address,
                };
            },
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "16px 0",
                        }}
                    >
                        <div>Người nhận: {params.value.name}</div>
                        <div>Số điện thoại: {params.value.phone}</div>
                        <div>Địa chỉ: {params.value.address}</div>
                    </div>
                );
            },
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
        },
        {
            field: "products",
            headerName: "Sản phẩm",
            width: 300,
            renderCell(params) {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxHeight: "180px",
                            overflow: "auto",
                            margin: "10px 0 10px 10px",
                        }}
                    >
                        {params.value?.map((product: ProductInOrder) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                }}
                            >
                                <img
                                    src={product.thumbnail}
                                    alt='ảnh'
                                    style={{
                                        width: "60px",
                                        height: "80px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                                <div style={{ marginLeft: "8px" }}>{product.name}</div>
                            </div>
                        ))}
                    </div>
                );
            },
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
        },
        {
            field: "createdAt",
            headerName: "Ngày đặt",
            width: 120,
            renderCell: (params) => {
                return <div>{formatDate(params.value)}</div>;
            },
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
        },
        {
            field: "sumMoney",
            headerName: "Tổng tiền",
            width: 120,
            renderCell: (params) => {
                return <div>{formatPrice(params.value)} VNĐ</div>;
            },
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
        },
        {
            field: "action",
            headerName: "Xác nhận đơn hàng",
            width: 170,
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
            valueGetter: ({ row }) => {
                return {
                    id: row._id,
                    status: row.status,
                };
            },
            renderCell(params) {
                return (
                    <Button
                        variant='contained'
                        disableElevation
                        disabled={params.value.status !== "Chờ xác nhận"}
                        onClick={() => handleComfirm(params.value.id)}
                    >
                        Xác nhận
                    </Button>
                );
            },
        },
        {
            field: "_id",
            headerName: "Xem chi tiết",
            width: 158,
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "header-table",
            renderCell(params) {
                return (
                    <Button variant='contained' disableElevation color='warning'>
                        <Link
                            to={`${params.value}`}
                            style={{ textDecoration: "none", color: "#fff", fontSize: "13px" }}
                        >
                            Xem chi tiết
                        </Link>
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={`${classes.headingAlias}`}>Quản lý đơn hàng</Typography>
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={allOrders}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                    showCellRightBorder={true}
                />
            </div>
        </>
    );
};

export default AdminOrder;
