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
import { News, Picture } from "interfaces/interface";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import useAxios from "hooks/useAxios";
import { getAllNews } from "redux/newsSlice";
import newsApi from "api/newsApi";

const useStyles = makeStyles({
    containerBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingNews: {
        fontSize: "18px !important",
        lineHeight: "26px !important",
        textTransform: "capitalize",
        color: "#212121",
        paddingTop: "6px",
    },
    linkAddNews: {
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
    pictureNews: {
        width: "160px",
        height: "100px",
        objectFit: "contain",
    },
});

const AdminNews = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<News>({} as News);

    const dispatch = useAppDispatch();
    const { listNews } = useSelector((state: RootState) => state.news);
    const navigate = useNavigate();

    const classes = useStyles();

    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        {
            field: "pictures",
            headerName: "Photo",
            width: 180,
            renderCell: (params) => {
                const listPictures: Picture[] = params.value;
                return (
                    <div>
                        {listPictures?.map(
                            (picture: Picture, index: number) =>
                                index === 0 && (
                                    <img
                                        src={picture.url}
                                        alt='Ppicture'
                                        key={picture._id}
                                        className={classes.pictureNews}
                                    />
                                )
                        )}
                    </div>
                );
            },
        },
        { field: "_id", headerName: "ID", width: 160, hide: true },
        { field: "title", headerName: "Title", width: 160 },
        { field: "content", headerName: "Content", width: 700, sortable: false },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const onClickEditNews = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    navigate(`edit-news/${thisRow._id}`);
                };

                const onClickDeleteNews = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    const news = {} as News;
                    news["_id"] = thisRow["_id"]!.toString();
                    news["title"] = thisRow["title"]!.toString();
                    news["content"] = thisRow["content"]!.toString();

                    setIsOpen(true);
                    setSelectedNews(news);
                };

                return (
                    <>
                        <Button onClick={onClickEditNews} color='warning'>
                            <EditIcon fontSize='small' />
                        </Button>
                        <Button onClick={onClickDeleteNews} color='error'>
                            <DeleteIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getAllNews());
    }, [dispatch]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteNews = () => {
        const deleteNews = async () => {
            try {
                await newsApi.deleteNews(selectedNews._id, axiosRefresh);
            } catch (error) {
                console.log(error);
            }
        };

        handleClose();
        toast
            .promise(deleteNews, {
                pending: "Đang chờ xử lý",
                success: "Xóa news thành công",
                error: {
                    render({ data }) {
                        const { response } = data;
                        return `Xóa news thất bại ${response.data?.message}`;
                    },
                },
            })
            .then(() => {
                dispatch(getAllNews());
            });
    };

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingNews}>Tin tức</Typography>
                <Button color='success' variant='contained'>
                    <Link to='create-news' className={classes.linkAddNews}>
                        <CreateNewFolderIcon sx={{ mr: 1 }} />
                        create
                    </Link>
                </Button>
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-News'
                    getRowId={(row) => row._id}
                    rows={listNews}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
                />
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'> User </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Bạn có chắc chắn muốn xóa news này?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary' variant='contained'>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteNews} color='error' variant='contained'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AdminNews;
