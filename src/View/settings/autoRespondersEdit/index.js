import React from "react";
import { Field, Form, Formik, useFormik } from "formik";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import AddFollowupModal from "../../../Layouts/app/settings/AddFollowupModal";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_TEMPLATE_EMAIL_LIST } from "../../../Redux/actions/serviceControl";
import { GET_USER_PROFILE } from "../../../Redux/actions/user";
import { useSelector } from "react-redux";
import { DeleteIcon, EditIcon } from "../../../assets/svgIcons";
import {
  GET_BYID_DATA_AUTO_RESPONDERS,
  PATCH_AUTO_RESPONDERS,
} from "../../../Redux/actions/autoResponders";

const AutoRespondersEdit = () => {
  //state
  const [modal, setModal] = useState(false);

  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { emailTemplates } = useSelector(
    (store) => store.ServiceControlReducer
  );
  const dispatch = useDispatch();
  const { search } = useLocation();
  const formik = useFormik({
    initialValues: {
      AutorespondersOwnerId: "",
      Name: "",
      Module: search?.split("=")[1],
      userName: "",
      Assigned: "",
      CustomView: "",
      Folder: "General",
      Type: "Static",
      FollowUpDate: "",
      TemplateId: "",
      EmailTile: "",
    },
  });

  const handleDelete = () => {
    ["EmailTile", "TemplateId", "FollowUpDate"].forEach((ele) => {
      formik.setFieldValue(ele, "");
    });
  };

  const handleFlowUps = (data) => {
    Object.entries(data).forEach((ele) => {
      formik.setFieldValue(ele[0], ele[1]);
    });
    let filterEmail = emailTemplates?.data?.EmailData?.find(
      (ele) => ele?._id === data.TemplateId
    );
    if (filterEmail) {
      formik.setFieldValue("EmailTile", filterEmail?.emailTitle);
    }
    setModal(false);
  };
  useEffect(() => {
    dispatch(
      GET_TEMPLATE_EMAIL_LIST({
        limit: 30000,
        offset: 1,
        buttonType: "All",
        search: [],
      })
    );

    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        formik.setFieldValue(
          "userName",
          `${res?.data?.data[0]?.firstName} ${res?.data?.data[0]?.lastName}`
        );
        formik.setFieldValue(
          "AutorespondersOwnerId",
          res?.data?.data[0]?.userId
        );
        formik.setFieldValue("Assigned", res?.data?.data[0]?.userId);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(
        GET_BYID_DATA_AUTO_RESPONDERS(`autoresponder-get-by-id/${id}`)
      ).then((res) => {
        if (res.status === 200) {
          let checkArray = [
            "Type",
            "TemplateId",
            "Name",
            "Module",
            "FollowUpDate",
            "Folder",
            "CustomView",
            "AutorespondersOwnerId",
            "Assigned",
          ];
          Object.entries(res?.data?.data).forEach((ele) => {
            if (checkArray.includes(ele[0])) {
              formik.setFieldValue(ele[0], ele[1]);
              if (ele[0] === "TemplateId") {
                let filterEmail = emailTemplates?.data?.EmailData?.find(
                  (email) => email?._id === ele[1]
                );
                if (filterEmail) {
                  formik.setFieldValue("EmailTile", filterEmail?.emailTitle);
                }
              }
            }
          });
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (emailTemplates?.data?.EmailData && formik.values.TemplateId) {
      let filterEmail = emailTemplates?.data?.EmailData?.find(
        (ele) => ele?._id === formik.values.TemplateId
      );
      if (filterEmail) {
        formik.setFieldValue("EmailTile", filterEmail?.emailTitle);
      }
    }
  }, [emailTemplates, formik.values.TemplateId]);
  return (
    <div className="my-4">
      <Formik
        enableReinitialize={true}
        initialValues={formik.values}
        onSubmit={(values, { setSubmitting }) => {
          delete values.userName;
          delete values.EmailTile;
          setSubmitting(false);
          dispatch(PATCH_AUTO_RESPONDERS(`autoresponder/${id}`, values)).then(
            (res) => {
              if (res?.status === 200) {
                navigate(`/crm/modules/auto-responders${search}`);
              }
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center  flex-col">
              <div className="container">
                <div className="flex  justify-between mt-5">
                  <div className="text-primary text-base font-semibold ml-4">
                    Edit Autoresponder
                  </div>
                  <div>
                    <Link
                      className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                      to={`/crm/modules/auto-responders${search}`}
                    >
                      Back
                    </Link>
                    <button
                      className="ml-2 max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="container">
                <div>
                  <div className="bg-white rounded-md shadow p-4 my-2">
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-gray-600">Name</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              name="Name"
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Module</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              name="Module"
                              type="text"
                              disabled
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Assigned To</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              name="userName"
                              type="text"
                              disabled
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Custom View</label>
                          <div className="mt-2">
                            <select
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              name="CustomView"
                              type="text"
                              value={formik?.values.CustomView}
                              onChange={formik?.handleChange}
                            >
                              <option>please select</option>
                              {["All", "All Locked Leads"].map(
                                (item, index) => (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Select Folder</label>
                          <div className="mt-2">
                            <select
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              name="Folder"
                              type="text"
                              value={formik?.values.Folder}
                              onChange={formik?.handleChange}
                            >
                              {["General"].map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div>
                  <div className="bg-white rounded-md shadow p-4 my-2">
                    <div className="p-4">
                      {!formik?.values?.FollowUpDate ||
                      !formik?.values?.EmailTile ? (
                        <button
                          className="ml-2 max-w-20 bg-primary rounded-2xl text-white py-2 px-10"
                          type="button"
                          onClick={() => setModal(true)}
                        >
                          Add Follow-ups
                        </button>
                      ) : (
                        ""
                      )}
                      {formik?.values?.EmailTile ||
                      formik?.values?.FollowUpDate ? (
                        <div className="p-4">
                          <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
                            <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                              <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3  text-left font-medium"
                                  >
                                    Date and Time
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3  text-left font-medium"
                                  >
                                    Email Template
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3  text-left font-medium"
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white cursor-pointer">
                                  <td className="px-5 py-4">
                                    <Field
                                      type="text"
                                      className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                      placeholder="Enter Inventory Name"
                                      disabled
                                      name={`FollowUpDate`}
                                    />
                                  </td>
                                  <td className="px-5 py-4">
                                    <Field
                                      type="text"
                                      className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                      placeholder="Enter Inventory Name"
                                      disabled
                                      name={`EmailTile`}
                                    />
                                  </td>
                                  <td className="px-5 py-4">
                                    <div className="flex">
                                      <span
                                        className="p-2 rounded bg-[#DCFCE7]"
                                        onClick={() => setModal(true)}
                                      >
                                        <EditIcon />
                                      </span>{" "}
                                      <span
                                        className="p-2 ml-2 rounded bg-[#FFEAEF]"
                                        onClick={() => {
                                          handleDelete();
                                        }}
                                      >
                                        <DeleteIcon />
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {modal && (
                        <AddFollowupModal
                          modal={modal}
                          setModal={setModal}
                          handleFlowUps={handleFlowUps}
                          edit={true}
                          formikValue={{
                            FollowUpDate: formik.values?.FollowUpDate,
                            TemplateId: formik.values?.TemplateId,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AutoRespondersEdit;
