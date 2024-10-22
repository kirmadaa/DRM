import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CHECK_PERMISSIONS } from "../Redux/actions/security-control";
import { useDispatch } from "react-redux";

const useAccessibleRole = (moduleType) => {
  const dispatch = useDispatch();
  const [roleArray, setRoleArray] = useState({
    delete: false,
    edit: false,
    read: false,
    write: false,
    apiCall: false,
    // autoResponders: false,
    // excelSheet: false
  });
  const permissionsData = useSelector(
    (store) => store.SecurityProfile.permissions
  );

  useEffect(() => {
    dispatch(CHECK_PERMISSIONS());
  }, []);

  useEffect(() => {
    if (permissionsData?.permission) {
      let roles = permissionsData?.permission?.find(
        (ele) => ele?.module_title?.toLowerCase() === moduleType?.toLowerCase()
      );
      if (roles) {
        setRoleArray({ ...roles?.module_permission, apiCall: true });
      }
    }
  }, [permissionsData, moduleType]);

  return roleArray;
};

export default useAccessibleRole;
