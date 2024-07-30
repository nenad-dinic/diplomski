import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login.page";
import { Toaster } from "./components/ui/toaster";
import AdminPageShell from "@/pages/admin/shell";
import AdminUserPage from "@/pages/admin/user.page";

export default function App() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/admin' element={<AdminPageShell/>}>
                    <Route path="users" element={<AdminUserPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
    </>

}
