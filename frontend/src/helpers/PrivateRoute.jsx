import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectUser } from "../redux/features/user/userSlices";


export const PrivateRoute = ({ children }) => {
    const user = useSelector(selectUser);
    return user && user.token ? { ...children } : <Navigate to="/signin" />;
};
