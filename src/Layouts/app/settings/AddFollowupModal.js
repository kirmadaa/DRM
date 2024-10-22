import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const DateDiv = styled.div`
  & .react-datepicker-wrapper {
    width: 100%;
  }
`;
const AddFollowupModal = ({
  modal,
  setModal,
  handleFlowUps,
  formikValue,
  edit,
}) => {
  const [followData, setFollowData] = useState({
    FollowUpDate: new Date(),
    TemplateId: "",
  });
  const { emailTemplates } = useSelector(
    (store) => store.ServiceControlReducer
  );

  useEffect(() => {
    if ((edit && formikValue?.FollowUpDate) || formikValue?.TemplateId) {
      // alert(1);
      setFollowData({
        FollowUpDate: formikValue?.FollowUpDate
          ? new Date(formikValue?.FollowUpDate)
          : new Date(),
        TemplateId: formikValue?.TemplateId,
      });
    }
  }, [formikValue]);
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
              <Dialog.Panel className="w-[50%] max-w-4xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Add Follow-ups
                </Dialog.Title>
                <div className="grid lg:grid-cols-1 mt-4">
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className=" mr-4 text-lg col-sm-6 w-[35%] text-[#929296] font-medium col-form-label"
                    >
                      Follow-up Date
                    </label>
                    <DateDiv className="col-sm-6 w-[100%]">
                      <ReactDatePicker
                        name="date"
                        className="form-control rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                        placeholderText="DD/MM/YYYY"
                        showTimeSelect
                        selected={followData?.FollowUpDate}
                        onChange={(date) => {
                          //   handleChange;
                          setFollowData({ ...followData, FollowUpDate: date });
                        }}
                      />
                    </DateDiv>
                  </div>
                  <div className="form-group row flex mb-3 items-center">
                    <label
                      htmlFor="firstName"
                      className="mr-4 text-lg col-sm-6 w-[35%] text-[#929296] font-medium col-form-label"
                    >
                      Email Template
                    </label>
                    <div className="col-sm-6 w-[100%]">
                      <select
                        className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                        name="selectFolder"
                        type="text"
                        value={followData.TemplateId}
                        onChange={(e) => {
                          setFollowData({
                            ...followData,
                            TemplateId: e.target.value,
                          });
                        }}
                      >
                        <option>please select</option>
                        {emailTemplates?.data?.EmailData.map((item, index) => (
                          <option key={index} value={item?._id}>
                            {item?.emailTitle}
                          </option>
                        ))}
                        {/* {["General"].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      className=" border-[#191242] border rounded-2xl px-5 py-3 "
                      onClick={() => setModal(false)}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleFlowUps(followData)}
                      className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-3  text-center"
                    // disabled={editable}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddFollowupModal;
