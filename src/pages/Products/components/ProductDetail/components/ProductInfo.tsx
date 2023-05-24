import { Typography, Grid, Box, Button } from "@mui/material";
import { formatPrice } from "utilities/formatPrice";
import { CartItem, Policy, Product } from "interfaces/interface";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { HG_RESOURCE } from "base/resource";
import { useDispatch } from "react-redux";
import { addItem } from "redux/cartSlice";

interface ProductInfoProps {
    product: Product;
}

interface Info {
    size: any;
    color: any;
    quantity: string | number;
}

const useStyles = makeStyles({
    productName: {
        fontWeight: "700 !important",
        fontSize: "32px !important",
        lineHeight: "unset !important",
    },
    productDiscount: {
        color: "#dc2b2b",
        alignItems: "center",
        fontSize: "14px",
        padding: "3px 8px",
        fontWeight: "bold",
        marginLeft: "10px",
    },
    productPromotion: {
        padding: "10px",
        position: "relative",
        marginBottom: "16px",
        border: "2px dashed #B00002",
        marginTop: "30px",
        borderRadius: "4px",
    },
    productDiscountCode: {
        border: "1px solid #dc2b2b",
        color: "#dc2b2b",
        borderRadius: "5px",
        padding: "3px 12px",
        fontSize: "14px",
        overflow: "hidden",

        "&:after": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "10px",
            height: "10px",
            background: "#fff",
            border: "1px solid #dc2b2b",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-5px",
            zIndex: 1,
        },
        "&:before": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "10px",
            height: "10px",
            background: "#fff",
            border: "1px solid #dc2b2b",
            top: "50%",
            transform: "translateY(-50%)",
            left: "-5px",
            zIndex: 1,
        },
    },
    productSize: {
        borderColor: "var(--primary-color) !important",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background: "#000",
        fontSize: "14px",

        "&:after": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            background:
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCw8RJSHXzNuNAAAAfElEQVQoz7WRsQ2CYBQGLwRCaLRkDwqdwcLCSZjCmj2AgtoJXMbEUquzEAz+8Je89r675sGG59ka0ig+0ZFbJDGbgRwoAXemi/hb1QZw793ebB739cPgTdV2qvzZAFY+VL+VwB4nB59j5RLYhBVXcTBZw7NJDAN49LrFyz67GnkMHStx0wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0xNVQxNzozNzozMyswMDowMGfDTJEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMTVUMTc6Mzc6MzMrMDA6MDAWnvQtAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            top: "3px",
            right: "4px",
            width: "6px",
            height: "6px",
            zIndex: 1,
        },

        "&:before": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "26px",
            height: "24px",
            background: "var(--primary-color)",
            transform: "rotate(45deg)",
            border: "1px solid var(--primary-color)",
            top: "-12px",
            right: "-12px",
            zIndex: 1,
        },
    },
    productQuantity: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 16px",
        border: "1px solid #000",
        borderRadius: "10px",
    },
    btnBuy: {
        width: "100%",
        backgroundColor: "var(--primary-color) !important",
        color: "#fff !important",
        fontSize: "16px !important",
        margin: "20px 0 6px !important",

        "&:hover": {
            backgroundColor: "var(--primary-color)",
            opacity: 0.8,
        },
    },
    productPolocies: {
        fontSize: "14px",
        borderTop: "1px dashed #ECECEC",
        justifyContent: "space-between",
        padding: "16px",
    },
    productTabs: {
        borderBottom: "1px solid rgb(0 0 0 / 8%)",
    },

    colorThumbnail: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "60%",
        borderRadius: "10px",
        margin: "2px",
    },
    addCartBtn: {
        "&:hover": {
            borderColor: "var(--primary-color) !important",
            backgroundColor: "#000 !important",
            color: "#fff",
        },
    },
    policy: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontSize: "13px",
    },
    policyTitle: {
        color: "#000",
        fontSize: "18px !important",
        fontWeight: "600 !important",
        margin: "16px 0",
        width: "100%",
        marginBottom: "10px !important",
    },
    policyText: {
        marginBottom: "16px",
        color: "#666666",
        fontSize: "14px !important",
        lineHeight: "2.5 !important",
    },
    colorActive: {
        border: "2px solid var(--primary-color)",
        borderRadius: "12px",
    },
});

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [info, setInfo] = useState<Info>({
        size: product?.sizes?.[0],
        color: product?.colors?.[0],
        quantity: 1,
    });

    useEffect(() => {
        setInfo({ ...info, size: product?.sizes?.[0], color: product?.colors?.[0] });
    }, [JSON.stringify(product)]);

    const descriptionLines = product?.description?.split("\r\n");
    const { size, color, quantity } = info;
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDecreaseQuantity = () => {
        if (Number(quantity) > 1) {
            setInfo({ ...info, quantity: (quantity as number) - 1 });
        } else {
            setInfo({ ...info, quantity: 1 });
        }
    };

    const handleIncreaseQuantity = () => {
        if (Number(quantity) < Number(product?.quantity)) {
            setInfo({ ...info, quantity: (quantity as number) + 1 });
        } else {
            setInfo({ ...info, quantity: Number(product?.quantity) });
        }
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value !== "") {
            const inputQuantity = Number(e.target.value);
            if (inputQuantity <= 0 || isNaN(inputQuantity)) {
                setInfo({ ...info, quantity: 1 });
            } else if (inputQuantity < Number(product?.quantity)) {
                setInfo({ ...info, quantity: inputQuantity });
            } else {
                setInfo({ ...info, quantity: Number(product?.quantity) });
            }
        } else {
            setInfo({ ...info, quantity: e.target.value });
        }
    };

    const handelAddItemToCart = () => {
        try {
            const item: CartItem = {
                thumbnail: product.thumbnails[0].url,
                color: info.color as any,
                price: product.price,
                productId: product?._id,
                productName: product.name,
                quantity: info.quantity,
                size: info.size as any,
                discount: product.discount,
            };

            dispatch(addItem(item));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginTop: "32px" }}>
            <Typography className={classes.productName}>{product.name}</Typography>

            <Box sx={{ margin: "0 0 24px 0" }}>
                <Grid container alignItems={"center"}>
                    <Box sx={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
                        {formatPrice(product.price, product.discount)}đ
                    </Box>

                    {product.discount ? (
                        <del
                            style={{
                                margin: "0 12px",
                                fontSize: "16px",
                                color: "#333",
                                fontWeight: "600",
                            }}
                        >
                            {formatPrice(product.price)}đ
                        </del>
                    ) : (
                        <></>
                    )}

                    {product.discount ? (
                        <Box className={classes.productDiscount}>-{product.discount}%</Box>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "32px", fontSize: "14px" }}>
                <span style={{ marginBottom: "8px", display: "block" }}>
                    Kích thước:<strong> {size?.sizeName}</strong>
                </span>

                <Grid container>
                    {product?.sizes?.map((size: any, index: number) => (
                        <Box
                            key={index}
                            onClick={() => setInfo({ ...info, size: size })}
                            className={`${
                                index ===
                                    product?.sizes
                                        ?.map((size: any) => size?.sizeName)
                                        .indexOf(info.size?.sizeName) && classes.productSize
                            }`}
                            sx={{
                                padding: "6px",
                                height: "28px",
                                minWidth: "60px",
                                border: "1px solid #cccccc",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "10px",
                                cursor: "pointer",
                            }}
                        >
                            {size?.sizeName}
                        </Box>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "32px", fontSize: "14px" }}>
                <span style={{ marginBottom: "8px", display: "block" }}>
                    Màu sắc: <strong>{color?.colorName}</strong>
                </span>
                <Grid container>
                    {product?.colors?.map((color: any, index: number) => (
                        <Box
                            key={index}
                            onClick={() => setInfo({ ...info, color: color })}
                            sx={{ width: "60px", marginRight: "10px" }}
                            className={`${
                                index ===
                                    product?.colors
                                        ?.map((color: any) => color?.colorName)
                                        .indexOf(info.color?.colorName) && classes.colorActive
                            }`}
                        >
                            <div
                                style={{ backgroundImage: `url(${color.thumbnail})` }}
                                className={classes.colorThumbnail}
                            ></div>
                        </Box>
                    ))}
                </Grid>
            </Box>
            <div style={{ textAlign: "left", marginBottom: "8px" }}>
                {product?.quantity} sản phẩm sẵn có
            </div>
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
                <Box className={classes.productQuantity}>
                    <RemoveIcon
                        fontSize='small'
                        onClick={handleDecreaseQuantity}
                        sx={{ cursor: "pointer" }}
                    />
                    <input
                        style={{
                            width: "60px",
                            border: "none",
                            outline: "none",
                            textAlign: "center",
                        }}
                        value={quantity}
                        onChange={(e) => handleChangeQuantity(e)}
                    />
                    <AddIcon
                        fontSize='small'
                        onClick={handleIncreaseQuantity}
                        sx={{ cursor: "pointer" }}
                    />
                </Box>

                <Button
                    color='warning'
                    variant='outlined'
                    sx={{
                        ml: 2,
                        flex: 1,
                        borderRadius: "10px",
                        borderColor: "var(--primary-color)",
                        color: "var(--primary-color)",
                    }}
                    className={classes.addCartBtn}
                    onClick={handelAddItemToCart}
                >
                    thêm vào giỏ hàng
                </Button>
            </Grid>
            <Button color='warning' variant='outlined' className={classes.btnBuy}>
                mua ngay
            </Button>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                Gọi đặt mua{" "}
                <Link to='/' style={{ textDecoration: "none", color: "var(--primary-color)" }}>
                    1900.6750
                </Link>{" "}
                (7:30 - 22:00)
            </Box>
            <Grid container className={classes.productPolocies} spacing={2}>
                {HG_RESOURCE.PRODUCT_POLICY?.map((policy: Policy, index: number) => (
                    <Grid item xs={4} key={index}>
                        <div className={classes.policy}>
                            <img src={policy.image} alt='anh' /> {policy.title}
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Typography className={classes.policyTitle}>Đặc điểm nổi bật</Typography>
            {descriptionLines?.map((line: string, index: number) => (
                <Typography key={index} className={classes.policyText}>
                    {line}
                </Typography>
            ))}
        </div>
    );
};
export default ProductInfo;
