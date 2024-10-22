import { useState, useEffect } from "react";
import ProfileDetailForm from "./profileDetailForm";
import ProfilePasswordForm from "./profilePasswordForm";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_CITY } from "../../../../Redux/actions/authentication";
import PageLoader from "../../../../Components/pageLoader";

const ProfileEditLayout = () => {
  const [tab, setTab] = useState("detail");
  const store = useSelector((state) => state.auth);
  const { profileInfo } = store;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_ALL_CITY());
  }, [dispatch]);

  return (
    <div className="">
      {profileInfo === null ? (
        <PageLoader title="Loading" />
      ) : (
        <div className="">
          {/* <div className="position-relative mx-n4 mt-n4">
            <div className="px-4 w-full h-64  profile-wid-bg" />
          </div> */}
          <div>
            <div className="md:flex md:justify-between py-7">
              <h3 className="text-[#6A6A6D] text-base md:text-xl font-semibold mb-3 md:mb-0">
                Edit Profile
              </h3>
              <div>
                <span className="text-[#6A6A6D] text-base md:text-xl font-semibold">
                  Dashboard Profile
                </span>{" "}
                /{" "}
                <span className="text-[#6A6A6D] text-base md:text-xl font-semibold">
                  Personal Details
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white  md:p-8 p-5 border-2 border-[#191242] rounded-2xl">
            <div className="card-header">
              <ul
                className="sm:flex border border-[#E6E6EB] rounded-2xl sm:w-fit p-2"
                role="tablist"
              >
                <li className=" flex justify-center items-center ">
                  <button
                    className={`nav-link text-body h-full py-2 px-5 w-full sm:w-auto rounded-lg   ${
                      tab === "detail" ? "bg-[#191242] text-white " : ""
                    }`}
                    data-bs-toggle="tab"
                    onClick={() => setTab("detail")}
                    role="tab"
                  >
                    <i className="fas fa-home" /> Personal Details{" "}
                  </button>
                </li>
                <li className=" flex justify-center items-center ">
                  <button
                    className={`nav-link text-body h-full py-2 px-5 w-full sm:w-auto rounded-lg  ${
                      tab === "password" ? "bg-[#191242] text-white " : ""
                    }`}
                    data-bs-toggle="tab"
                    onClick={() => setTab("password")}
                    role="tab"
                  >
                    <i className="far fa-user" /> Change Password
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body p-2">
              <h3 className="text-[#191242] text-2xl font-semibold my-3 md:my-5">
                Details
              </h3>
              <div className="tab-content">
                {tab === "detail" ? (
                  <div>
                    <ProfileDetailForm
                      profile={profileInfo?.data[0]}
                      cities={store.getAllCity}
                      btnName={"Update"}
                    />
                  </div>
                ) : (
                  <div>
                    <ProfilePasswordForm />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditLayout;
