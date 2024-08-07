import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login.page";
import { Toaster } from "./components/ui/toaster";
import AdminPageShell from "@/pages/admin/shell";
import AdminUserPage from "@/pages/admin/user.page";
import AdminBuildingPage from "@/pages/admin/building.page";
import AdminBillTypePage from "@/pages/admin/bill-type.page";
import AdminApartmentPage from "@/pages/admin/apartment.page";
import AdminResidentPage from "@/pages/admin/resident.page";
import AdminBillPage from "@/pages/admin/bill.page";
import AdminRepairPage from "@/pages/admin/repair.page";
import AdminMeetingPage from "@/pages/admin/meeting.page";
import AdminPollPage from "@/pages/admin/poll.page";
import AdminVotePage from "@/pages/admin/vote.page";
import AdminDashboardPage from "@/pages/admin/dashboard.page";
import MainPage from "@/pages/main.page";

export default function App() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/admin' element={<AdminPageShell/>}>
                    <Route path="dashboard" element={<AdminDashboardPage/>}/>
                    <Route path="buildings" element={<AdminBuildingPage/>}/>
                    <Route path="building/:buildingId/apartments" element={<AdminApartmentPage/>} />
                    <Route path="building/:buildingId/apartment/:apartmentId/residents" element={<AdminResidentPage/>} />
                    <Route path="building/:buildingId/apartment/:apartmentId/bills" element={<AdminBillPage/>} />
                    <Route path="building/:buildingId/apartment/:apartmentId/repairs" element={<AdminRepairPage/>} />
                    <Route path="building/:buildingId/meetings" element={<AdminMeetingPage/>} />
                    <Route path="building/:buildingId/polls" element={<AdminPollPage/>} />
                    <Route path="building/:buildingId/poll/:pollId/votes" element={<AdminVotePage/>} />
                    <Route path="bill-types" element={<AdminBillTypePage/>}/>
                    <Route path="users" element={<AdminUserPage/>}/>
                    <Route path="*" element={<Navigate to="/admin/dashboard"/>}/>
                    <Route path="" element={<Navigate to="/admin/dashboard"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
    </>

}
