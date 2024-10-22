import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Hero from "./images/hero.svg";
import LogoNew from "../assets/images/logo/logoNew.svg";
import { RESET_PASSWORD } from "../Redux/actions/authentication";
import { useDispatch } from "react-redux";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const ResetPasswordLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/crm/dashboard");
    } else {
    }
  }, [navigate]);

  const changepasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("*Required"),
  });

  return (
    <>
      {/* <Header /> */}
      <Formik
        initialValues={{ password: "", confirmPassword: "", code: id }}
        validationSchema={changepasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          delete values.confirmPassword;

          dispatch(RESET_PASSWORD({ ...values })).then((res) => {
            if (res?.success) {
              navigate("/crm/login");
            }
          });
        }}
      >
        {({ ischnaging, handleChange, values }) => (
          <Form>
            <div className="h-full flex items-center">
              <div className="flex items-center h-full  w-full">
                <div className="flex relative h-full w-full">
                  <div className="hidden lg:inline w-2/6">
                    <img
                      src={Hero}
                      className=" object-cover w-full h-[100vh]"
                      alt=""
                    />
                  </div>

                  <div className="flex sm:justify-center items-center w-full h-[100vh] lg:w-4/6 relative">
                    <div className=" w-full p-3 md:p-12 lg:p-24 ">
                      <img
                        src={LogoNew}
                        className="absolute top-[7%] left-[30%] sm:left-[40%] lg:left-24"
                        alt="reset-password-banner"
                      />
                      <h3 className="text-[#1D1D1E] text-4xl mg-b-5 font-semibold mb-10">
                        Reset your Password
                      </h3>
                      <div className="my-8">
                        <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                          Enter a new Password
                        </label>
                        <div className="mg-b-5"></div>
                        <input
                          type="password"
                          name="password"
                          className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="confirmPassword">
                          {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-8">
                        <label className="font-semibold text-[#1D1D1E] mb-1 ml-2">
                          Confirm Password
                        </label>
                        <div className="mg-b-5"></div>

                        <input
                          type="password"
                          name="confirmPassword"
                          className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                          placeholder="Enter your Password again"
                          value={values.confirmPassword}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="confirmPassword">
                          {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#191242] w-full text-[#fff] p-3 rounded-2xl mb-3"
                      >
                        Change Password
                      </button>

                      <div
                        className="flex items-center justify-between mb-5"
                        style={{
                          width: "calc(100% - 48% )",
                          position: "fixed",
                          bottom: "0px",
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
          </Form>
        )}
      </Formik>
      {/* {showModal && <ForgotPasswordModal setShowModal={setShowModal} />} */}
    </>
  );
};

export default ResetPasswordLayout;
