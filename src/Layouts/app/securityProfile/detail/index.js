import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import SecurityProfileCreate from "../create";
import {
  CREATE_SECURITY_PROFILE,
  GET_ALL_SECURITY_PROFILE,
} from "../../../../Redux/actions/security-control";
import { LeftBackArrow, PersonIcon } from "../../../../assets/svgIcons";
import { Dialog, Menu, Tab, Transition } from "@headlessui/react";
import DataSharing from "../dataSharing";
import Menus from "../../../../assets/images/dashboard/menus.svg";
import moment from "moment/moment";
import RoleManagement from "../role";

const SecurityProfileList = () => {
  const [selectRole, setSelectRole] = useState(null);
  const [showRows, setShowRows] = useState(10);
  const [modalCreateProfileShow, setModalCreateProfileShow] = useState(false);
  const [cloneData, setCloneData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const SecurityProfile = useSelector((state) => state?.SecurityProfile);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useSelector((state) => state?.SecurityProfile?.pagination);
  const dispatch = useDispatch();
  const [showCloneProfileModal, setShowCloneProfileModal] = useState(false);
  const [createRenameProfile, setCreateRenameProfile] = useState(false);
  const [createDeleteProfile, setCreateDeleteProfile] = useState(false);

  function openModalNewProfile(data) {
    const obj = {
      cloneTitle: data.profileTitle,
      profileTitle: "",
      profileDescription: "",
      permission: data.permission,
    };
    setCloneData(obj);
    setShowCloneProfileModal(true);
  }

  function closeModalNewProfile() {
    setShowCloneProfileModal(false);
  }

  function closeModalRenameProfile() {
    setCreateRenameProfile(false);
  }

  function closeModalRenameProfile() {
    setCreateDeleteProfile(false);
  }

  const handleShowRows = (val) => {
    setShowRows(val);
    dispatch(GET_ALL_SECURITY_PROFILE(currentPage + 1, val));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    dispatch(GET_ALL_SECURITY_PROFILE(page.selected + 1, showRows));
  };

  const handleClicks = (_id, item) => {
    setSelectRole(item);
    setEditMode(true);
    setModalCreateProfileShow(true);
  };

  useEffect(() => {
    if (currentPage) {
      dispatch(GET_ALL_SECURITY_PROFILE(currentPage, showRows));
    }
  }, [dispatch, showRows]);

  useEffect(() => {
    if (SecurityProfile?.securityProfile?.length > 0 && pagination) {
      setCurrentPage(pagination?.offset - 1);
    }
  }, [SecurityProfile, pagination]);

  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));
    return (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={count || 1}
        activeClassName="active"
        onPageChange={(page) => handlePagination(page)}
        containerClassName={
          "pagination react-paginate text-sm gap-2 flex justify-end my-2"
        }
      />
    );
  };

  const saveCloneProfile = () => {
    delete cloneData.cloneTitle;
    dispatch(CREATE_SECURITY_PROFILE(cloneData)).then((response) => {
      if (response?.status === 200) {
        dispatch(GET_ALL_SECURITY_PROFILE(currentPage, showRows));
        setShowCloneProfileModal(false);
      }
    });
  };

  const cloneChangeHandler = (e) => {
    const { name, value } = e.target;
    const obj = { ...cloneData, [name]: value };
    setCloneData(obj);
  };

  return (
    <div className="bg-white border-[1.5px] border-[#E6E6EB] rounded-2xl">
      <>
        <Tab.Group>
          <div className="border-b-[1px] border-[#E6E6EB] px-14 py-3">
            <Tab.List className="flex space-x-1 w-max rounded-[32px] bg-white border-[1.5px] border-[#E6E6EB] p-1">
              <Tab className={"focus-visible:outline-none whitespace-nowrap"}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-[#191242] rounded-[32px] text-white py-2 px-4 min-w-[100px] text-sm font-normal leading-5 "
                        : "text-[#6A6A6D] text-sm font-normal py-2 px-4 min-w-[100px] hover:bg-white/[0.12]"
                    }
                  >
                    Profile
                  </button>
                )}
              </Tab>
              <Tab className={"focus-visible:outline-none whitespace-nowrap"}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-[#191242] rounded-[32px] text-white py-2 px-4 min-w-[100px] text-sm font-normal leading-5 "
                        : "text-[#6A6A6D] text-sm font-normal py-2 px-4 min-w-[100px] hover:bg-white/[0.12]"
                    }
                  >
                    Role
                  </button>
                )}
              </Tab>
              <Tab className={"focus-visible:outline-none whitespace-nowrap"}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-[#191242] rounded-[32px] text-white py-2 px-4 min-w-[100px] text-sm font-normal leading-5 "
                        : "text-[#6A6A6D] text-sm font-normal py-2 px-4 min-w-[100px] hover:bg-white/[0.12]"
                    }
                  >
                    Data Sharing Setting
                  </button>
                )}
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <div className="px-6 py-3">
              <Tab.Panel>
                <div className="flex items-center gap-4 justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="cursor-pointer">
                      <LeftBackArrow />
                    </div>
                    <div>
                      <div className="text-primary text-base font-semibold">
                        Profiles
                      </div>
                      <div className="font-medium text-sm text-[#929296] max-w-[800px]">
                        Profile is a set of permissions dealing with module
                        access and operations, setup customizations, and access
                        to various apps. You can provide different set of
                        permissions to various users.
                      </div>
                    </div>
                  </div>
                  <div className="my-3 flex justify-items-end items-right">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setModalCreateProfileShow(true);
                      }}
                      className="rounded-2xl h-12 w-32 bg-primary p-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-auto"
                    >
                      New Profile
                    </button>
                    {modalCreateProfileShow && (
                      <SecurityProfileCreate
                        currentPage={currentPage}
                        modalCreateProfileShow={modalCreateProfileShow}
                        setModalCreateProfileShow={setModalCreateProfileShow}
                        showRows={showRows}
                        editMode={editMode}
                        data={selectRole}
                      />
                    )}
                  </div>
                </div>
                {SecurityProfile?.securityprofile.length > 0 ? (
                  <>
                    <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
                      <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-x-hidden">
                        <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left font-medium "
                            >
                              Profile Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left font-medium"
                            >
                              Profile Description
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left font-medium"
                            >
                              Created Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {SecurityProfile?.securityprofile?.map((item) => {
                            let {
                              profileTitle,
                              profileDescription,
                              _id,
                              // createdAt,
                              createdTime,
                              // updatedByUser,
                            } = item;
                            return (
                              <tr
                                key={_id}
                                className="bg-white border-b border-gray-700 cursor-pointer"
                              >
                                <th
                                  scope="row"
                                  className="th-main px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left"
                                >
                                  <div className="flex ">
                                    <div>{profileTitle}</div>
                                    <div className="relative z-10 ml-6 ">
                                      <Menu>
                                        <Menu.Button>
                                          <img
                                            src={Menus}
                                            alt="menu "
                                            className="cursor-pointer menu-item rotate-90"
                                          />
                                        </Menu.Button>
                                        <Menu.Items className=" w-max absolute bg-white z-10 border-[1.5px] border-[#EBEBEB] rounded-[10px]">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Fragment>
                                                <button
                                                  onClick={() =>
                                                    handleClicks(_id, item)
                                                  }
                                                  className={`hover:bg-primary hover:text-white ${active
                                                    ? "bg-primary text-white"
                                                    : "text-[#6A6A6D]"
                                                    } group flex w-full border-b-[1.5px] border-[#EBEBEB] items-center font-medium px-5 py-2 text-sm`}
                                                >
                                                  Edit
                                                </button>
                                              </Fragment>
                                            )}
                                          </Menu.Item>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <Fragment>
                                                <button
                                                  onClick={() =>
                                                    openModalNewProfile(item)
                                                  }
                                                  className={`hover:bg-primary hover:text-white ${active
                                                    ? "bg-primary text-white"
                                                    : "text-[#6A6A6D]"
                                                    } group flex w-full items-center font-medium border-b-[1.5px] border-[#EBEBEB] px-5 py-2 text-sm`}
                                                >
                                                  Clone
                                                </button>
                                              </Fragment>
                                            )}
                                          </Menu.Item>
                                        </Menu.Items>
                                      </Menu>
                                    </div>
                                  </div>
                                </th>
                                <th
                                  scope="row"
                                  className="px-5 py-4 font-medium text-[#929296] text-sm whitespace-nowrap text-left"
                                >
                                  {profileDescription}
                                </th>
                                <th
                                  scope="row"
                                  className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                                >
                                  <div className="flex items-center gap-2 text-[#929296] text-sm">
                                    <PersonIcon />
                                    {moment(createdTime).format("D MMMM YYYY")}
                                  </div>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-2 mt-2 hadow-xl bg-white rounded w-[100%]">
                      <div className="flex justify-between items-center">
                        <div>Total Records {pagination?.total}</div>
                        <div className="flex justify-end items-center gap-x-10">
                          <select
                            className="form-control"
                            onChange={(e) => handleShowRows(e.target.value)}
                            value={showRows}
                          >
                            <option value="10">10 Records Per Page</option>
                            <option value="20">20 Records Per Page</option>
                            <option value="50">50 Records Per Page</option>
                          </select>
                          <button className="btn btn-primary">
                            Filter Table columns
                          </button>
                          {CustomPagination()}
                        </div>
                      </div>
                    </div>
                    {/* Profile Table End */}
                    {/* Create New Profile : clone open on select dropdown  */}
                    <Transition
                      appear
                      show={showCloneProfileModal}
                      as={Fragment}
                    >
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setShowCloneProfileModal(false)}
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
                              <Dialog.Panel className="w-full max-w-2xl lg:max-w-5xl h-full lg:h-[600px]  rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-col justify-between h-full">
                                  <div>
                                    <Dialog.Title
                                      as="h3"
                                      className="text-xl font-semibold leading-6 text-[#18181B] pb-3 border-b-[1.5px] border-[#E6E6EB]"
                                    >
                                      Create New Profile
                                    </Dialog.Title>
                                    <div className="flex w-full items-center gap-6 mb-4 mt-7">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Profile Name
                                        <span className="text-[#FF5757] ml-1">
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-4 focus-visible:outline-none"
                                        value={cloneData.profileTitle}
                                        name="profileTitle"
                                        onChange={(e) => cloneChangeHandler(e)}
                                      />
                                    </div>
                                    <div className="flex w-full items-center gap-6 mb-4">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Clone Profile
                                        <span className="text-[#FF5757] ml-1">
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Standard"
                                        className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-4 focus-visible:outline-none"
                                        value={cloneData.cloneTitle}
                                        readOnly={true}
                                      />
                                    </div>
                                    <div className="flex w-full gap-6 mb-4">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Clone Profile
                                      </label>
                                      <textarea
                                        rows="5"
                                        placeholder="Enter description"
                                        name="profileDescription"
                                        onChange={(e) => cloneChangeHandler(e)}
                                        className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full px-4 py-3 focus-visible:outline-none"
                                        value={cloneData.profileDescription}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center gap-3 ">
                                    <button
                                      onClick={() => {
                                        closeModalNewProfile(false);
                                      }}
                                      className="text-[#B2B2B6] w-full text-center bg-white border-[1px] border-[#B2B2B6] cursor-pointer font-medium rounded-2xl text-base px-5 py-4"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="text-white w-full text-center bg-primary cursor-pointer font-medium rounded-2xl text-base px-5 py-4"
                                      onClick={() => saveCloneProfile()}
                                    >
                                      Create
                                    </button>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                    {/* Create New Profile : clone open on select dropdown  */}
                    {/* Rename Profile : Rename open on select dropdown  */}
                    <Transition appear show={createRenameProfile} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setCreateRenameProfile(false)}
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
                              <Dialog.Panel className="w-full max-w-2xl lg:max-w-5xl h-full lg:h-[600px]  rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-col justify-between h-full">
                                  <div>
                                    <Dialog.Title
                                      as="h3"
                                      className="text-xl font-semibold leading-6 text-[#18181B] pb-3 border-b-[1.5px] border-[#E6E6EB]"
                                    >
                                      Rename Profile
                                    </Dialog.Title>
                                    <div className="flex w-full items-center gap-6 mb-4 mt-7">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Profile Name
                                        <span className="text-[#FF5757] ml-1">
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-4 focus-visible:outline-none"
                                      />
                                    </div>
                                    <div className="flex w-full gap-6 mb-4">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Clone Profile
                                      </label>
                                      <textarea
                                        rows="5"
                                        placeholder="Enter description"
                                        className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full px-4 py-3 focus-visible:outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center gap-3 ">
                                    <button
                                      onClick={() => {
                                        closeModalRenameProfile(false);
                                      }}
                                      className="text-[#B2B2B6] w-full text-center bg-white border-[1px] border-[#B2B2B6] cursor-pointer font-medium rounded-2xl text-base px-5 py-4"
                                    >
                                      Cancel
                                    </button>
                                    <button className="text-white w-full text-center bg-primary cursor-pointer font-medium rounded-2xl text-base px-5 py-4">
                                      Create
                                    </button>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                    {/* Rename Profile : Rename open on select dropdown  */}
                    {/* Delete Profile : Delete open on select dropdown  */}
                    <Transition appear show={createDeleteProfile} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setCreateDeleteProfile(false)}
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
                              <Dialog.Panel className="w-full max-w-2xl h-full   rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-col justify-between h-full">
                                  <div>
                                    <Dialog.Title
                                      as="h3"
                                      className="text-xl font-semibold leading-6 text-[#18181B] pb-3 border-b-[1.5px] border-[#E6E6EB]"
                                    >
                                      Delete Profile
                                    </Dialog.Title>
                                    <div className="text-black text-xl font-normal py-8">
                                      There are other users associated with this
                                      profile. Please transfer the users to
                                      another profile and then delete it.
                                    </div>
                                    <div className="flex w-full items-center gap-6 mb-8">
                                      <label
                                        htmlFor="countries"
                                        className="whitespace-nowrap text-lg font-medium text-[#929296] min-w-[130px]"
                                      >
                                        Transfer user’s to
                                      </label>
                                      <select
                                        className="focus-visible:outline-none cursor-pointer
                                     bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-4 py-5"
                                      >
                                        <option value="">Administrator</option>
                                        <option value="">User</option>
                                        <option value="">Guest</option>
                                      </select>
                                      {/* <input
                                      type="text"
                                      className="min-w-[180px] border border-[#E6E6EB] text-gray-700 text-sm rounded-lg block w-full p-2.5 py-4 focus-visible:outline-none"
                                    /> */}
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center gap-3 ">
                                    <button
                                      onClick={() => {
                                        setCreateDeleteProfile(false);
                                      }}
                                      className="text-[#B2B2B6] w-full text-center bg-white border-[1px] border-[#B2B2B6] cursor-pointer font-medium rounded-2xl text-base px-5 py-4"
                                    >
                                      Cancel
                                    </button>
                                    <button className="text-white w-full text-center bg-primary cursor-pointer font-medium rounded-2xl text-base px-5 py-4">
                                      Transfer and Delete
                                    </button>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                    {/* Delete Profile : Delete open on select dropdown  */}
                  </>
                ) : (
                  <div className="w-full text-center">No data found</div>
                )}
              </Tab.Panel>
              <Tab.Panel>
                <RoleManagement />
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <div className="text-primary text-base font-semibold">
                    Data Sharing Settings
                  </div>
                  <p className="text-[#929296]">
                    This page allows you to manage default organization
                    permissions and sharing rules. Default organization
                    permissions govern how your records are shared across the
                    organization. To further customize your settings, you can
                    add sharing rules, which allow you to share records based on
                    record owner or criteria with roles, roles and subordinates,
                    groups, and all users.
                  </p>
                  <DataSharing />
                </div>
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>
      </>
    </div>
  );
};

export default SecurityProfileList;
