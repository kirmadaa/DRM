import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  GET_TABLE_HEADER,
  SAVE_VIEWS,
  UPDATE_VIEWS,
} from "../Redux/actions/user";
import { HeaderFilterIcon } from "../assets/svgIcons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../filterTable.css";

export default function FilterTableModel(props) {
  const { moduleName, api } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [Mode, setMode] = useState("upadte");
  const filters = useSelector((state) => state.user.filters);
  const TableHeaders = useSelector((state) => state.user.tableHeader);
  const id = useSelector((state) => state.user.updateIdTable);

  const hideFilterList = [
    "ModuleTitle",
    // "createdTime",
    // "updatedTime",
    "tuch",
    "deletedAt",
    "0",
    "_id",
    "NoteOwnerId",
    "LeadOwnerId",
    "tuch",
    "Owner",
    "LeadsOwnerId",
    "organizationId",
    "DealOwnerId",
    "DealsOwnerId",
    "ContactOwnerId",
    "ContactsOwnerId",
    "AccountOwnerId",
    "AccountsOwnerId",
    "TaskOwnerId",
    "TasksOwnerId",
    "MeetingOwnerId",
    "MeetingsOwnerId",
    "callOwnerId",
    "CallsOwnerId",
    "OpportunitiesOwnerId",
    "Id",
    "id",
    "connectionId",
    "taskOwnerId",
    "connectionId",
    "ModifiedBy",
    "id",
    "SmsOwnerId",
    "WhatsappOwnerId",
    "templateOwner",
    "siteVisitOwnerId",
    "meetingHostId",
    "_id",
    "ContactOwnerId",
    "organizationId",
    "EmailOwnerId",
    "noteOwnerId",
    "VendorOwnerId",
    "InventoryOwnerId",
    "CreatedBy",
    "read",
    "Lead I D",
    "lead I D",
    "Status",
    "status",
    "channelPartnerOwnerId"
  ];
  const handleselectedFilter = (item) => {
    var temp = [...data];
    temp.forEach((element) => {
      if (element.name === item.name) {
        element.value = item.value;
        element.apply = item.apply;
      }
    });
    setData(temp);
  };
  useEffect(() => {
    if (showModal) {
      LoadData();
    }
  }, [showModal]);
  useEffect(() => {
    console.log("daasdfsdfta---->>>", TableHeaders);

    if (TableHeaders?.length > 0) {
      setMode("update");
    } else {
      setMode("save");
    }
    LoadData();
  }, [TableHeaders]);

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

    // Create an array of filter objects with default properties
    filters.forEach((element) => {
      let tempobj = {
        name: element,
        value: "",
        apply: false,
      };
      temparr.push(tempobj);
    });

    // Set apply to true for elements present in TableHeaders
    temparr.forEach((element) => {
      TableHeaders?.forEach((item) => {
        if (element.name === item) {
          element.apply = true;
        }
      });
    });

    // Filter out the elements that are in hideFilterList
    const newFilter = temparr.filter(
      (fil) => !hideFilterList.includes(fil.name)
    );

    // Sort elements based on the order in TableHeaders
    const sortedFilter = newFilter.sort((a, b) => {
      const aIndex = TableHeaders.indexOf(a.name);
      const bIndex = TableHeaders.indexOf(b.name);

      if (aIndex === -1 && bIndex === -1) {
        return 0;
      }
      if (aIndex === -1) {
        return 1;
      }
      if (bIndex === -1) {
        return -1;
      }
      return aIndex - bIndex;
    });

    // Update the data state with the sorted filter list
    setData(sortedFilter);
  };


  const getModuleName = (value) => {
    if (value == "Quotes") {
      return "Quotes"
    } else {
      return value
    }
  }
  const handleSave = () => {
    let temparr = [];
    data?.forEach((element) => {
      if (element.apply) {
        temparr.push(element.name);
      }
    });
    temparr = temparr.filter((filter) => !hideFilterList.includes(filter));
    if (Mode === "update") {
      dispatch(
        UPDATE_VIEWS({ tableView: getModuleName(moduleName), data: temparr, id: id })
      ).then((res) => {
        setshowModal(false);
        LoadData();
      });
    } else {
      dispatch(SAVE_VIEWS({ tableView: getModuleName(moduleName), data: temparr })).then(
        (res) => {
          setshowModal(false);
          LoadData();
        }
      );
    }
    setTimeout(() => {
      dispatch(GET_TABLE_HEADER(api.tableHeaderApi));

    }, 5000);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    console.log("result--->>", destination);
    if (source && destination) {
      let preSections = [...data]; // Make a copy of the data array
      let secWantToChangePlace = preSections[source.index];

      // If dragging forward, shift elements backward
      if (destination.index > source.index) {
        for (let i = source.index; i < destination.index; i++) {
          preSections[i] = preSections[i + 1];
        }
      }
      // If dragging backward, shift elements forward
      else {
        for (let i = source.index; i > destination.index; i--) {
          preSections[i] = preSections[i - 1];
        }
      }

      preSections[destination.index] = secWantToChangePlace;
      console.log("preSections", preSections);
      setData(preSections);
    }
  };

  return (
    <>
      <button
        onClick={() => setshowModal(true)}
        className=" bg-transparent h-8 w-8 rounded-full flex justify-center items-center "
      >
        <HeaderFilterIcon />
      </button>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setshowModal(false)}
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
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-full rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-[#18181B] pb-3 border-b-[1.5px] border-[#E6E6EB] mb-6"
                  >
                    List of Columns
                  </Dialog.Title>
                  <div className="h-[50vh] overflow-y-scroll">
                    <DragDropContext onDragEnd={onDragEnd} className="jenis">
                      <div>
                        <Droppable
                          droppableId="sections"
                          type="SECTION"
                          direction="vertical"
                        >
                          {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                              {data?.map((item, index) => (
                                <Draggable
                                  key={String(item?.name)}
                                  draggableId={String(item?.name)}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      className="custom-control custom-checkbox mb-1 "
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}

                                    // style={{ cursor: "grab" }}
                                    >
                                      <div {...provided.dragHandleProps}>
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          value={item.apply}
                                          checked={item.apply}
                                          id={item.name}
                                          onChange={(e) => {
                                            item.apply = e.target.checked;
                                            handleselectedFilter(item);
                                          }}
                                        />
                                        <label className="custom-control-label text-base font-medium text-[#929296]">
                                          {getTitle(item.name)}
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </DragDropContext>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      className="text-white w-3/4 text-center bg-primary cursor-pointer font-medium rounded-2xl text-base px-5 py-2"
                      onClick={handleSave}
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
    </>
  );
}
