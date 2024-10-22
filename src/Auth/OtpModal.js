import React from "react";
import { useDispatch } from "react-redux";
import { RESEND_OTP, VERIFY_OTP } from "../Redux/actions/authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpModal = ({ setShowModal, mobile }) => {
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let tabChange = function (val) {
    let ele = document.querySelectorAll(".tab-class");
    if (ele[val - 1].value != "") {
      ele[val]?.focus();
    } else if (ele[val - 1].value == "") {
      ele[val - 2]?.focus();
    }
    let valid = Array.from(ele)?.filter((item) => item?.value === "");
    if (valid?.length === 0) {
      let otp = Array.from(ele)?.map((item) => item?.value);
      setOtp(otp?.join(""));
    } else {
      setOtp(null);
    }
  };

  const handleOTP = () => {
    dispatch(
      VERIFY_OTP({ OtpCode: parseInt(otp?.replace(/,/g, "")), mobile })
    ).then((res) => {
      if (res?.success) {
        navigate("/crm/login");
      }
    });
  };
  const handleResendOTP = () => {
    dispatch(RESEND_OTP({ mobile }));
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl px-4">
          {/*content*/}
          <div className="relative bg-white px-9 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl overflow-hidden">
            {/* <span
              className="absolute top-0 right-0 h-14 w-14 bg-[#142D6C] rounded-bl-full cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <img src={Close} className="absolute top-3 right-3" />
            </span> */}
            <div className="flex flex-col">
              <div className="font-semibold text-3xl text-[#191242] mb-4">
                <p>Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400 mb-4">
                <p>Enter your 4 digits code that you received on your Phone.</p>
              </div>
            </div>

            <div>
              <form action="" method="post">
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        className="tab-class w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#191242]"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                        onKeyUp={(e) => tabChange(1)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="tab-class w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#191242]"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                        onKeyUp={(e) => tabChange(2)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="tab-class w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#191242]"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                        onKeyUp={(e) => tabChange(3)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        className="tab-class w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#191242]"
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                        onKeyUp={(e) => tabChange(4)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <div>
                      {/* <p className="text-red-500 text-center mb-3">00:30</p> */}
                      <button
                        type="button"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#191242] border-none text-white text-sm shadow-sm"
                        onClick={() => handleOTP()}
                        disabled={!otp}
                      >
                        Verify
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium gap-2 mt-2 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <p
                        clspanssName="flex flex-row items-center text-red-500 hover:text-red-700  cursor-pointer"
                        onClick={() => handleResendOTP()}
                      >
                        Resend
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default OtpModal;
