import "./AdminHome.scss";
import { Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReport } from "redux/othersSlice";
import { formatPrice } from "utilities/formatPrice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHome = () => {
    const dispatch = useAppDispatch();
    const { report } = useSelector((state: RootState) => state.others);
    const [year, setYear] = useState<string | undefined>("2023");

    const labels = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Doanh số",
                data: report?.revenueByMonthAllMonths?.map((item) => item / 1000000),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(255, 159, 64, 0.7)",
                    "rgba(255, 205, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                    "rgba(201, 203, 207, 0.7)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
            },
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    callback: function (value: number, index: number, values: number[]) {
                        return value + " Triệu";
                    },
                },
                min: 0,
                max: 10,
            },
        },
    };

    useEffect(() => {
        dispatch(getReport(year));
    }, [year, dispatch]);

    const handleChangeDataChart = (value: string | undefined) => {
        setYear(value);
    };

    return (
        <>
            <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "24px" }}>
                Tổng quan
            </div>
            <div>
                <div style={{ boxShadow: "0 2px 8px #ccc", padding: "24px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>Thông số về website</div>
                    <span style={{ fontSize: "11px" }}>Số liệu về website của bạn</span>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div
                                style={{
                                    padding: "16px 12px 8px 12px",
                                    marginTop: "16px",
                                    backgroundColor: "#00c76a",
                                    borderRadius: "4px",
                                }}
                                className='small-box'
                            >
                                <div
                                    className='inner'
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: "#fff" }}>{report?.countProduct}</h3>
                                        <h4 style={{ color: "#fff" }}>SẢN PHẨM</h4>
                                    </div>
                                    <div className='icon'>
                                        <i
                                            className='fa-brands fa-product-hunt '
                                            style={{ color: "rgba(0,0,0,0.2)", fontSize: "72px" }}
                                        ></i>
                                    </div>
                                </div>
                                <a
                                    href='/admin/products'
                                    className='small-box-footer small-box-footer__link'
                                >
                                    Chi tiết{" "}
                                    <i className='fas fa-arrow-circle-right small-box__icon'></i>
                                </a>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div
                                className='small-box '
                                style={{
                                    padding: "16px 12px 8px 12px",
                                    marginTop: "16px",
                                    backgroundColor: "#ffc107",
                                    borderRadius: "4px",
                                }}
                            >
                                <div
                                    className='inner'
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: "#fff" }}>{report?.countUser}</h3>
                                        <h4 style={{ color: "#fff" }}>NGƯỜI DÙNG</h4>
                                    </div>
                                    <div className='icon'>
                                        <i
                                            className='fa-solid fa-user-plus '
                                            style={{ color: "rgba(0,0,0,0.2)", fontSize: "72px" }}
                                        ></i>
                                    </div>
                                </div>
                                <a
                                    href='/admin/users'
                                    className='small-box-footer small-box-footer__link'
                                >
                                    Chi tiết{" "}
                                    <i className='fas fa-arrow-circle-right small-box__icon'></i>
                                </a>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div
                                className='small-box'
                                style={{
                                    padding: "16px 12px 8px 12px",
                                    marginTop: "16px",
                                    backgroundColor: "#0d6efd",
                                    borderRadius: "4px",
                                }}
                            >
                                <div
                                    className='inner'
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: "#fff" }}>{report?.countOrder}</h3>
                                        <h4 style={{ color: "#fff" }}>ĐƠN HÀNG</h4>
                                    </div>
                                    <div className='icon'>
                                        <i
                                            className='fa-solid fa-cart-plus'
                                            style={{ color: "rgba(0,0,0,0.2)", fontSize: "72px" }}
                                        ></i>
                                    </div>
                                </div>
                                <a
                                    href='/admin/orders'
                                    className='small-box-footer small-box-footer__link'
                                >
                                    Chi tiết{" "}
                                    <i className='fas fa-arrow-circle-right small-box__icon'></i>
                                </a>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div
                                className='small-box'
                                style={{
                                    padding: "16px 12px 8px 12px",
                                    marginTop: "16px",
                                    backgroundColor: "#dc3545",
                                    borderRadius: "4px",
                                }}
                            >
                                <div
                                    className='inner'
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: "#fff" }}>{report?.countCategory}</h3>
                                        <h4 style={{ color: "#fff" }}>DANH MỤC</h4>
                                    </div>
                                    <div className='icon'>
                                        <i
                                            className='fa-solid fa-clipboard-list'
                                            style={{ color: "rgba(0,0,0,0.2)", fontSize: "72px" }}
                                        ></i>
                                    </div>
                                </div>
                                <a
                                    href='/admin/categories'
                                    className='small-box-footer small-box-footer__link'
                                >
                                    Chi tiết{" "}
                                    <i className='fas fa-arrow-circle-right small-box__icon'></i>
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginTop: "40px",
                        boxShadow: "0 2px 8px #ccc",
                        padding: "24px",
                        borderRadius: "4px",
                    }}
                >
                    <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
                        Top 10 sản phẩm bán chạy nhất
                    </div>
                    <Grid container spacing={3}>
                        {report?.listProducts?.map((item, index) => (
                            <Grid
                                item
                                xs={4}
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative",
                                }}
                            >
                                <img
                                    src={item.thumbnails[0].url}
                                    alt='anh'
                                    style={{ height: "120px", width: "80px" }}
                                />
                                <div className='rank'>{index + 1}</div>
                                <div style={{ marginLeft: "12px" }}>
                                    <div>{item.name}</div>
                                    <div>Giá bán: {formatPrice(item.price)}đ</div>
                                    <div>Đã bán: {item.totalQuantity} sản phẩm</div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginTop: "40px",
                        boxShadow: "0 2px 8px #ccc",
                        padding: "24px",
                        borderRadius: "4px",
                    }}
                >
                    Thống kê doanh số theo năm(triệu đồng)
                    <div style={{ marginTop: "8px", fontWeight: "400" }}>
                        Lựa chọn năm:{" "}
                        <input
                            type='text'
                            value={year}
                            style={{
                                height: "28px",
                                width: "80px",
                                padding: "0 10px",
                                outline: "none",
                                border: "1px solid #bbb",
                                borderRadius: "4px",
                            }}
                            onChange={(e) => handleChangeDataChart(e.target.value)}
                        />
                    </div>
                    <Bar data={data} options={options as any} />
                </div>
            </div>
        </>
    );
};
export default AdminHome;
