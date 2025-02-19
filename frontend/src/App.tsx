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
import ManagerPageShell from "@/pages/manager/shell";
import ManagerBuildingPage from "@/pages/manager/building.page";
import ManagerApartmentPage from "@/pages/manager/apartment.page";
import ManagerResidentPage from "@/pages/manager/resident.page";
import ManagerPollPage from "@/pages/manager/poll.page";
import ManagerMeetingPage from "@/pages/manager/meeting.page";
import ResidentPageShell from "@/pages/resident/shell";
import ResidentApartmentPage from "@/pages/resident/apartment.page";
import ResidentPollPage from "@/pages/resident/poll.page";
import ResidentResidentPage from "@/pages/resident/resident.page";
import ResidentMeetingPage from "@/pages/resident/meeting.page";
import ResidentBillPage from "@/pages/resident/bill.page";
import ResidentRepairPage from "@/pages/resident/repair.page";
import InvitePage from "@/pages/invite.page";

export default function App() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/invite' element={<InvitePage/>}></Route>
                <Route path='/' element={<MainPage/>}>
                    <Route path='admin' element={<AdminPageShell/>}>
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
                    <Route path="manager" element={<ManagerPageShell/>}>
                        <Route path="buildings" element={<ManagerBuildingPage/>}/>
                        <Route path="building/:buildingId/apartments" element={<ManagerApartmentPage/>} />
                        <Route path="building/:buildingId/apartment/:apartmentId/residents" element={<ManagerResidentPage/>} />
                        <Route path="building/:buildingId/polls" element={<ManagerPollPage/>} />
                        <Route path="building/:buildingId/meetings" element={<ManagerMeetingPage/>} />
                        <Route path="*" element={<Navigate to="/manager/buildings"/>}/>
                        <Route path="" element={<Navigate to="/manager/buildings"/>}/>
                    </Route>
                    <Route path="" element={<ResidentPageShell/>}>
                        <Route path="" element={<ResidentApartmentPage/>}/>
                        <Route path="polls" element={<ResidentPollPage/>}/>
                        <Route path="meetings" element={<ResidentMeetingPage/>}/>
                        <Route path="apartment/:apartmentId/residents" element={<ResidentResidentPage/>}/>
                        <Route path="apartment/:apartmentId/repairs" element={<ResidentRepairPage/>}/>
                        <Route path="apartment/:apartmentId/bills" element={<ResidentBillPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
    </>

}
