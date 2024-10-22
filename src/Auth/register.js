import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignUp from "./images/singup.svg";
import LogoNew from "../assets/images/logo/logoNew.svg";
import { useState } from "react";
import OtpModal from "./OtpModal";
import MobileConfirmModal from "./MobileConfirmModal";

export const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required "),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required "),
    email: Yup.string().email("Invalid email").required("*Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Too Long!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        "What you need for strong password beforehand"
      )
      .required("*Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("*Required"),
    mobile: Yup.string()
      .matches(/^[6789]\d{9}$/, "Invalid Mobile Number") // Indian standard mobile number regex
      .required("*Required"),
    organizationName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
  });

  const validate = (values) => {
    try {
      SignupSchema.validateSync(values, { abortEarly: false });
    } catch (errors) {
      return errors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
    }
  };

  const handlePasswordShow = (i) => {
    if (i) {
      setIsConfirmVisible(!isConfirmVisible);
    } else {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/crm/dashboard");
    } else {
    }
  }, [navigate]);

  return (
    <>
      {/* <Header /> */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          organizationName: "",
        }}
        validate={validate}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);

          setShowMobileModal(true);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="h-full lg:flex items-center bg-white">
              <div className="flex lg:items-center h-full  w-full">
                <div className="flex relative h-full w-full">
                  <div className="hidden lg:inline w-2/6">
                    <img
                      src={SignUp}
                      className=" object-cover w-full h-[100vh]"
                      alt=""
                    />
                  </div>
                  <div className="flex sm:justify-center w-full h-[100vh] lg:w-4/6 overflow-y-scroll">
                    <div className=" w-full p-3 md:p-12 lg:p-24 ">
                      <div className="flex justify-center md:justify-center w-full mb-4">
                        <img
                          src={LogoNew}
                          className="mb-4 w-[120px]"
                          alt="register-banner"
                        />
                        <p className="ml-0 mt-7 text-2xl font-bold text-navy">THE STACKMENTALIST</p>
                      </div>
                      <h4 className="text-[#1D1D1E] text-5xl  mg-b-5 font-semibold mb-10">
                        Sign up
                        <span className="w-[110px] mt-[15px] block h-[4px] bg-[#191242]"></span>
                      </h4>

                      <div className="mb-[32px]">
                        <label className="font-semibold text-[18px] text-[#18181B] ml-2 mb-1 inline-block w-full">
                          User Details
                        </label>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            First Name
                          </label>
                          <Field
                            name="firstName"
                            type="text"
                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter your Firstname"
                          />
                          <ErrorMessage name="firstName">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Last Name
                          </label>
                          <Field
                            name="lastName"
                            type="text"
                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter your Lastname"
                          />
                          <ErrorMessage name="lastName">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Email
                          </label>
                          <Field
                            type="email"
                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter your Email"
                            name="email"
                          />
                          <ErrorMessage name="email">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full phone_number">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Phone Number
                          </label>
                          <Field
                            type="number"
                            className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                            placeholder="Enter your Number"
                            name="mobile"
                          />
                          <ErrorMessage name="mobile">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="md:flex justify-between mb-3 gap-3">
                        <div className="w-full">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Password
                          </label>
                          <div className="w-full relative">
                            <Field
                              type={isPasswordVisible ? "text" : "password"}
                              className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                              placeholder="Enter your password"
                              name="password"
                            />
                            <button
                              className="absolute text-gray-600 inset-y-0 right-4"
                              type="button"
                              onClick={() => handlePasswordShow(0)}
                            >
                              {!isPasswordVisible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          <ErrorMessage name="password">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="w-full phone_number">
                          <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                            Confirm Password
                          </label>
                          <div className="w-full relative">
                            <Field
                              type={isConfirmVisible ? "text" : "password"}
                              className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                              placeholder="Enter your Password again"
                              name="confirmPassword"
                            />
                            <button
                              className="absolute text-gray-600 inset-y-0 right-4"
                              type="button"
                              onClick={() => handlePasswordShow(1)}
                            >
                              {!isConfirmVisible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          <ErrorMessage name="confirmPassword">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>

                      <div className="font-semibold text-[#1D1D1E] text-lg mt-4 mb-3 inline-block w-full">
                        Company Details
                      </div>
                      <div className="mb-3">
                        <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                          Organization Name{" "}
                        </label>
                        <Field
                          type="text"
                          className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                          placeholder="Enter your Organization Name"
                          name="organizationName"
                        />
                        <ErrorMessage name="organizationName">
                          {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>

                      <div className="pb-5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#191242] w-full text-[#fff] p-3 rounded-2xl"
                        >
                          Create Account
                        </button>

                        <div className="mb-5 text-center mt-1">
                          Already have an account?{" "}
                          <Link
                            to="/crm/login"
                            className="font-semibold text-[#191242]"
                          >
                            Sign In
                          </Link>
                        </div>
                        <div
                          className="flex items-center justify-between mb-5"
                          style={{
                            width: "calc(100% - 48% )",
                            // position: "fixed",
                            // bottom: "0px",
                          }}
                        >
                          <div className="text-xs text-[#6A6A6D]">
                            All © copyright reserved by The Stackmentalist Private Limited.
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-xs text-[#6A6A6D] cursor-pointer">
                              Terms & Conditions
                            </p>
                            <p className="text-xs text-[#6A6A6D] cursor-pointer">
                              Privacy Policy
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showModal && (
              <OtpModal setShowModal={setShowModal} mobile={values?.mobile} />
            )}
            {showMobileModal && (
              <MobileConfirmModal
                setShowModal={setShowMobileModal}
                setOtpShowModal={setShowModal}
                values={values}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
