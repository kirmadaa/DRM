// ** React Imports
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageLoader from "../../../../Components/pageLoader";
import UserProfile from "../../../../assets/images/user/Profile.png";
import editIcon from "../../../../assets/images/user/edit.png";

const UserProfileDetail = () => {
  const store = useSelector((state) => state.auth);
  const { profileInfo } = store;

  return (
    <Fragment>
      {profileInfo === null ? (
        <PageLoader title="Loading" />
      ) : (
        <>
            <div>
              <div className="md:flex md:justify-between py-7">
                <h3 className="text-[#6A6A6D] text-base md:text-xl font-semibold mb-3 md:mb-0">
                  Profile
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
              <div className="card-body p-2">
                <div>
                  <div className="flex items-center">
                    <div className="mr-5 p-[25px] bg-[#191242] rounded-[16px]">
                      <span className="">
                        <img src={UserProfile} alt='avtar' />
                      </span>
                    </div>
                    <div>
                      <p className="text-[24px] font-bold	 text-[#191242]">
                        {profileInfo?.data[0]?.name || 'user name'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#191242] text-2xl font-semibold my-3 md:my-5 flex flex-col">
                      Information
                    </h3>
                  </div>
                  <div className="">
                    <button className="px-[16px] rounded-[16px] flex py-[14px] bg-[#191242]">
                      <span>
                        <img src={editIcon} alt='Avatar' />
                      </span>
                      <Link to="/web/profile/edit">
                        <span className="ml-5 text-white"> Edit Profile</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
    </Fragment>
  );
};

export default UserProfileDetail;
