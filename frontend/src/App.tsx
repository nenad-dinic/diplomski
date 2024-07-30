import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login.page";
import { Toaster } from "./components/ui/toaster";
import AdminPageShell from "@/pages/admin/shell";
import AdminUserPage from "@/pages/admin/user.page";
import AdminBuildingPage from "@/pages/admin/building.page";
import AdminBillTypePage from "@/pages/admin/bill-type.page";

export default function App() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/admin' element={<AdminPageShell/>}>
                    <Route path="buildings" element={<AdminBuildingPage/>}/>
                    <Route path="bill-types" element={<AdminBillTypePage/>}/>
                    <Route path="users" element={<AdminUserPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
    </>

}
