import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfileLayout = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Schema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    mobile: Yup.string()
      .matches(/^[6789]\d{9}$/, "Invalid Mobile Number") // Indian standard mobile number regex
      .required("*Required"),
    website: Yup.string().url("Please enter valid url"),
  });

  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      setData(res?.data?.data?.[0]);
    });
  }, [dispatch]);
  return (
    <>
      {/* <Header /> */}
      <Formik
        initialValues={{
          DOB: data?.DOB || "",
          country: data?.country || "",
          countryLocale: data?.countryLocale || "",
          mobile: data?.mobile || "",
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",

          state: data?.state || "",
          address: data?.address || data?.street || "",
          website: data?.website || "",
          zipCode: data?.zipCode || "",
        }}
        enableReinitialize={true}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          dispatch(UPDATE_USER_PROFILE({ ...values })).then((res) => {
            if (res?.success) {
              navigate("/crm/profile");
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="h-full lg:flex items-center">
              <div className="flex lg:items-center h-full  w-full">
                <div className="flex relative justify-center h-full w-full">
                  <div className="flex sm:justify-center w-full lg:w-4/6 ">
                    <div className=" w-full p-3 md:p-12 lg:p-24 ">
                      <h4 className="text-[#1D1D1E] text-4xl mg-b-5 font-semibold mb-10">
                        Edit Profile
                      </h4>
                      {/* <p className="tx-color-03 tx-16 mg-b-40">
                        It's free to signup and only takes a minute.
                      </p> */}
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            First Name *
                          </label>
                          <Field
                            name="firstName"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            // className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter Firstname"
                          />
                          <ErrorMessage name="name">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Last Name *
                          </label>
                          <Field
                            name="lastName"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter Lastname"
                          />
                          <ErrorMessage name="name">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Website *
                          </label>
                          <Field
                            name="website"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter Website name"
                          />
                          <ErrorMessage name="website">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Date of Birth
                          </label>
                          <Field
                            name="DOB"
                            type="date"
                            max={"3099-12-31"}
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter DOB"
                          />
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Address
                          </label>
                          <Field
                            name="address"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter Address"
                          />
                        </div>
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            State
                          </label>
                          <Field
                            name="state"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter State"
                          />
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Country
                          </label>
                          <Field
                            name="country"
                            type="text"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter country"
                          />
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full phone_number">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Phone Number *
                          </label>
                          <Field
                            type="number"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter Number"
                            name="mobile"
                          />
                          <ErrorMessage name="mobile">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full phone_number">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            PIN Code
                          </label>
                          <Field
                            type="number"
                            className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                            placeholder="Enter PIN"
                            name="zipCode"
                          />
                        </div>
                      </div>
                      <div className="pb-5  text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#191242] w-[20%] text-[#fff] p-3 rounded-2xl"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* {showModal && <OtpModal setShowModal={setShowModal} />} */}
    </>
  );
};

export default EditProfileLayout;
