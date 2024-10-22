import { Fragment, React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  getProfile,
  createprofile,
  getUserList,
  updateSubUserProfile,
  GET_GROUP_LIST,
} from "../../../../Redux/actions/userList";
import UserCreate from "../create/index";
import { Dialog, Transition } from "@headlessui/react";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import { GET_ALLDATA_PROFILE } from "../../../../Redux/actions/security-control";

const UserList = (props) => {
  const { ProfileAction, createprofileAction, userListAction } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const FormJson = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    alias: "",
    countryLocale: "",
    fax: "",
    language: "",
    phone: "",
    registrationType: "",
    roleTitle: "",
    DOB: "",
    street: "",
    state: "",
    country: "",
    verified: "",
    zipCode: "",
    website: "",
    role: "",
    profile: "",
    socialProfiles: "",
    edit: false,
  };
  const [dob, setDob] = useState(new Date());

  const [formValue, setFormValue] = useState(FormJson);
  const roles = useSelector((store) => store.role);
  const userList = useSelector((store) => store.SecurityProfile);

  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleShow = () => {
    setEditMode(false);
    setDob(new Date());
    setFormValue(FormJson);
    setShow(true);
  };

  const rolesData = roles?.roledata || [];
  const [roleId, setRoleId] = useState(rolesData[0]?._id);
  const defaultUserId =
    userList && userList?.securityprofile?.length > 0
      ? userList?.securityprofile?.[0]?._id
      : "";
  const [userID, setuserID] = useState(defaultUserId);
  const [groupData, setGroupData] = useState([]);
  const defaultGroupId =
    groupData && groupData.length > 0 ? groupData[0]?._id : "";
  const [groupId, setGroupId] = useState(defaultGroupId);
  const [activeDropdown, setActiveDropdown] = useState(true);
  const handleEdit = (user) => {
    setFormValue({ ...user, edit: true });
    setRoleId(user?.role);
    setGroupId(user?.group?._id);
    setuserID(user?.profile?._id);
    setShow(true);
    setDob(user?.DOB);
    setEditMode(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    ProfileAction();
    dispatch(GET_GROUP_LIST(1, 100)).then((res) => {
      if (res) {
        setGroupData(res?.groupData);
      }
    });
    dispatch(GET_ALL_ROLE_DATA(1, 100));
    dispatch(GET_ALLDATA_PROFILE());
    userListAction({
      page: currentPage,
      limit: 10,
      active: activeDropdown,
      userlist: true,
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    mobile: Yup.string()
      .matches(/^[6789]\d{9}$/, "Invalid Mobile Number") // Indian standard mobile number regex
      .required("*Required"),
    email: Yup.string().required("Email is Required"),

    // password: Yup.string().required("Password is Required"),
  });
  const closeModal = () => {
    setShow(false);
  };
  useEffect(() => {
    if (show && !editMode) {
      setDob(new Date());
      setRoleId(rolesData[0]?._id);
      setGroupId(defaultGroupId);
    }
  }, [roles?.roledata, show]);

  return (
    <div>
      <div className="content  content-auth prfle editprofile">
        <div className=" m-auto">
          <div className="media align-items-stretch  h-100 profilee">
            <div className="sign-wrapper mg-lg-r-50 mg-xl-r-60">
              <div className="wd-100 border-[1.5px] border-[#E6E6EB] rounded-2xl  bg-white usercard">
                <UserCreate
                  handleShow={handleShow}
                  handleEdit={handleEdit}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Formik
            enableReinitialize
            initialValues={formValue}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              values.roleId = roleId;
              values.groupId = groupId;
              values.profile = userID;
              if (!editMode) {
                delete values?.role;
                values.DOB = dob;
                createprofileAction({ ...values }).then((res) => {
                  if (res === 200) {
                    dispatch(
                      getUserList({
                        page: 1,
                        limit: 10,
                        active: activeDropdown,
                        userlist: true,
                      })
                    );
                    setShow(false);
                    setDob(new Date());
                    setEditMode(false);
                    setFormValue(FormJson);
                  }
                });
              } else {
                delete values?.role;
                values.roleId = roleId;
                values.groupId = groupId;
                const userId = values?._id;
                const data = { ...values, DOB: dob };
                dispatch(updateSubUserProfile(userId, data)).then((res) => {
                  if (res === 200) {
                    dispatch(
                      getUserList({
                        page: currentPage + 1,
                        limit: 10,
                        active: activeDropdown,
                        userlist: true,
                      })
                    );
                  }
                  setShow(false);
                  setDob(new Date());
                  setEditMode(false);
                  setFormValue(FormJson);
                });
              }
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form id="my-form">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-60 " />
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
                      <Dialog.Panel className="w-[1200px]  transform overflow-scroll h-[74vh] rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl  mb-4 font-medium leading-6 text-gray-900"
                        >
                          {editMode ? "Update user" : "Create user"}
                        </Dialog.Title>
                        <h3 className="text-[#38383B] text-lg font-semibold my-4 ">
                          Account Information
                        </h3>
                        <div className="grid lg:grid-cols-3 gap-5">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              First Name
                            </label>
                            <div className="col-sm-6">
                              <Field
                                name="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                className={`form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base ${touched?.firstName && errors.firstName
                                    ? "is-invalid"
                                    : ""
                                  }`}
                              />
                              <p className="text-red-400">
                                <ErrorMessage
                                  name="firstName"
                                  className="bg-[danger] feedback"
                                />
                              </p>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="firstName"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Last Name
                            </label>
                            <div className="col-sm-6">
                              <Field
                                name="lastName"
                                type="text"
                                className="form-control rounded-[10px] w-full border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Last Name"
                              />
                              <p className="text-red-400">
                                <ErrorMessage
                                  name="lastName"
                                  className="bg-[danger] feedback"
                                />
                              </p>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="firstName"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Email
                            </label>
                            <div>
                              <Field
                                disabled={editMode}
                                name="email"
                                type="email"
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Email"
                              />
                              <p className="text-red-400">
                                <ErrorMessage
                                  name="email"
                                  className="bg-[danger] feedback"
                                />
                              </p>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="firstName"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Mobile
                            </label>
                            <div>
                              <Field
                                disabled={editMode}
                                name="mobile"
                                type="number"
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Mobile"
                              />
                              <p className="text-red-400">
                                <ErrorMessage
                                  name="mobile"
                                  className="bg-[danger] feedback"
                                />
                              </p>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="roleId"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Profile
                            </label>
                            <div className="col-sm-6">
                              <select
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Select Role"
                                name="profile"
                                value={userID}
                                // defaultValue={userID}
                                onChange={(e) => setuserID(e.target.value)}
                              >
                                {userList?.securityprofile?.length === 0 ? (
                                  <>
                                    <option>{"Please Create Profile"}</option>
                                    <option disabled>
                                      {"No Profile Found!!"}
                                    </option>
                                  </>
                                ) : (
                                  <>
                                    <option value={""}>
                                      {"Select Profile"}
                                    </option>
                                    {userList?.securityprofile?.map((value) => (
                                      <option
                                        key={value?._id}
                                        value={value?._id}
                                      >
                                        {value?.profileTitle}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="roleId"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Role
                            </label>
                            <div className="col-sm-6">
                              <select
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Select Role"
                                name="roleId"
                                value={roleId}
                                defaultValue={roleId}
                                onChange={(e) => setRoleId(e.target.value)}
                              >
                                {rolesData?.length === 0 ? (
                                  <>
                                    <option>{"Please Create Role"}</option>
                                    <option disabled>
                                      {"No Role Found!!"}
                                    </option>
                                  </>
                                ) : (
                                  <>
                                    <option>{"Select Role"}</option>
                                    {rolesData?.map((value) => {
                                      return (
                                        <option
                                          key={value?._id}
                                          value={value?._id}
                                        >
                                          {value?.roleTitle}
                                        </option>
                                      );
                                    })}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="Fax"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Fax
                            </label>
                            <div>
                              <Field
                                name="fax"
                                type="text"
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Fax"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="DOB"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Date of Birth
                            </label>

                            <div>
                              <input
                                type="date"
                                name="DOB"
                                selected={dob ? new Date(dob) : null}
                                onChange={(e) => {
                                  setDob(e.target.value);
                                }}
                                max={"3099-12-31"}
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                value={dob}
                                placeholder="Enter Date of Birth"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="zipCode"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              PIN Code
                            </label>
                            <div>
                              <Field
                                name="zipCode"
                                type="text"
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Pin Code"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="language"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Language
                            </label>
                            <div>
                              <Field
                                name="language"
                                type="text"
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Enter Language"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="groupId"
                              className="text-lg text-[#929296] font-medium col-form-label"
                            >
                              Group
                            </label>
                            <div className="col-sm-6">
                              <select
                                className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                placeholder="Select Group"
                                name="group"
                                value={groupId}
                                defaultValue={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                              >
                                {groupData?.length === 0 ? (
                                  <>
                                    <option>{"Please Create Group"}</option>
                                    <option disabled>
                                      {"No Group Found!!"}
                                    </option>
                                  </>
                                ) : (
                                  <>
                                    <option>{"Select Group"}</option>
                                    {groupData?.map((value) => {
                                      return (
                                        <option
                                          key={value?._id}
                                          value={value?._id}
                                        >
                                          {value?.groupTitle}
                                        </option>
                                      );
                                    })}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-[#38383B] text-lg font-semibold my-8">
                            Address Information
                          </h3>
                          <div className="grid lg:grid-cols-3 gap-6">
                            <div>
                              <label
                                htmlFor="street"
                                className="text-lg text-[#929296] font-medium col-form-label"
                              >
                                Street
                              </label>
                              <div>
                                <Field
                                  name="street"
                                  type="text"
                                  className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Street"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="state"
                                className="text-lg text-[#929296] font-medium col-form-label"
                              >
                                State
                              </label>
                              <div>
                                <Field
                                  name="state"
                                  type="text"
                                  className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter State"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="country"
                                className="text-lg text-[#929296] font-medium col-form-label"
                              >
                                Country
                              </label>
                              <div>
                                <Field
                                  name="country"
                                  type="text"
                                  className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Country"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="countryLocale"
                                className="text-lg text-[#929296] font-medium col-form-label"
                              >
                                Country Locale
                              </label>
                              <div>
                                <Field
                                  name="countryLocale"
                                  type="text"
                                  className="form-control rounded-[10px] w-full placeholder-opacity-100   border-[1.5px] bg-[#F8F8FC] focus:outline-0 py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Country Locale"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end items-center gap-3">
                            <button
                              type="submit"
                              className="bg-[#191242] text-center text-base  py-[10px] px-8 rounded-2xl border border-[#B2B2B6] text-white font-bold"
                              name="save"
                            >
                              {" "}
                              {editMode ? "Update" : "Save"}
                            </button>
                            <div
                              className="bg-white text-base  text-center py-[10px] px-8 rounded-2xl border border-[#B2B2B6] text-[#B2B2B6] font-bold"
                              onClick={handleClose}
                            >
                              <button
                                variant="secondary"
                                type="button"
                                className="text-center"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Transition>
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  ProfileAction: (data) => getProfile(data),
  createprofileAction: (data) => createprofile(data),
  userListAction: (data) => getUserList(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
