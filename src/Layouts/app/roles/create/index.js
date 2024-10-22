import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import {
  CREATE_ROLE_DATA,
  GET_ALL_DATA,
  GET_ALL_ROLE_DATA,
} from "../../../../Redux/actions/role";

export default function CreateRole() {
  let dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleName, setroleName] = useState("");
  const [permission, setPermission] = useState(permissions);
  const roles = useSelector((state) => state?.role);
  const [selectedValue, setSelectedValue] = useState();

  function closeModal() {
    setModalShow(false);
  }

  function openModal() {
    setModalShow(true);
  }

  const handleCreateRole = async () => {
    setLoading(true);
    let payload = {
      roleTitle: roleName,
      parent_id: selectedValue,
      permission,
    };
    const res = await dispatch(CREATE_ROLE_DATA(payload)).then((response) => {
      if (response === 200) {
        setroleName("");
        setSelectedValue("");
        dispatch(GET_ALL_ROLE_DATA(1, 10));
        closeModal();
        setLoading(false);
      }
    });
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    if (modalShow) {
      dispatch(GET_ALL_DATA(1, 50));
    }
  }, [modalShow]);
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-auto"
      >
        Add role
      </button>
      <Transition appear show={modalShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Role
                  </Dialog.Title>
                  <div className="flex gap-3 mt-3">
                    <select
                      id="demo-simple-select"
                      value={selectedValue}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Role</option>
                      {roles?.roledetail?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.roleTitle}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="title.."
                      value={roleName}
                      className="titleadd bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => {
                        setroleName(e.target.value);
                      }}
                    />
                  </div>
                
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      onClick={handleCreateRole}
                    >
                      {loading ? "Process.." : "Add Role"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      onClick={() => {
                        setroleName("");
                        setModalShow(false);
                        setSelectedValue("");
                      }}
                    >
                      {loading ? "Process.." : "Cancel"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export const permissions = [
  {
    module_title: "home",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "leads",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "contacts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "accounts",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "opportunities",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "tasks",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "Calls",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "meeting",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "saleOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "purchaseOrders",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "invoices",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "siteVisit",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "quotes",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
  {
    module_title: "settings",
    module_permission: {
      read: false,
      write: false,
      delete: false,
    },
  },
];
