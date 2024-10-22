import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GET_ALL_ROLE_DATA } from "../../../../Redux/actions/role";
import { useSelector } from "react-redux";
import Select from "react-select";
import { CREATE_CUSTOMIZATION_DASHBOARD, GET_CUSTOMIZATION_DASHBOARD, GET_CUSTOMIZATION_DASHBOARD_DETAILS, UPDATE_CUSTOMIZATION_DASHBOARD } from "../../../../Redux/actions/customizeDashboard";

const ActionBarHomeCustom = ({ data, updateViewHandler }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const roles = useSelector((state) => state?.role?.roledata);
  const dataDetails = useSelector(state => state?.CustomizationDashboard?.details)
  const dashbaordList = useSelector(state => state?.CustomizationDashboard?.list)
  const [usedRoles, setUsedRoles] = useState([])
  const infoDefault = {
    name: "Untitled Homepage",
    description: "",
    roles: []
  }
  const [infoData, setInfoData] = useState(infoDefault)
  const [roleRequired, setRoleRequiredErr] = useState(false)
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const id = query.get("id");

  const handleSubmit = async () => {

    if (!infoData?.roles.length) {
      setRoleRequiredErr(true)
      return;
    }

    const postData = {
      ...infoData,
      roles: infoData?.roles.length ? infoData?.roles?.map(e => e.value) : [],
      dashboard: data,
    }
    if (id) {
      dispatch(UPDATE_CUSTOMIZATION_DASHBOARD(id, postData)).then(res => {
        dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
        navigate(-1)
      })
    } else {
      dispatch(CREATE_CUSTOMIZATION_DASHBOARD(postData)).then(res => {
        dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
        navigate(-1)
      })
    }

  };

  useEffect(() => {
    const upDetails = { ...dataDetails }
    updateViewHandler(upDetails?.dashboard)
    const roleData = []
    roles?.map(role => {
      if (upDetails?.roles?.includes(role._id)) {
        roleData.push({
          label: role?.roleTitle,
          value: role?._id,
        })
      }
    })
    setInfoData({
      name: upDetails.name,
      description: upDetails.description,
      roles: roleData
    })
  }, [dataDetails])


  useEffect(() => {
    dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
    dispatch(GET_CUSTOMIZATION_DASHBOARD())
    dispatch(GET_ALL_ROLE_DATA(1, 100))
    if (id) {
      dispatch(GET_CUSTOMIZATION_DASHBOARD_DETAILS(id))
    }
  }, [])

  useEffect(() => {
    let array = []
    dashbaordList.map(list => {
      array.push(list.roles)
    })
    setUsedRoles(array.flat())
  }, [roles])

  return (<>
    <div className="bg-white p-3 flex justify-between items-center">
      <div>
        <input className="text-xl"
          value={infoData.name}
          name="name"
          onChange={(e) => setInfoData({ ...infoData, name: e?.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setInfoData(infoDefault)
            updateViewHandler([])
            dispatch({ type: "RESET_CUSTOMIZATION_DASHBOARD_DETAIL" });
            navigate(-1)
          }}
          className="rounded-md px-2 py-1 bg-gray-100 text-primary"
        >
          Go Back
        </button>
        <button

          className="bg-primary text-white font-[300] px-2 py-1 rounded-md shadow"
          onClick={() => setModal(true)}
        >
          Save Dashboard
        </button>
      </div>
    </div>

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
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-[#E6E6EB]"
              >
                {id ? "Update" : "Add"} Dashboard
              </Dialog.Title>
              <div className="container ">
                <div className="grid lg:grid-cols-1">
                  <label className="font-semibold mt-3">Title:</label>
                  <input
                    className="border border-grey rounded my-2 px-3 py-2 focus:outline-none hover:bg-gray-100 "
                    value={infoData.name}
                    name="name"
                    onChange={(e) => setInfoData({ ...infoData, name: e?.target.value })}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-1  mt-2 mb-6">
                <label className="font-semibold mt-3">Description:</label>
                <textarea
                  id="message"
                  name="description"
                  rows="2"
                  value={infoData.description}
                  onChange={(e) => setInfoData({ ...infoData, description: e?.target.value })}
                  className="block  my-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:bg-gray-100 "
                // placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <div className="container ">
                <div className="grid lg:grid-cols-1">
                  <label className="font-semibold mt-3">Assign Role:</label>
                  <Select
                    options={
                      roles?.map((item, index) => {
                        return {
                          label: item?.roleTitle,
                          value: item?._id,
                        };
                      }).filter(value => {
                        return !usedRoles?.includes(value?.value)
                          || dataDetails?.roles?.includes(value?.value)
                      })}
                    isMulti
                    className="my-2"
                    value={infoData.roles}
                    onChange={(e) => {
                      setRoleRequiredErr(false)
                      setInfoData({ ...infoData, roles: e })
                    }}
                  />
                </div>
                {roleRequired && <div className="text-red-500">Role is required</div>}
              </div>
              <div className="flex justify-end">
                <button
                  className=" border-[#191242] border rounded-2xl px-5 py-2 h-[48px] "
                  onClick={() => setModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => handleSubmit()}
                  className="text-white ml-2 bg-primary cursor-pointer font-medium rounded-2xl text-sm px-5 py-2 h-[48px] text-center "
                >
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog >
    </Transition >
  </>
  );
};

export default ActionBarHomeCustom;
