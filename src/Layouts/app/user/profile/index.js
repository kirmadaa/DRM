import React, { useEffect, useState } from "react";
import Users from "../../../../assets/images/user/users.svg";
import Emails from "../../../../assets/images/user/mails.svg";
import Edits from "../../../../assets/images/user/Edits.svg";
import { GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SocialProfilerModal } from "./SocialProfilerModal";
import { Edit2, Plus } from "react-feather";
import UpdateUserProfile from "../../userList/create/updateUserProfile";

const ProfileLayout = () => {
  const [profileModal, setProfileModal] = useState(false);
  const [data, setData] = useState();
  const [socialName, setSocialName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelPorfileModal = (name) => {
    setProfileModal(!profileModal);
    setSocialName(name);
  };
  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      setData(res?.data?.data?.[0]);
    });
  }, [dispatch]);

  return (
    <div className="w-[calc(100%+270px)]">
      <div className="rounded-2xl bg-[white] p-6 mb-6 w-full">
        <div className="flex items-center justify-between pb-10">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <UpdateUserProfile selectedUser={data} avtar={data?.profilePicture || Users} />
            </div>
            <div>
              <h1 className="text-xl font-medium mb-2"> {data?.firstName + ' ' + data?.lastName || "-"}</h1>
              <div className="flex items-center gap-2">
                <img alt="email icon" src={Emails} />
                <p className="text-[#18181B]">{data?.email || "-"}</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
            onClick={() => navigate("/crm/edit-profile")}
          >
            <img alt="edit icon" src={Edits} />
            Edit
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                First Name :
              </h6>
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                Date of Birth :
              </h6>
              <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                State :
              </h6>
            </div>
            <div className="col-span-3">
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {data?.firstName || "-"}
              </p>
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {data?.DOB || "-"}
              </p>
              <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                {data?.state || "-"}
              </p>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-5">
              <div className="col-span-2">

                <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                  {/* Time Zone : */}
                  Website :
                </h6>
                <h6 className="text-[#191242] text-sm md:text-base font-medium mb-2">
                  Country/Region :
                </h6>

              </div>
              <div className="col-span-3">

                <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                  {/* (GMT +5:30) India Standard Time (Asia/Kolkata) */}
                  {data?.website || "-"}
                </p>

                <p className="text-[#B2B2B6] text-sm md:text-base mb-2">
                  {data?.country || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {profileModal && (
        <SocialProfilerModal
          socialName={socialName}
          modal={profileModal}
          setData={setData}
          data={data}
          setModal={setProfileModal}
        />
      )}
      <div className="rounded-2xl bg-[white] p-6">
        <h3 className="text-sm font-semibold leading-[22px]">
          Social Profiles
        </h3>
        <hr className="mt-2 w-full bg-gray-200 h-[1px]" />
        <div className="flex items-center gap-2 pt-4 flex-wrap">
          <button
            onClick={() => handelPorfileModal("Twitter")}
            className="pl-2 pr-3 py-1 flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
          >
            {data?.socialProfiles?.Twitter ? <Edit2 size={16} /> : <Plus size={16} />}
            {data?.socialProfiles?.Twitter || 'Twitter'}
          </button>
          <button
            onClick={() => handelPorfileModal("Facebook")}
            className="pl-2 pr-3 py-1 flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
          >
            {data?.socialProfiles?.Facebook ? <Edit2 size={16} /> : <Plus size={16} />}
            {data?.socialProfiles?.Facebook || 'Facebook'}
          </button>
          <button
            onClick={() => handelPorfileModal("LinkedIn")}
            className="pl-2 pr-3 py-1 flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
          >
            {data?.socialProfiles?.LinkedIn ? <Edit2 size={16} /> : <Plus size={16} />}

            {data?.socialProfiles?.LinkedIn || 'LinkedIn'}
          </button>
          <button
            onClick={() => handelPorfileModal("Instagram")}
            className="pl-2 pr-3 py-1 flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full"
          >
            {data?.socialProfiles?.Instagram ? <Edit2 size={16} /> : <Plus size={16} />}
            {data?.socialProfiles?.Instagram || 'Instagram'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
