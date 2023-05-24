import HeaderAdmin from "components/Admin/components/HeaderAdmin";
import NavbarAdmin from "components/Admin/components/NavbarAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <NavbarAdmin />
            <div style={{ flex: 1 }}>
                <HeaderAdmin />
                <div
                    style={{
                        padding: "20px 20px 70px",
                        height: "calc(100vh - 72px)",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AdminLayout;
