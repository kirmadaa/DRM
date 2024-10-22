import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CHANGE_PASSWORD,
  GET_PROFILE,
} from "../../../../Redux/actions/authentication";
import { useState } from "react";
import { CheckObjectValidation } from "../../../../utility/validation";

const ProfilePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState(null);

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();
    const checkValidation = CheckObjectValidation(payload, []);
    setErrors(checkValidation);
    if (checkValidation.isvalid) {
      delete payload?.confirmNewPassword;
      setLoading(true);
      const res = await dispatch(CHANGE_PASSWORD(payload));
      if (res?.success) {
        dispatch(GET_PROFILE());
        navigate("/web/profile/detail");
      } else {
        setLoading(false);
      }
    }
  };
  return (
    <form>
      <div className="grid gap-4 flex-wrap">
        <div className="flex flex-col ">
          <label
            className={
              errors?.keyname
                ? "text-red-400 font-semibold mb-2"
                : "mb-2 text-[#18181B] font-semibold"
            }
          >
            Old Password
          </label>
          <input
            onChange={hanleInputBase}
            type="password"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="oldpasswordInput"
            name="currentPassword"
            placeholder="Enter current password"
          />
        </div>
        <div className="flex flex-col ">
          <label
            className={
              errors?.keyname
                ? "text-red-400 font-semibold mb-2"
                : "mb-2 text-[#18181B] font-semibold"
            }
          >
            New Password
          </label>
          <input
            onChange={hanleInputBase}
            type="password"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="newpasswordInput"
            name="newPassword"
            placeholder="Enter new password"
          />
        </div>
        <div className="flex flex-col ">
          <label
            className={
              payload?.newPassword !== payload?.confirmNewPassword
                ? "text-red-400 font-semibold mb-2"
                : "mb-2 text-[#18181B] font-semibold"
            }
          >
            {payload?.newPassword === payload?.confirmNewPassword
              ? "Confirm New password"
              : "Password Not Match"}
          </label>
          <input
            onChange={hanleInputBase}
            type="password"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="confirmpasswordInput"
            name="confirmNewPassword"
            placeholder="Confirm password"
          />
        </div>
        <div className="col-lg-12">
          <div className="mb-3">
            <Link
              to="/web/forgot-password"
              className="text-btnColorPrimary font-semibold"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 md:justify-end justify-center flex-wrap">
        <button
          type="submit"
          className="bg-btnColorPrimary focus:outline-none p-4 text-white rounded-2xl w-full md:w-1/5"
          disabled={loading}
          onClick={updateUserPassword}
        >
          Change Password
        </button>
        <button
          type="button"
          className="text-[#B2B2B6] focus:outline-none p-4 rounded-2xl  w-full md:w-1/5 border border-[#B2B2B6]"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfilePasswordForm;
