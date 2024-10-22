import { React, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "./images/hero.svg";
import LogoNew from "../assets/images/logo/logoNew.svg";
import { useDispatch } from "react-redux";
import { EMAIL_VERIFY } from "../Redux/actions/authentication";

const EmailVerificationLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const verifyEmail = () => {
    dispatch(EMAIL_VERIFY({ code: id })).then((res) => {
      if (res?.success) {
        navigate("/crm/login");
      }
      if (res?.error) {
        console.log("Invalid code");
      }
    });
  };
  useEffect(() => {
    if (id) {
      verifyEmail();
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/crm/dashboard");
    } else {
    }
  }, [navigate]);

  return (
    <>
      <div className="h-full flex items-center">
        <div className="flex items-center h-full  w-full">
          <div className="flex relative h-full w-full">
            <div className="hidden lg:inline w-2/6">
              <img
                src={Hero}
                className=" object-cover w-full h-[100vh]"
                alt=""
              />
            </div>
            <div className="flex sm:justify-center items-center w-full h-[100vh] lg:w-4/6 relative">
              <div className=" w-full p-3 md:p-12 lg:p-24 ">
                <img
                  src={LogoNew}
                  className="absolute top-[7%] left-[30%] sm:left-[40%] lg:left-24"
                  alt="login-banner"
                />
                <h3 className="text-[#1D1D1E] text-4xl mg-b-5 font-semibold mb-10">
                  Verify your email address
                </h3>
                <p className="tx-color-03 tx-16 mg-b-40 font-light">
                  Please check your email and click the verify button or link to
                  verify your account.
                </p>

                <div className="my-8">
                  <button
                    onClick={() => {
                      verifyEmail();
                    }}
                    className="bg-[#191242] w-full text-[#fff] p-3 rounded-2xl mb-3"
                  >
                    Resend Verification
                  </button>
                </div>
                <div className="mb-8">
                  <button
                    //   onClick={() => {
                    //     handleSubmit();
                    //   }}
                    className="bg-[#fff] w-full text-[#191242] p-3 rounded-2xl mb-3"
                  >
                    Contact Support
                  </button>
                </div>

                {/* <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="bg-[#142D6C] w-full text-[#fff] p-3 rounded-2xl mb-3"
                >
                  Log in
                </button> */}

                <div
                  className="flex items-center justify-between mb-5"
                  style={{
                    width: "calc(100% - 48% )",
                    position: "fixed",
                    bottom: "0px",
                  }}
                >
                  <div className="text-xs text-[#6A6A6D]">
                    All © copyright reserved by The Stackmentalist Private Limited.
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-[#6A6A6D] cursor-pointer">
                      Terms & Conditions
                    </p>
                    <p className="text-xs text-[#6A6A6D] cursor-pointer">
                      Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationLayout;
