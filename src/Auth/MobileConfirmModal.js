import React from "react";
import Close from "./images/close.svg";
import { useDispatch } from "react-redux";
import {
  REGISTER_NEW_USER_EMAIL,
  // RESEND_OTP,
  // VERIFY_OTP,
} from "../Redux/actions/authentication";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const MobileConfirmModal = ({ setShowModal, values, setOtpShowModal }) => {
  // const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(REGISTER_NEW_USER_EMAIL({ ...values })).then((res) => {
      if (res?.success) {
        // navigate("/crm/login");
        setShowModal(false);
        setOtpShowModal(true);
      }
    });
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
                <p>Confirmation</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400 mb-4">
                <p>The One time password will be sent to given number.</p>
              </div>
              <p className="text-gray-400 mb-4">
                Are you sure, you want to continue with this number ?
              </p>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row text-sm font-medium space-x-2">
                  <p>Mobile no.</p>
                  <p>{values?.mobile}</p>
                </div>

                <div className="flex flex-col mt-4">
                  <div className="flex justify-end">
                    <button
                      className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                      onClick={() => setShowModal(false)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleRegister}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                      type="button"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default MobileConfirmModal;
