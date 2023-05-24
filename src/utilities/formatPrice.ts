export const formatPrice = (price: string | number, discount?: string) => {
    if (discount) {
        price = new Intl.NumberFormat("vi-VI").format(
            (Number(price) * (100 - Number(discount))) / 100
        );
    } else {
        price = new Intl.NumberFormat("vi-VI").format(Number(price));
    }

    return price;
};
