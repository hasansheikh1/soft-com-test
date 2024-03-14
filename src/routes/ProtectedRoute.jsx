import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../components/Context/AuthProvider'
import Main from "../components/skeleton/Main";

export const ProtectedRoute = () => {

    // const { token } = useAuth();
    // if (!token) {
    //     return <Navigate to="/login" />;
    // }
    // If authenticated, render the child routes
    return <Main><Outlet /></Main>;

};