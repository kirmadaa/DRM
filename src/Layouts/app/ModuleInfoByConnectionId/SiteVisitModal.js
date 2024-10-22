import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import "react-clock/dist/Clock.css";
import { styled } from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_INVENTORY_FOR_OPPORTUNITY } from "../../../Redux/actions/comman";
import Select from "react-select";
import { list } from "../../../Components/module";
import { GET_USER_PROFILE, SAVE } from "../../../Redux/actions/user";

const DateDiv = styled.div`
  & .react-datepicker-wrapper {
    width: 100%;
  }
`;

const SiteVisitModal = ({ modal, setModal, id, reloadData, formType }) => {
  const api = list["siteVisit"];
  const [data, setData] = useState({
    SiteVisitTitle: "",
    Location: "",
    From: "",
    To: "",
  });
  const [start, setStart] = useState();
  const [userId, setUserId] = useState();
  const [inventory, setInventory] = useState([]);
  const dispatch = useDispatch();

  const getInventoryOfDeal = async () => {
    let res = await dispatch(GET_INVENTORY_FOR_OPPORTUNITY(id));
    setInventory(res?.data?.data);
  };
  const saveFunction = async () => {
    let newData = { ...data, parentModule: formType };
    newData.ModuleTitle = "siteVisit";
    newData.connectionId = id;
    newData.siteVisitOwnerId = userId;
    newData.Inventory = start?.map((item) => item?.value);
    await dispatch(SAVE(api.saveApi, newData));
    setModal(false)
    reloadData()
  };

  useEffect(() => {
    getInventoryOfDeal();
    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        setUserId(res?.data?.data[0]?.userId);
      }
    });
  }, []);
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
              <Dialog.Panel className="w-full max-w-4xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  Site Visit
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="container ">
                    <div className="grid lg:grid-cols-1">
                      <label className="font-semibold mt-3">
                        Site visit Title:
                      </label>
                      <input
                        name="groupTitle"
                        type="text"
                        onChange={(e) =>
                          setData({ ...data, SiteVisitTitle: e.target.value })
                        }
                        value={data?.SiteVisitTitle}
                        className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 "
                      />
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Location:</label>
                    <input
                      name="groupTitle"
                      type="text"
                      onChange={(e) =>
                        setData({ ...data, Location: e.target.value })
                      }
                      value={data?.Location}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 "
                    />
                  </div>
                  <label className="font-semibold mt-3">Date:</label>

                  <DateDiv className="col-sm-6 w-[100%]">
                    <ReactDatePicker
                      name="date"
                      className="form-control rounded-[10px] w-[100%]  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                      placeholderText="DD/MM/YYYY"
                      showTimeSelect
                      selected={data?.From}
                      onChange={(date) => {
                        //   handleChange;
                        setData({ ...data, From: date });
                      }}
                    />
                  </DateDiv>
                  <div className="container ">
                    <div className="grid lg:grid-cols-1">
                      <label className="font-semibold mt-3">
                        Inventory List:
                      </label>
                      <Select
                        options={inventory?.Inventory?.map((item, index) => {
                          return {
                            label: `${item?.InventoryName}`,
                            value: item?._id,
                          };
                        })}
                        isMulti
                        className="my-2"
                        // value={userId}
                        onInputChange={(e) =>
                          console.log("eeeeeeee----->>>", e)
                        }
                        onChange={(e) => setStart(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => saveFunction()}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
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

export default SiteVisitModal;
