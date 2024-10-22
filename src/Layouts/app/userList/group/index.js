import { useState } from "react";
import { AddGroup } from "../common";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  CREATE_GROUP,
  GET_GROUP_LIST,
  UPDATE_GROUP,
  getUserList,
} from "../../../../Redux/actions/userList";
import { useEffect } from "react";
import Edits from "../../../../assets/images/user/Edits.svg";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Select from "react-select";

const Group = ({ offset, limit }) => {
  const pagination = useSelector((state) => state?.profile?.groupPagination);
  const userList = useSelector((store) => store?.profile?.userList);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRows, setShowRows] = useState(10);
  const [modal, showModal] = useState(false);
  const [str, setStr] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState([]);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

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
  const handleShowRows = (val) => {
    setShowRows(val);
    dispatch(GET_GROUP_LIST(currentPage + 1, val)).then((res) => {
      setData(res?.groupData);
    });
  };

  useEffect(() => {
    if (data?.length > 0 && pagination) {
      setCurrentPage(pagination?.offset - 1);
    }
  }, [data, pagination]);

  const handlePagination = (page) => {
    dispatch(GET_GROUP_LIST(page.selected + 1, showRows)).then((res) => {
      setData(res?.groupData);
    });
  };

  useEffect(() => {
    // if (currentPage) {
    dispatch(GET_GROUP_LIST(currentPage, showRows, str)).then((res) => {
      setData(res?.groupData);
    });
    // }
  }, [dispatch, showRows, str]);

  const handleShow = () => {
    setTitle("");
    setDescription("");
    setUserId([]);
    showModal(true);
  };
  const EditHandler = (group) => {
    if (group?.userListData[0]?._id) {
      setUserId(
        (group?.userListData || []).map((item) => {
          return {
            label: `${item?.firstName} ${item?.lastName}`,
            value: item._id,
          };
        })
      );
    } else {
      setUserId([]);
    }
    setId(group._id);
    setTitle(group.groupTitle);
    setDescription(group.description);
    showModal(true);
  };

  const saveFunction = () => {
    const data = {
      groupTitle: title,
      description,
      userList: userId?.map((item) => item?.value),
    };
    if (!id) {
      dispatch(CREATE_GROUP(data)).then((res) => {
        if (res?.status === 200) {
          showModal(false);
          dispatch(GET_GROUP_LIST(currentPage, showRows)).then((res) => {
            setData(res?.groupData);
          });
          setTitle("");
          setDescription("");
          setUserId([]);
        }
      });
    } else {
      dispatch(UPDATE_GROUP(id, data)).then((res) => {
        if (res?.status === 200) {
          showModal(false);
          dispatch(GET_GROUP_LIST(currentPage, showRows)).then((res) => {
            setData(res?.groupData);
          });
          setTitle("");
          setDescription("");
          setUserId([]);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getUserList({ page: 1, limit: 40000 }));
  }, []);
  
  return (
    <div className="p-4">
      <div className="mb-4 px-10">
        <div className="text-primary text-base font-semibold">Groups</div>
        <p className="text-[#929296]">
          This page lists all public groups created for your organization.
        </p>
      </div>
      <div className="px-4">
        <AddGroup handleShow={handleShow} setStr={setStr} str={str} />
      </div>
      {data?.length > 0 ? (
        <>
          <div className={`form-group  p-4 row flex items-center`}>
            <div className="w-full border-[1.5px] border-[#E6E6EB] rounded-2xl">
              <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium ">Title</th>
                    <th className="px-6 py-3 text-left font-medium ">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left font-medium ">Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((group, index) => (
                    <tr
                      key={index}
                      className="bg-white cursor-pointer border-b border-[1.5px]-[#E6E6EB]"
                    >
                      <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                        {group.groupTitle}
                      </td>
                      <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                        {group.description}
                      </td>
                      <td className="px-5 py-4 font-medium text-sm text-primary whitespace-nowrap text-left">
                        <div className="">
                          <button
                            onClick={() => EditHandler(group)}
                            className="flex items-center gap-2 py-2 px-2 bg-[#E2F2FF] rounded text-sm text-[#243C7F] cursor-pointer"
                          >
                            <img src={Edits} />
                          </button>
                        </div>
                      </td>
                      {/* <td>Delete</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">No data found</div>
      )}

      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => showModal(false)}
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
                >
                  {id ? "Update" : "Add"} Group
                </Dialog.Title>
                <div className="container ">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">Title:</label>
                    <input
                      name="groupTitle"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 "
                    />
                  </div>
                </div>
                <div className="container ">
                  <div className="grid lg:grid-cols-1">
                    <label className="font-semibold mt-3">User List:</label>
                    <Select
                      options={userList?.map((item, index) => {
                        return {
                          label: `${item?.firstName} ${item?.lastName}`,
                          value: item?._id,
                        };
                      })}
                      isMulti
                      className="my-2"
                      value={userId}
                      onInputChange={(e) => console.log("")}
                      onChange={(e) => setUserId(e)}
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-1  mt-2 mb-6">
                  <label className="font-semibold mt-3">Description:</label>
                  <textarea
                    id="message"
                    name="description"
                    rows="4"
                    className="block  my-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:bg-gray-100 "
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                 
                </div>
                <div className="flex justify-end">
                  <button
                    className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                    onClick={() => showModal(false)}
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
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
        <div className="p-2 mt-2 hadow-xl bg-white rounded w-[100%]">
          <div className="flex justify-between items-center">
            <div>Total Records {pagination?.total}</div>
            <div className=" flex justify-end items-center gap-x-10 items-center">
              <select
                className="form-control"
                onChange={(e) => handleShowRows(e.target.value)}
                value={showRows}
              >
                <option value="10">10 Records Per Page</option>
                <option value="20">20 Records Per Page</option>
                <option value="50">50 Records Per Page</option>
              </select>

              {CustomPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Group;
