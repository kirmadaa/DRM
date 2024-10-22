import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SaleUpdateModal = ({ modal, setModal, updateFun, input, setInput }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  let TableHeaders = useSelector((state) => state.Saleorder.tableHeader) || [];
  const filters = useSelector((state) => state.Saleorder.Filters);

  const hideFilterList = [
    "_id",
    "organizationId",
    "salesOrderOwnerId",
    "organizationId",
    "connectionId",
    "ModifiedBy",
    "id",
  ];

  const getTitle = (value) => {
    if (value) {
      let titleis = value
        ?.replace(/([A-Z])/g, " $1")
        ?.replace(/^./, function (str) {
          return str.toUpperCase();
        });
      return titleis.replace(/_/g, "");
    }
    return "";
  };
  const LoadData = () => {
    let temparr = [];
    filters.map((element) => {
      let tempobj = {
        name: element,
        value: "",
        apply: false,
      };

      temparr.push(tempobj);
    });

    temparr.map((element) => {
      TableHeaders.map((item) => {
        if (element.name === item) {
          element.apply = true;
        }
      });
    });
    setData(temparr);
  };

  useEffect(() => {
    LoadData();
  }, [filters]);

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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB] text-center"
                >
                  Update Records
                </Dialog.Title>
                <div className="container min-h-[140px]">
                  <div className="grid lg:grid-cols-1">
                    <select
                      className="form-control border border-[#E6E6EB] rounded-xl p-3 focus:outline-none"
                      onChange={(e) => {
                        setInput({ ...input, field: e.target.value });
                      }}
                      value={input?.field}
                    >
                      <option value="">Choose One</option>
                      {data
                        ?.filter(
                          (filter) => !hideFilterList.includes(filter.name)
                        )
                        .map((item, index) => (
                          <option key={index} value={item?.name}>
                            {getTitle(item?.name)}
                          </option>
                        ))}
                    </select>
                    <input
                      className="border  border-[#E6E6EB]  rounded-xl px-4 py-3 focus:outline-none m-2"
                      type="text"
                      value={input?.value}
                      onChange={(e) =>
                        setInput({ ...input, value: e.target.value })
                      }
                    />
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
                    onClick={() => updateFun()}
                    className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                  >
                    Update
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

export default SaleUpdateModal;
