import React from "react";
import ProtectedRoute from "./protectedRoutes";
import Appbar from "../Components/appbar";
import AppFooter from "../Components/appFooter";
import { useLocation } from "react-router-dom";

const Main = ({ moduleType }) => {
  const location = useLocation()
  return (
    <main>
      <Appbar />
      <div
        className={` overflow-hidden ${location?.pathname?.includes('/crm/sheetview') ? "mb-20 px-0 sm:px-0 lg:px-0" : "mb-20 px-4 sm:px-6 lg:px-0"}`}
      >
        <ProtectedRoute moduleType={moduleType} />
      </div>
      {/* <AppFooter /> */}
    </main>
  );
};

export default Main;
