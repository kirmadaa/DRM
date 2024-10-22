import React, { useState } from "react";
import SetupSidebar from "../../../Layouts/app/setupSidebar";
import { TrustedDomainSVG } from "../../../assets/svgIcons";
import { Plus } from "react-feather";
import TrustedDomainModal from "../../../Layouts/app/trustedDomain/TrustedDomainModal";

const TrustedDomain = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="w-full min-h-screen flex gap-6 py-6 m-2 ">
      <SetupSidebar />
      <div className="rounded-2xl bg-[white] w-full p-6">
        <div className="text-primary text-base font-semibold">
          Trusted Domain
        </div>
        <p className="text-[#929296]">
          Trusted Domain helps you to whitelist the domains with which you would
          like to communicate from inside a client script.
        </p>
        <div className="flex justify-center mt-[124px]">
          <TrustedDomainSVG />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className=" btn adduser hover:bg-[#191242] focus:shadow-none font-medium gap-3 bg-[#191242] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
            onClick={() => setModal(true)}
          >
            <Plus />
            New Trusted Domain
          </button>
        </div>
        <TrustedDomainModal setModal={setModal} modal={modal} />
      </div>
    </div>
  );
};

export default TrustedDomain;
