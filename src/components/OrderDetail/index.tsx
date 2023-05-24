import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { RootState, useAppDispatch } from "redux/store";
import { getOrder } from "redux/orderSlice";
import "./orderDetail.scss";
import useAxios from "hooks/useAxios";
import { formatPrice } from "utilities/formatPrice";
import { Order } from "interfaces/interface";
import NotFound from "components/NotFound";
import orderApi from "api/orderApi";
import { toast } from "react-toastify";

const OrderDetail = () => {
    const { orders } = useSelector((state: RootState) => state.order);
    const dispatch = useAppDispatch();
    const axiosRefresh = useAxios();
    const [filter, setFilter] = useState("Tất cả");
    const [ordersFilter, setOrdersFilter] = useState<Order[]>([]);

    useEffect(() => {
        dispatch(getOrder(axiosRefresh));
    }, [dispatch]);

    useEffect(() => {
        if (filter === "Tất cả") {
            setOrdersFilter(orders);
        } else {
            setOrdersFilter(orders?.filter((_) => _.status === filter));
        }
    }, [JSON.stringify(orders), filter]);

    const changeStatus = (id: string | undefined, status: string | undefined) => {
        switch (status) {
            case "Chờ xác nhận":
                toast
                    .promise(orderApi.changeStatusOrder(id, "Đã hủy", axiosRefresh), {
                        pending: "Đang xử lý.",
                        success: "Đơn hàng đã được hủy.",
                        error: {
                            render({ data }) {
                                const { response } = data;
                                return `Cập nhật trạng thái đơn hàng thất bại.`;
                            },
                        },
                    })
                    .then(() => dispatch(getOrder(axiosRefresh)));
                break;
            case "Chờ lấy hàng":
                toast
                    .promise(orderApi.changeStatusOrder(id, "Đã hủy", axiosRefresh), {
                        pending: "Đang xử lý.",
                        success: "Đơn hàng đã được hủy.",
                        error: {
                            render({ data }) {
                                const { response } = data;
                                return `Cập nhật trạng thái đơn hàng thất bại.`;
                            },
                        },
                    })
                    .then(() => dispatch(getOrder(axiosRefresh)));
                break;
            case "Đang giao":
                toast
                    .promise(orderApi.changeStatusOrder(id, "Đã giao", axiosRefresh), {
                        pending: "Đang xử lý.",
                        success: "Đơn hàng giao thành công.",
                        error: {
                            render({ data }) {
                                const { response } = data;
                                return `Cập nhật trạng thái đơn hàng thất bại.`;
                            },
                        },
                    })
                    .then(() => dispatch(getOrder(axiosRefresh)));
                break;
        }
    };

    return (
        <div className='wrapper-order__details search'>
            <Container maxWidth='xl' className='container order-details-main'>
                <Grid container>
                    <Grid xs={1}></Grid>
                    <Grid item xs={10}>
                        <Grid container columns={15}>
                            <Grid
                                item
                                xs={3}
                                className={`filter-order ${
                                    filter === "Tất cả" ? "filter-order--active" : ""
                                }`}
                                onClick={() => setFilter("Tất cả")}
                            >
                                Tất cả
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                className={`filter-order ${
                                    filter === "Chờ xác nhận" ? "filter-order--active" : ""
                                }`}
                                onClick={() => setFilter("Chờ xác nhận")}
                            >
                                Chờ xác nhận
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                className={`filter-order ${
                                    filter === "Đang giao" ? "filter-order--active" : ""
                                }`}
                                onClick={() => setFilter("Đang giao")}
                            >
                                Đang giao
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                className={`filter-order ${
                                    filter === "Đã giao" ? "filter-order--active" : ""
                                }`}
                                onClick={() => setFilter("Đã giao")}
                            >
                                Đã giao
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                className={`filter-order ${
                                    filter === "Đã hủy" ? "filter-order--active" : ""
                                }`}
                                onClick={() => setFilter("Đã hủy")}
                            >
                                Đã hủy
                            </Grid>
                            <Grid item xs={15} className='col-md-12' id='filter-order'>
                                {ordersFilter.length ? (
                                    <div>
                                        {ordersFilter?.map((order) => (
                                            <div
                                                className='row order__details-items'
                                                key={order._id}
                                            >
                                                <div
                                                    style={{
                                                        color: "#ee4d2d",
                                                        fontWeight: 400,
                                                        fontSize: "0.875rem",
                                                        borderBottom: "1px solid #dee2e6",
                                                        padding: "20px 0",
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {order.status}
                                                </div>
                                                {order?.products?.map((product) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            borderBottom: "1px solid #dee2e6",
                                                            padding: "10px 0",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <img
                                                                className='order-details__img'
                                                                src={`${product.thumbnail}`}
                                                                alt=''
                                                            />
                                                            <div className='order-details__title'>
                                                                {product.name}
                                                                <div className='order-details__num'>
                                                                    x{product.quantity}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='order-details__price'>
                                                            {product.discount ? (
                                                                <div>
                                                                    <del
                                                                        style={{
                                                                            marginRight: "8px",
                                                                        }}
                                                                    >
                                                                        {formatPrice(product.price)}
                                                                        đ
                                                                    </del>
                                                                    {formatPrice(
                                                                        (product.price *
                                                                            (100 -
                                                                                product.discount)) /
                                                                            100
                                                                    )}
                                                                    đ
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {formatPrice(product.price)}đ
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        margin: "20px 0",
                                                    }}
                                                >
                                                    <div style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                                                        <strong style={{ marginRight: "8px" }}>
                                                            Địa chỉ:
                                                        </strong>
                                                        {order.address}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "flex-start",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <svg
                                                                width='16'
                                                                height='17'
                                                                viewBox='0 0 253 263'
                                                                fill='none'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                            >
                                                                <path
                                                                    fill-rule='evenodd'
                                                                    clip-rule='evenodd'
                                                                    d='M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z'
                                                                    fill='#ee4d2d'
                                                                ></path>
                                                                <path
                                                                    fill-rule='evenodd'
                                                                    clip-rule='evenodd'
                                                                    d='M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z'
                                                                    fill='#fff'
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                        <div style={{ marginLeft: "8px" }}>
                                                            Tổng số tiền:{" "}
                                                            <span style={{ color: "#ee4d2d" }}>
                                                                {formatPrice(order.sumMoney)}đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                    }}
                                                >
                                                    {(order.status === "Chờ xác nhận" ||
                                                        order.status === "Chờ lấy hàng") && (
                                                        <div
                                                            className='action-cancel '
                                                            onClick={() =>
                                                                changeStatus(
                                                                    order._id,
                                                                    order.status
                                                                )
                                                            }
                                                        >
                                                            Hủy Đơn
                                                        </div>
                                                    )}
                                                    {order.status === "Đang giao" && (
                                                        <div
                                                            className='action-confirm'
                                                            onClick={() =>
                                                                changeStatus(
                                                                    order._id,
                                                                    order.status
                                                                )
                                                            }
                                                        >
                                                            Xác Nhận Nhận Hàng
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ padding: "80px 0" }}>
                                        <NotFound />
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={1}></Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default OrderDetail;
