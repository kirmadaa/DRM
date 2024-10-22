import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Hero from "./images/hero.svg";
import LogoNew from "../assets/images/logo/logoNew.svg";
import { HANDLE_LOGIN } from "../Redux/actions/authentication";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let url = "https://uatcrm.qodequay.com/uapp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWUzMWJkODQwZDljN2VjOGQ2YmQ5YjEiLCJ0eXBlIjoiQWNjZXNzIiwianRpIjoiNTdmNzU5YjU3M2QyZDU0ZTY2OGEiLCJpYXQiOjE3MDkzODI2NDMsImV4cCI6MTcwOTU1NTQ0M30.V0GB0EoDkjIRyHaGpv6LHw1XRmNiJvMVPLJrYRx7EbY"
  //   const value = url.split("?token=");
  //   console.log('token', value[1])
  //   // const queryParams = new URLSearchParams(url);
  //   // const value = queryParams.get('token');
  //   // console.log("tokentokentokentoken", value);
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/crm/dashboard");
    } else {
    }
  }, [navigate]);

  // validate email and password all fields are filled  email is valid and password is more than 6 characters
  const validate = () => {
    if (email === "" || password === "") {
      setError("All fields are required");

      return false;
    }

    if (password?.length < 6) {
      setError("Password must be more than 6 characters");

      return false;
    }
    return true;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let url = "https://uatcrm.qodequay.com/uapp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDUk0iLCJhdWQiOiJDUk0iLCJ1c2VySWQiOiI2NWUzMWJkODQwZDljN2VjOGQ2YmQ5YjEiLCJ0eXBlIjoiQWNjZXNzIiwianRpIjoiNTdmNzU5YjU3M2QyZDU0ZTY2OGEiLCJpYXQiOjE3MDkzODI2NDMsImV4cCI6MTcwOTU1NTQ0M30.V0GB0EoDkjIRyHaGpv6LHw1XRmNiJvMVPLJrYRx7EbY"
  //   const value = url.split("?token=");
  //   console.log('token', value[1])
  //   return
  //   setError("");
  //   if (validate()) {
  //     dispatch(HANDLE_LOGIN({ email, password })).then((res) => {
  //       // console.log(res)
  //       if (!res?.success) {
  //         navigate("/crm/support-contact");
  //       } if (res?.data?.data?.userData?.email?.verified) {
  //         localStorage.setItem("token", res.data?.data.accessToken);
  //         localStorage.setItem("refreshToken", res.data?.data.refreshToken);
  //         localStorage.setItem("userData", JSON.stringify(res.data.data));
  //         navigate("/crm/dashboard");
  //       }
  //       if (res?.data?.data?.userData?.email?.verified === false) {
  //         setError("Please verify your email");
  //       }
  //       if (res?.error) {
  //         setError("Email or password is incorrect");
  //       }
  //     });
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (validate()) {
      dispatch(HANDLE_LOGIN({ email, password })).then((res) => {
        // console.log(res)
        if (!res?.success) {
          navigate("/crm/support-contact");
        } if (res?.data?.data?.userData?.email?.verified) {
          localStorage.setItem("token", res.data?.data.accessToken);
          localStorage.setItem("refreshToken", res.data?.data.refreshToken);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          navigate("/crm/dashboard");
        }
        if (res?.data?.data?.userData?.email?.verified === false) {
          setError("Please verify your email");
        }
        if (res?.error) {
          setError("Email or password is incorrect");
        }
      });
    }
  };

  const handlePasswordShow = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      {/* <Header /> */}
      <form onSubmit={handleSubmit} className="h-full flex items-center bg-white">
        <div className="flex items-center h-full  w-full">
          <div className="flex relative h-full w-full">
            <div className="hidden lg:inline w-2/6">
              <img
                src={Hero}
                className=" object-cover w-full h-[100vh]"
                alt="login hero poster"
              />
            </div>
            <div className="flex sm:justify-center items-center w-full h-[100vh] lg:w-4/6 relative">
              <div className=" w-full p-3 md:p-12 lg:p-24 ">
                <div className="flex justify-center items-center">
                  <img
                    src={LogoNew}
                    className="w-[120px] pt-10 "
                    alt="login-banner"
                  />
                  <p className="ml-0 mt-9 text-xl font-bold text-navy">THE STACKMENTALIST</p>
                </div>
                <h3 className="text-[#1D1D1E] mt-[70px] text-4xl mg-b-5 font-semibold mb-10">
                  <span className="pb-2 border-b-4  border-[#191242]">
                    Login
                  </span>
                </h3>

                {error && (
                  <>
                    <div className="text-red-500">{error}.</div>
                  </>
                )}

                <div className="my-8">
                  <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                    Email address or Phone Number
                  </label>
                  <input
                    type="email"
                    className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                    placeholder="yourname@yourmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-8">
                  <label className="font-semibold text-[#1D1D1E] mb-1 ml-2">
                    Password
                  </label>
                  <div className="mg-b-5"></div>
                  <div className="w-full relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="px-4 py-3 bg-[#F9F9FB] rounded-2xl w-full focus:outline-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <button
                      className="absolute text-gray-600 inset-y-0 right-4"
                      type="button"
                      onClick={() => handlePasswordShow()}
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
                  <div
                    className="mt-1 w-full text-right cursor-pointer"
                  // onClick={() => setShowModal(true)}
                  >
                    <Link
                      to="/crm/forgot-password"
                      className="font-semibold text-[#191242]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>



                <button
                  type='submit'
                  className="bg-[#191242] w-full text-[#fff] p-3 rounded-2xl mb-3"
                >
                  Log in
                </button>

                <div className="mb-5 text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/crm/register"
                    className="font-semibold text-[#191242]"
                  >
                    Sign up
                  </Link>
                </div>
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
      </form>
      {/* {showModal && <ForgotPasswordModal setShowModal={setShowModal} />} */}
    </>
  );
};

export default Login;
