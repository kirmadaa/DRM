import React, { Fragment, useEffect } from "react";
import { DeleteIcon, EditIcon, PlusWhite } from "../../../../assets/svgIcons";
import { useState } from "react";
import CreateAssignmentRuleModal from "./CreateRuleModal";
import { CREATE_ASSIGNMENT_RULE, DELETE_ASSIGNMENT_RULE, GET_ASSIGNMENT_RULE, UPDATE_ASSIGNMENT_RULE } from "../../../../Redux/actions/assignmentRule";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";

const AssignmentRule = () => {
  const [modal, setModal] = useState(false);
  const assignmentRules = useSelector((state) => state?.AssignmentRules?.list);
  const dispatch = useDispatch()
  const [editData, setEditData] = useState(null)
  const [deleteRuleModal, setDeleteRuleModal] = useState(false)
  const [deleteRuleData, setDeleteRuleData] = useState({})

  const handleClose = () => {
    setModal(false);
    setEditData(null)
  };

  const saveHandler = (data) => {
    dispatch(CREATE_ASSIGNMENT_RULE(data)).then(res => {
      dispatch(GET_ASSIGNMENT_RULE())
    })
    handleClose()
  }

  const editSaveHandler = (data) => {
    dispatch(UPDATE_ASSIGNMENT_RULE(editData._id, data)).then(res => {
      dispatch(GET_ASSIGNMENT_RULE())
    })
    handleClose()
  }


  const deleteHandler = () => {
    dispatch(DELETE_ASSIGNMENT_RULE(deleteRuleData._id)).then(res => {
      dispatch(GET_ASSIGNMENT_RULE())
    })
    setDeleteRuleModal(false)
    setDeleteRuleData(null)
  }

  useEffect(() => {
    dispatch(GET_ASSIGNMENT_RULE())
  }, [])

  return (
    <>
      <div>
        <h6 className="text-[#191242] text-xl font-semibold mb-1">
          Assignment Rules
        </h6>
        <p className="text-[#6A6A6D] text-[14px] font-medium">
          Assignment Rules helps you automatically assign records to users based on specified criteria.
        </p>
        <div className="flex items-center justify-between my-10">
          <div className="flex items-center justify-between p-3 gap-3 lg:w-[30%]">
          </div>
          <div>
            <button
              className="flex items-center gap-3 justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90"
              onClick={() => setModal(true)}
            >
              <PlusWhite /> Create Assignment Rule
            </button>
          </div>
        </div>
        <div className=" bg-white rounded-xl flex flex-col col-span-6 leads-table h-full">
          {assignmentRules?.map((rules) => {
            return (
              <div className="flex justify-start items-center space-x-2" key={rules?._id}>
                <div>
                  <h3>{rules?.RuleName || 'N/A'}</h3>
                </div>

                <div
                  className="flex items-center gap-2 py-2 px-3 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                  onClick={() => {
                    setEditData(rules)
                    setModal(true)
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="flex items-center gap-2 py-2 px-3 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                  onClick={() => {
                    setDeleteRuleData(rules)
                    setDeleteRuleModal(true)
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <CreateAssignmentRuleModal
        modal={modal}
        handleClose={handleClose}
        editData={editData}
        saveHandler={(e) => saveHandler(e)}
        editSaveHandler={(e) => editSaveHandler(e)}
      />
      <Transition appear show={deleteRuleModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setDeleteRuleModal(false)
        }}>
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
                    Delete Assignment Rule
                  </Dialog.Title>
                  <h5>Are you sure want to delete this assignment rule?</h5>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-primary "
                      onClick={() => {
                        setDeleteRuleModal(false)
                        setDeleteRuleData(null)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      onClick={deleteHandler}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >
    </>
  );
};

export default AssignmentRule;
