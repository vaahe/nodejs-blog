import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.users.user);
    return user && user.token ? { ...children } : <Navigate to="/signin" />;
};

export default PrivateRoute;
