import Home from "../pages/Home";
import ProductDetail from "../pages/Products/components/ProductDetail";
import { Navigate, RouteObject, useLocation, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "components/Login";
import Register from "components/Register";
import ForgotPassword from "components/ForgotPassword";
import ResetPassword from "components/ResetPassword";
import qs from "query-string";
import AdminProduct from "components/Admin/pages/AdminProduct";
import AdminCategory from "components/Admin/pages/AdminCategory";
import AdminUser from "components/Admin/pages/AdminUser";
import AdminNews from "components/Admin/pages/AdminNews";
import AdminOrder from "components/Admin/pages/AdminOrder";
import EditCategory from "components/Admin/pages/AdminCategory/components/EditCategory";
import CreateCategory from "components/Admin/pages/AdminCategory/components/CreateCategory";
import TrashCategries from "components/Admin/pages/AdminCategory/components/TrashCategries";
import CreateProduct from "components/Admin/pages/AdminProduct/components/CreateProduct";
import TrashProduct from "components/Admin/pages/AdminProduct/components/TrashProduct";
import EditProduct from "components/Admin/pages/AdminProduct/components/EditProduct";
import Products from "../pages/Products";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect, useState } from "react";
import EditNews from "components/Admin/pages/AdminNews/components/EditNews";
import CreateNews from "components/Admin/pages/AdminNews/components/CreateNews";
import TrashNews from "components/Admin/pages/AdminNews/components/TrashNews";

const RouterApp: React.FC = () => {
    const { search } = useLocation();
    const { query } = qs.parseUrl(search);
    const { email } = query;
    const { entities } = useSelector((state: RootState) => state.auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (entities?.[0]?.role === "admin") {
            setIsAdmin(entities?.[0]?.role === "admin");
        }
    }, [entities]);

    const pulicRouters: RouteObject[] = [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
            ],
        },
        {
            path: "product",
            element: <MainLayout />,
            children: [
                { path: "/product", element: <Products /> },
                {
                    path: ":id",
                    element: <ProductDetail />,
                },
            ],
        },
        {
            path: "account",
            element: <MainLayout />,
            children: [
                { path: "login", element: <Login /> },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword />,
                },
                {
                    path: "reset-password",
                    element: email ? <ResetPassword /> : <Navigate to='/account/login' replace />,
                },
            ],
        },
    ];

    const privateRouters: RouteObject[] = [
        {
            path: "admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin",
                    element: isAdmin ? <Home /> : <Navigate to='/' replace />,
                },
            ],
        },
        {
            path: "admin/categories",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/categories",
                    element: <AdminCategory />,
                },
                {
                    path: "edit-category/:id",
                    element: <EditCategory />,
                },
                {
                    path: "create-category",
                    element: <CreateCategory />,
                },
                {
                    path: "trash-categories",
                    element: <TrashCategries />,
                },
            ],
        },
        {
            path: "admin/products",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/products",
                    element: <AdminProduct />,
                },
                {
                    path: "edit-product/:id",
                    element: <EditProduct />,
                },
                {
                    path: "create-product",
                    element: <CreateProduct />,
                },
                {
                    path: "trash-products",
                    element: <TrashProduct />,
                },
            ],
        },
        {
            path: "admin/news",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/news",
                    element: <AdminNews />,
                },
                {
                    path: "edit-news/:id",
                    element: <EditNews />,
                },
                {
                    path: "create-news",
                    element: <CreateNews />,
                },
                {
                    path: "trash-news",
                    element: <TrashNews />,
                },
            ],
        },
        {
            path: "admin/users",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/users",
                    element: <AdminUser />,
                },
                {
                    path: "create-user",
                    element: <CreateCategory />,
                },
            ],
        },
    ];

    const routing = useRoutes([...pulicRouters, ...privateRouters]);

    return <>{routing}</>;
};

export default RouterApp;
