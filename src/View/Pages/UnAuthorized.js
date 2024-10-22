import React from "react";
// import UnAuthorizedImage from "../../assets/unauthorized.jpg";
import { useNavigate } from "react-router-dom";
import { UnAuthorizedSVG } from "../../assets/svgIcons";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-4">
        <div className="bg-[#FEA918]  flex justify-center w-1/2 mx-auto min-h-[30vh] py-[30px]">
          <UnAuthorizedSVG />
        </div>
        <div className="w-1/2 mx-auto">
          <h3 className="text-primary text-center text-[24px] font-semibold">
            No authorization found.
          </h3>
          <p className="text-center">
            This page is not publicly available. To access it please login
            first.
          </p>
          <div className="text-center mt-4">
            <button
              className="max-w-20 text-center bg-primary rounded-2xl text-white py-2 px-10"
              onClick={() => (window.location = "/crm/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
      {/* <div className="w-full py-5">
        <h1 className="md:text-center">
          You are not authorized to view this page
        </h1>
      </div>
      <div className="flex justify-center">
        <img src={UnAuthorizedImage} width="50%" height="50%" />
      </div>
      <div className="w-full flex justify-center mt-5">
        <button
          className="max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
          onClick={() => navigate("/crm/dashboard")}
        >
          Go to Dashboard
        </button>
      </div> */}
    </>
  );
};

export default UnAuthorized;
