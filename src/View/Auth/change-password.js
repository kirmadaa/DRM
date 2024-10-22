import React from "react";
import ChangePasswordLayout from "../../Auth/change-password";
import BreadCrumb from "../../Components/breadcrumb";

const breadcrumblist = [{ name: "Dashboard", path: "/crm/dashboard" }];

const ChangePassword = () => {
  return (
    <>
      <div className="w-full ">
        <div className="py-2 w-full">
          <BreadCrumb
            mainTitle="Change password"
            active="Change password"
            breadcrumblist={breadcrumblist}
          />
        </div>
        <ChangePasswordLayout />
      </div>
    </>
  );
};

export default ChangePassword;
