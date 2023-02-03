import { AuthContext } from './../context/AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from "react";
import useAdmin from './../Hooks/useAdmin';
import Spanner from './../Pages/Shared/Spanner/Spanner';
const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <Spanner />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;