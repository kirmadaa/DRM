import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from "../../../../Redux/actions/user";
import { useState } from "react";

export const SocialProfilerModal = ({
  modal,
  setModal,
  socialName,
  setData,
  data,
}) => {
  const dispatch = useDispatch();
  const [socialData, setSocialData] = useState(
    data?.socialProfiles ? data?.socialProfiles[socialName] : ""
  );

  const handleChange = (e) => {
    setSocialData(e.target.value);
  };

  const saveHandler = () => {
    dispatch(
      UPDATE_USER_PROFILE({
        ...data,
        socialProfiles: { ...data.socialProfiles, [socialName]: socialData },
      })
    ).then((res) => {
      if (res?.success) {
        dispatch(GET_USER_PROFILE()).then((res) => {
          setData(res?.data?.data?.[0]);
        });
        setModal(false);
      }
    });
  
  };
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[50%] max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Add {socialName} Profile
                </Dialog.Title>
                <div>
                  <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                    {socialName} Profile
                  </label>
                  <input
                    type="text"
                    className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                    placeholder={`Please enter ${socialName} Profile`}
                    value={socialData}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-3 "
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={saveHandler}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    // disabled={editable}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
