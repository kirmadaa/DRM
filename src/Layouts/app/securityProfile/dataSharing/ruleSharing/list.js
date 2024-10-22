/* eslint-disable jsx-a11y/alt-text */
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Edits from "../../../../../assets/images/user/Edits.svg";
import { GET_RULE_SHARING_PERMISSIONS } from "../../../../../Redux/actions/security-control";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import {
  Block,
  Checkicon,
  DeleteIcon,
  EditIcon,
} from "../../../../../assets/svgIcons";

export default function RulesList({
  moduleName,
  changeDispatch,
  editHandler,
  deleteHandler,
}) {
  let dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    dispatch(GET_RULE_SHARING_PERMISSIONS(moduleName)).then((response) => {
      if (response?.status === 200) {
        setData(response?.data?.data?.ruleShareData);
      } else {
        toast.error(response?.data?.msg);
      }
    });
  }, [changeDispatch]);

  const permissionShow = (permission) => {
    if (permission.delete && permission.write && permission.read) {
      return `Read/Write/Delete`;
    } else if (permission.write && permission.read) {
      return `Read/Write`;
    } else {
      return `Read Only`;
    }
  };

  return (
    <div>
      <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
        {data.length !== 0 ? (
          <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
            <thead className="text-sm text-gray-900 font-medium bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-left font-medium "
                ></th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Rule name
                </th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Shared To
                </th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Permission
                </th>
                <th scope="col" className="px-6 py-3  text-left font-medium">
                  Superiors Allowed
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={index} className="bg-white cursor-pointer">
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                  >
                    <div className="flex">
                      <span
                        className="p-2 rounded bg-[#DCFCE7]"
                        onClick={() => editHandler(value)}
                      >
                        <EditIcon />
                      </span>{" "}
                      <span
                        className="p-2 ml-2 rounded bg-[#FFEAEF]"
                        onClick={() => {
                          setDeleteData(value);
                          setModalShow(true);
                        }}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                  >
                    {value.SharingRuleName}
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                  >
                    {value.RecordsSharedTo}
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                  >
                    {permissionShow(value.Permission)}
                  </th>
                  <th
                    scope="row"
                    className="px-5 py-4  font-medium text-[#929296] text-sm whitespace-nowrap text-center"
                  >
                    {value?.SuperiorsAllowed ? (
                      <Block />
                    ) : (
                      <div className="text-center">
                        <Checkicon color={"green"} />
                      </div>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
            <thead className="text-sm text-gray-900 font-medium bg-gray-200">
              <tr className="w-[30%]">
                <th scope="col" className="px-6 py-3  text-left font-medium ">
                  <input name="Add" type="checkbox" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white cursor-pointer">
                <th
                  scope="row"
                  className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-center"
                >
                  No sharing rules created.
                </th>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Transition appear show={modalShow} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalShow(false)}
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
                <Dialog.Panel className="w-full max-w-2xl lg:max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete rules
                  </Dialog.Title>
                  <h1>Are you sure want to delete?</h1>
                  <div className="flex gap-3 mt-3">
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                        onClick={() => {
                          deleteHandler(deleteData);
                          setModalShow(false);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                        onClick={() => {
                          setModalShow(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
