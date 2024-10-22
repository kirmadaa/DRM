import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserList,
  getAllActiveDeactive,
} from "../../../../Redux/actions/userList";
import ReactPaginate from "react-paginate";
import { Tab } from "@headlessui/react";
import { Call, Mail, HideArrow, Edit } from "../../../../assets/svgIcons";
import avtar from "../../../../assets/images/users/user-dummy-img.jpg";
import { ActiveDeactive, Searchbar, TabComponent } from "../common";
import Group from "../group";
import ActiveUserList from "../activeUser";
import CopyValue from '../../../../Components/copyValue'
import UpdateUserProfile from "./updateUserProfile";

const RightSideContent = ({ label, userValues }) => {
  return (
    <>
      <div className="mb-6 flex justify-between">
        <label className="text-[#191242] text-sm font-semibold">{label}</label>
        <input
          className="text-xs font-medium w-1/2 focus:outline-0 text-[#B2B2B6]"
          placeholder={`Enter ${label} `}
          value={userValues}
        />
      </div>
    </>
  );
};
const UserCreate = (props) => {
  const {
    handleShow,
    handleEdit,
    setActiveDropdown,
    activeDropdown,
    currentPage,
    setCurrentPage,
  } = props;
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.profile?.userList);
  const pagination = useSelector((state) => state?.profile?.pagination);

  const [showRows, setShowRows] = useState(10);
  const [selectedUser, setSelectedUser] = useState();
  const [userOpendValue, setUserOpendValue] = useState([]);
  const [mainCheckboxSelected, setMainCheckboxSelected] = useState(false);
  const [userList, setUserList] = useState(users);
  const [allActDeactive, setAllActDeactive] = useState();
  const [singleSelect, setSingleSelect] = useState("");
  const [singleObj, setSingleObj] = useState({});

  const onChangeSearch = (e) => {
    setTimeout(() => {
      dispatch(
        getUserList({
          page: 1,
          limit: showRows,
          str: e.target.value,
          active: activeDropdown,
        })
      );
    }, 1000);
  };

  const onChangeAllSelect = (e) => {
    const isChecked = e?.target?.checked;
    if (isChecked) {
      setUserOpendValue(userList?.map((item) => item?._id));
    } else {
      setUserOpendValue([]);
    }
    setMainCheckboxSelected(isChecked);
    const updatedUsers = users?.map((user) => ({
      ...user,
      is_active: isChecked,
    }));
    let myarrays = [];
    updatedUsers.map((data) => {
      return myarrays.push(data?._id);
    });
    let updatedArray = {
      id: [...myarrays],
      is_active: !isChecked,
    };
    setAllActDeactive(updatedArray);
    setUserList(updatedUsers);
  };

  const handleFilterChange = (status) => {
    setActiveDropdown(status);
    dispatch(
      getUserList({
        page: 1,
        limit: showRows,
        status: activeDropdown,
        active: status,
        userlist: true
      })
    );
  };
  const handleActiveDeactive = () => {
    let updatedArray = {
      id: [...userOpendValue],
      is_active: !activeDropdown,
    };
    dispatch(getAllActiveDeactive(updatedArray));
    dispatch(getUserList({ page: 1, limit: showRows, status: activeDropdown, userlist: true }));
    setUserOpendValue([]);
  };
  const handleSingle = (user) => {
    setSingleSelect(user?._id);
    setSingleObj(user);
  };

  const handleShowRows = (val) => {
    setShowRows(val);
    dispatch(
      getUserList({ page: currentPage + 1, limit: val, active: activeDropdown })
    );
  };

  const handlePagination = (page) => {
    setMainCheckboxSelected(false);
    setCurrentPage(page.selected);
    dispatch(
      getUserList({
        page: page.selected + 1,
        limit: showRows,
        active: activeDropdown,
      })
    );
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(pagination?.total / showRows));
    return (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage}
        onPageChange={(page) => handlePagination(page)}
        containerClassName={
          "pagination react-paginate text-sm gap-2 flex justify-end my-2"
        }
      />
    );
  };

  const handleCheckedopend = async (e, user) => {
    let addUser = [...userOpendValue];
    const newArray = [];
    newArray.push(user?._id);
    if (addUser.includes(user?._id)) {
      setUserOpendValue(addUser.filter((ele) => ele !== user?._id));
    } else {
      addUser.push(user?._id);
      setUserOpendValue(addUser);
    }
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  useEffect(() => {
    if (users?.length > 0) {
      const userfirstValue = users[0];
      setSingleSelect(userfirstValue?._id);
      setSingleObj(userfirstValue);
      // setUserOpendValue(singleObj);
      // setUserOpendValue(userfirstValue);
      setSelectedUser(userfirstValue);
    }
  }, [users, userList]);

  useEffect(() => {
    if (currentPage) {
      dispatch(
        getUserList({
          page: currentPage,
          limit: showRows,
          active: activeDropdown,
          userlist: true
        })
      );
    }
  }, [dispatch, showRows]);

  useEffect(() => {
    if (users?.length > 0 && pagination) {
      setCurrentPage(pagination?.offset - 1);
    }
  }, [users, pagination]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <>
      <div>
        <div>
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <TabComponent />
              <div className="">
                <div className="">
                  <Tab.Panels>
                    <Tab.Panel>
                      <div>
                        <div className="block lg:grid grid-cols-2 justify-between">
                          <div className="px-[60px] border-r  pt-7 pb-[20px] ">
                            <ActiveDeactive
                              userOpendValue={userOpendValue}
                              handleFilterChange={handleFilterChange}
                              handleActiveDeactive={handleActiveDeactive}
                              handleShow={handleShow}
                              allActDeactive={allActDeactive}
                              activeDropdown={activeDropdown}
                            />
                            {userList?.length > 0 ? (
                              <>
                                <Searchbar
                                  onChangeAllSelect={onChangeAllSelect}
                                  mainCheckboxSelected={mainCheckboxSelected}
                                  onChangeSearch={onChangeSearch}
                                />
                                {userList?.map((user, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className={`form-group  py-4 pl-[60px] pr-[30px] -mx-[60px] row flex items-center ${singleSelect === user?._id &&
                                        "bg-[#e7f2ff] active"
                                        } `}
                                    >
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="me-6"
                                          name="subcheckbox"
                                          checked={
                                            (mainCheckboxSelected &&
                                              user?.is_active) ||
                                              userOpendValue
                                              ? userOpendValue?.includes(
                                                user?._id
                                              )
                                              : null
                                          }
                                          onChange={(e) => {
                                            handleCheckedopend(e, user);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="flex items-center"
                                        onClick={() => handleSingle(user)}
                                      >
                                        <label
                                          htmlFor="firstName"
                                          className="col-sm-3 col-form-label"
                                        >
                                          <div className="user-profile">
                                            <img
                                              className="avatar w-16 h-16 rounded-full object-cover"
                                              src={avtar}
                                              alt="profile"
                                            />
                                          </div>
                                        </label>
                                        <div
                                          className="col-sm-6 ml-6 details w-[350px]"
                                          onClick={(e) => { }}
                                        >
                                          <div className="username flex justify-between items-center text-[#18181B] text-base font-bold mb-1">
                                            <h1>
                                              {user.firstName} {user.lastName}
                                            </h1>
                                            <CopyValue value={user?._id} />
                                          </div>
                                          <div className="bio flex flex-col">
                                            <p className="flex gap-2 items-center text-[#6A6A6D] font-medium text-base">
                                              <Mail />
                                              {user.email || "Email Not Found"}
                                            </p>
                                            <p className="flex items-center gap-2 text-[#6A6A6D] font-medium text-base">
                                              <Call className="me-4" />
                                              {user.mobile ||
                                                "Mobile Not Found"}
                                            </p>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <div className="text-center">No data found</div>
                            )}
                          </div>

                          <div className=" p-10">
                            {users?.length > 0 ? (
                              <>
                                <div className="flex items-start pb-[38px] justify-between">
                                  <div className="form-group w-[90%] row flex items-center">
                                    <label
                                      htmlFor="firstName"
                                      className="col-sm-3 col-form-label"
                                    >
                                      <div className="user-profile">
                                        <UpdateUserProfile selectedUser={singleObj} avtar={avtar} />
                                        {/* <img
                                          className="avatar object-cover h-[80px] w-[80px] min-w-[80px]"
                                          src={avtar}
                                          alt="Ash"
                                        /> */}
                                      </div>
                                    </label>
                                    <div className="col-sm-6 ml-6 details w-[350px]">
                                      <div className="username text-[#18181B] text-base font-bold mb-1">
                                        {singleObj?.firstName}{" "}
                                        {singleObj?.lastName}
                                        <span className="text-[#008EFF] ml-2 text-xs font-medium py-1 px-2 bg-[#E2F2FF] rounded-[22px]">
                                          {singleObj?.roleTitle}
                                        </span>
                                      </div>
                                      <div className="bio flex flex-col">
                                        <p className="flex mb-3 gap-2 items-center text-[#18181B] font-medium text-xs">
                                          {singleObj?.email && <Mail />}
                                          {singleObj?.email}
                                        </p>
                                        <p className="flex gap-2 items-center text-[#18181B] font-medium text-xs">
                                          {singleObj?.phone ||
                                            (singleObj?.mobile && <Call />)}
                                          {singleObj?.phone}
                                          {singleObj?.mobile}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-baseline">
                                    <button
                                      className="bg-[#E2F2FF] flex gap-2 text-left py-1 px-2 rounded-[22px] text-[#243C7F] text-sm font-medium"
                                      onClick={() => handleEdit(singleObj)}
                                    >
                                      {" "}
                                      <Edit /> Edit
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[#008EFF] font-medium text-xs">
                                    Hide Detail
                                  </span>
                                  {/* <img src={HideArrow()} alt="icon" /> */}
                                </div>
                                <div className="mt-[35px]">
                                  <h4 className="text-[#18181B] text-lg font-semibold mb-4">
                                    User Information
                                  </h4>
                                </div>
                                <div>
                                  <form>
                                    {RightSideContent({
                                      label: "First Name",
                                      userValues: singleObj?.firstName,
                                    })}
                                    {RightSideContent({
                                      label: "Last Name",
                                      userValues: singleObj?.lastName,
                                    })}
                                    {RightSideContent({
                                      label: "Profile",
                                      userValues:
                                        singleObj?.profile?.profileTitle,
                                    })}
                                    {RightSideContent({
                                      label: "Email",
                                      userValues: singleObj?.email,
                                    })}
                                    {RightSideContent({
                                      label: "DOB",
                                      userValues: singleObj?.DOB,
                                    })}
                                    {RightSideContent({
                                      label: "Mobile",
                                      userValues: singleObj?.mobile,
                                    })}
                                    {RightSideContent({
                                      label: "Phone",
                                      userValues: singleObj?.phone,
                                    })}
                                    {RightSideContent({
                                      label: "Country",
                                      userValues: singleObj?.country,
                                    })}
                                    {RightSideContent({
                                      label: "Verified",
                                      userValues: singleObj?.verified,
                                    })}

                                    {RightSideContent({
                                      label: "City",
                                      userValues: singleObj?.name,
                                    })}
                                    {RightSideContent({
                                      label: "CountryLocale",
                                      userValues: singleObj?.countryLocale,
                                    })}
                                    {RightSideContent({
                                      label: "Fax",
                                      userValues: singleObj?.fax,
                                    })}
                                    {RightSideContent({
                                      label: "Is_active",
                                      userValues: singleObj?.is_active,
                                    })}
                                    {RightSideContent({
                                      label: "Language",
                                      userValues: singleObj?.language,
                                    })}

                                    {RightSideContent({
                                      label: "Profile",
                                      userValues: singleObj?.profile,
                                    })}
                                    {RightSideContent({
                                      label: "RegistrationType",
                                      userValues: singleObj?.registrationType,
                                    })}
                                    {RightSideContent({
                                      label: "RoleTitle",
                                      userValues: singleObj?.profile?.roleTitle == "CEO" ? singleObj?.profile?.roleTitle : "User",
                                      // userValues: singleObj?.roleTitle == "CEO" ? singleObj?.roleTitle : "User",
                                    })}
                                    {RightSideContent({
                                      label: "SocialProfiles",
                                      userValues: singleObj?.socialProfiles,
                                    })}
                                    {RightSideContent({
                                      label: "State",
                                      userValues: singleObj?.state,
                                    })}
                                    {RightSideContent({
                                      label: "Street",
                                      userValues: singleObj?.street,
                                    })}
                                    {RightSideContent({
                                      label: "Website",
                                      userValues: singleObj?.website,
                                    })}
                                    {RightSideContent({
                                      label: "ZipCode",
                                      userValues: singleObj?.zipCode,
                                    })}
                                  </form>
                                </div>
                              </>
                            ) : (
                              <div className="text-center">
                                {" "}
                                No data found !!
                              </div>
                            )}
                          </div>
                        </div>
                        {userList?.length > 0 && (
                          <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
                            <div className="p-2 mt-2 hadow-xl bg-white rounded w-[100%]">
                              <div className="flex justify-start items-center">
                                <div className=" whitespace-nowrap">
                                  Total Record {pagination?.total}
                                </div>
                                <div className="ml-6 flex justify-end  gap-x-10 items-center">
                                  <select
                                    onChange={(e) =>
                                      handleShowRows(e.target.value)
                                    }
                                    value={showRows}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  >
                                    <option value="10">
                                      10 Record per page
                                    </option>
                                    <option value="20">
                                      20 Record per page
                                    </option>
                                    <option value="50">
                                      50 Record per page
                                    </option>
                                    <option value="100">
                                      100 Record per page
                                    </option>
                                  </select>

                                  {CustomPagination()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <ActiveUserList />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Group offset={currentPage} limit={showRows} />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </div>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCreate;
