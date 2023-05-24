import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CartItem, Color, Product } from "interfaces/interface";
import { makeStyles } from "@mui/styles";
import { formatPrice } from "utilities/formatPrice";
import "./Cardproduct.scss";
import { useAppDispatch } from "redux/store";
import { addItem } from "redux/cartSlice";
import { toast } from "react-toastify";

export interface CardProductProps {
    products: Product[];
    totalColumn: any;
    spacing: any;
    columns: any;
}

const useStyles = makeStyles({
    thumbnailProduct: {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "150%",
        borderRadius: "8px",
    },
    productTrademark: {
        fontSize: "13px !important",
        textTransform: "uppercase",
        color: "#969696",
        letterSpacing: "1.8px",
        marginTop: "10px !important",
        display: "block",
    },
    productLink: {
        textDecoration: "none",
        color: "#111",
    },
    productName: {
        fontSize: "14px",
        lineHeight: "1.2em !important",
        height: "2.4em",
        fontWeight: 400,
        marginBottom: "0.75rem !important",
        display: "block",
    },
    productPrices: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    productPrice: {
        color: "#242424",
        fontWeight: "700 !important",
        marginRight: "14px !important",
    },
    productPromotional: {
        color: "#c4c4c4",
        fontSize: "14px !important",
        fontWeight: "600 !important",
        display: " flex",
        alignItems: "center",
    },
    productDiscount: {
        alignItems: "center",
        color: "red",
        marginLeft: "10px !important",
        fontSize: "14px !important",
        lineHeight: "18px",
        textAlign: "left",
        fontWeight: "500 !important",
    },
    colorThumbnail: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "60%",
        borderRadius: "10px",
        marginRight: "6px",
    },
});

const CardProduct: React.FC<CardProductProps> = ({ products, totalColumn, spacing, columns }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Product) => {
        e.stopPropagation();
        e.preventDefault();

        const item: CartItem = {
            thumbnail: product.thumbnails[0].url,
            color: product.colors[0] as any,
            price: product.price,
            productId: product?._id,
            productName: product.name,
            quantity: 1,
            size: product.sizes[0] as any,
            discount: product.discount,
        };

        dispatch(addItem(item));
        toast("Giỏ hàng đã được cập nhật.");
    };

    return (
        <Grid item container spacing={spacing} columns={columns}>
            {products?.map((product) => (
                <Grid item xs={totalColumn} key={product?._id} sx={{ marginBottom: "32px" }}>
                    <Link
                        to={`/product/${product?._id}`}
                        style={{ position: "relative" }}
                        className='img-product'
                    >
                        <Box
                            sx={{
                                backgroundImage: `url(${product?.thumbnails?.[0].url})`,
                            }}
                            className={classes.thumbnailProduct}
                        ></Box>
                        <div className='add-to-cart' onClick={(e) => handleAddToCart(e, product)}>
                            Thêm vào giỏ hàng
                        </div>
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            margin: "12px 0",
                        }}
                    >
                        {product?.colors?.map((color: any) => (
                            <Box
                                key={color._id}
                                sx={{
                                    width: "35px",
                                }}
                            >
                                <div
                                    style={{ backgroundImage: `url(${color?.thumbnail})` }}
                                    className={classes.colorThumbnail}
                                ></div>
                            </Box>
                        ))}
                    </div>
                    <Link to={`/product/${product?._id}`} className={classes.productLink}>
                        <Typography
                            className={classes.productName}
                            sx={{
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: "2",
                                overflow: "hidden",
                                display: "-webkit-box",
                            }}
                        >
                            {product?.name}
                        </Typography>
                    </Link>
                    <Box className={classes.productPrices}>
                        <Typography
                            className={classes.productPrice}
                            component={"span"}
                            variant={"body2"}
                        >
                            {Number(product?.discount) !== 0 ? (
                                <div>
                                    {formatPrice(
                                        (Number(product?.price) *
                                            (100 - Number(product?.discount))) /
                                            100
                                    )}
                                    <u>đ</u>
                                </div>
                            ) : (
                                <div>{formatPrice(product?.price)}đ</div>
                            )}
                        </Typography>
                        <Typography
                            className={classes.productPromotional}
                            component={"span"}
                            variant={"body2"}
                        >
                            {Number(product?.discount) !== 0 && (
                                <div>
                                    <del>{formatPrice(product?.price)}đ</del>
                                    <Typography
                                        className={classes.productDiscount}
                                        component={"span"}
                                        variant={"body2"}
                                    >
                                        -{product?.discount}%
                                    </Typography>
                                </div>
                            )}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardProduct;
