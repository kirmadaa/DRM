import { useState, useEffect } from "react";
import { UPDATE_USER_PROFILE } from "../../../../Redux/actions/users";
import { GET_PROFILE } from "../../../../Redux/actions/authentication";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDetailForm = ({ profile, cities, btnName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** states
  const [payload, setPayload] = useState({
    name: "",
    mobile: "",
    city: "",
    // cityTitle: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const baseInfo = {
      name: profile?.name,
      mobile: profile?.mobile,
      // cityTitle: profile?.city?.cityTitle,
      type: profile?.type,
      city: profile?.city?._id,
    };
    setPayload({ ...baseInfo });
  }, [profile]);

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const updateUser = async (e) => {
    setLoading(true);

    const res = await dispatch(UPDATE_USER_PROFILE(payload));
    if (res?.success) {
      dispatch(GET_PROFILE());
      navigate("/web/profile/detail");
    } else {
      setLoading(false);
    }
  };

  return (
    <form>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col flex-wrap">
          <label
            htmlFor="firstnameInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            First Name
          </label>
          <input
            type="text"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="name"
            name="name"
            placeholder="Enter your firstname"
            defaultValue={payload?.name}
            onChange={hanleInputBase}
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <label
            htmlFor="firstnameInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            Last Name
          </label>
          <input
            type="text"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="name"
            name="name"
            placeholder="Enter your lastname"
            // defaultValue={payload?.name}
            // onChange={hanleInputBase}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="phonenumberInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            Phone Number
          </label>
          <input
            type="text"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none "
            id="phonenumberInput"
            name="mobile"
            placeholder="Enter your phone number"
            defaultValue={payload?.mobile}
            onChange={hanleInputBase}
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="emailInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="emailInput"
            name="emaiId"
            placeholder="Enter your email"
            defaultValue={profile?.emailId}
            disabled
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="cityInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            City
          </label>
          <select
            type="text"
            className="w-full border border-[#F0F0F5] rounded-2xl px-4 p-3 focus:outline-none"
            id="cityInput"
            name="city"
            placeholder="City"
            value={payload?.city}
            onChange={hanleInputBase}
          >
            {!payload?.city ? <option>Select User City</option> : null}
            {cities?.map((city) => (
              <option key={city._id} value={city._id}>
                {city.cityTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="zipcodeInput"
            className="mb-2 text-[#18181B] font-semibold"
          >
            PIN Code
          </label>
          <input
            type="text"
            className="w-full border border-[#F0F0F5] px-4 p-3 focus:outline-none rounded-2xl"
            minLength={5}
            maxLength={6}
            id="zipcodeInput"
            placeholder="Enter zipcode"
            defaultValue={110075}
            disabled
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center md:justify-end mt-3 flex-wrap">
        <button
          type="submit"
          className="bg-btnColorPrimary focus:outline-none p-4 text-white rounded-2xl w-full md:w-1/5"
          disabled={loading}
          onClick={updateUser}
        >
          {btnName}
        </button>
        <button
          type="button"
          className=" text-[#B2B2B6] focus:outline-none p-4 rounded-2xl w-full md:w-1/5 border border-[#B2B2B6]"
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

export default ProfileDetailForm;
