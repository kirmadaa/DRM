import { Navigate, Outlet } from "react-router-dom";
import { CHECK_PERMISSIONS } from "../Redux/actions/security-control";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = {
    loggedIn: localStorage.getItem("token") !== null ? true : false,
  };
  return user && user.loggedIn;
};

const ProtectedRoute = ({ moduleType }) => {
  const isAuth = useAuth();
  const dispatch = useDispatch();

  const permissionsData = useSelector(
    (store) => store.SecurityProfile.permissions
  );
  useEffect(() => {
    dispatch(CHECK_PERMISSIONS());
  }, []);

  if (!moduleType) {
    return isAuth ? <Outlet /> : <Navigate to="/crm/login" />;
  }

  let roles = permissionsData?.permission?.find(
    (ele) => ele?.module_title?.toLowerCase() === moduleType?.toLowerCase()
  );

  if (roles?.module_permission === undefined && permissionsData) {
    return <Navigate to="/crm/unauthorized" />;
  } else if (!permissionsData) {
    return <Outlet />;
  } else {
    return isAuth && roles?.module_permission?.read ? (
      <Outlet />
    ) : (
      <Navigate to="/crm/unauthorized" />
    );
  }
};

export default ProtectedRoute;
