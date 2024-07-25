import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login.page";

export default function App() {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </>

}
