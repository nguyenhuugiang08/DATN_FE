export const formatDate = (dateTime: Date | string) => {
    try {
        if (dateTime) {
            dateTime = new Date(dateTime);
            let date = dateTime.getDate() as string | number;
            let month = (dateTime.getMonth() + 1) as string | number;
            let year = dateTime.getFullYear() as string | number;

            date = Number(date) < 10 ? `0${date}` : date;
            month = Number(month) < 10 ? `0${month}` : month;

            return `${date}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
};
