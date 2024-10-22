import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CHANGE_PASSWORD } from "../Redux/actions/authentication";

const ChangePasswordLayout = () => {
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    currentPassword: Yup.string().required("*Required"),
    newPassword: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("*Required"),
  });

  return (
    <>
      {/* <Header /> */}
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = { ...values };
          setSubmitting(false);
          delete payload.confirmPassword;
          dispatch(CHANGE_PASSWORD({ ...payload })).then((res) => {
            if (res?.success) {
              //   navigate("/crm/login");
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className=" lg:flex items-center">
              <div className="flex lg:items-center   w-full">
                <div className="flex relative justify-center h-full w-full">
                  {/* <div className="hidden lg:inline w-2/6">
                    <img
                      src={SignUp}
                      className=" object-cover w-full h-[100vh]"
                      alt=""
                    />
                  </div> */}
                  <div className="flex sm:justify-center w-full h-[100vh] lg:w-4/6 overflow-y-scroll">
                    <div className=" w-full p-3 md:p-12 lg:p-24 ">
                      {/* <div className="flex justify-center md:justify-start w-full mb-4">
                        <img
                          src={Logo}
                          className="mb-4"
                          alt="register-banner"
                        />
                      </div> */}
                      <h4 className="text-[#1D1D1E] text-4xl mg-b-5 font-semibold mb-10">
                        Change Password
                      </h4>
                      {/* <p className="tx-color-03 tx-16 mg-b-40">
                      It's free to signup and only takes a minute.
                    </p> */}
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Old Password
                          </label>
                          <Field
                            name="currentPassword"
                            type="password"
                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter your current password"
                          />
                          <ErrorMessage name="currentPassword">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>

                      <div className="w-full gap-3 mb-3">
                        <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                          New Password
                        </label>
                        <Field
                          type="password"
                          className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                          placeholder="Enter your new password"
                          name="newPassword"
                        />
                        <ErrorMessage name="newPassword">
                          {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="w-full mb-3">
                        <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                          placeholder="Enter your Password again"
                          name="confirmPassword"
                        />
                        <ErrorMessage name="confirmPassword">
                          {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>

                      <div className="pb-5 text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#191242] text-[#fff] p-3 rounded-2xl"
                        >
                          Change password
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

export default ChangePasswordLayout;
