import demouserAvatar from "../../../../assets/images/users/user-dummy-img.jpg";
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

const ProfileHeader = ({ profile }) => {
  return (
    <div className="pt-4 ">
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-4">
          <div>
            <img
              src={demouserAvatar}
              alt="user-img"
              className=" w-28 h-28  rounded-full"
            />
          </div>
          <h3 className="capitalize text-white mt-3 text-2xl">
            {profile?.name}
          </h3>
        </div>

        <Link to="/web/wallet-transactions">
          <h1 className="text-white text-lg mb-1 text-left">
            {/* INR */}
            {profile?.walletAmount || 0}
          </h1>
          <div className="flex justify-start items-center text-sm text-white">
            <i className="bx bx-wallet-alt text-white" />
            <span className="mx-1">Balance</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
