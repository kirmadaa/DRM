import { React, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import LogoNew from "../assets/images/logo/logoNew.svg";
import SignUp from "./images/singup.svg";
import { FORGOT_PASSWORD } from "../Redux/actions/authentication";
import { useDispatch } from "react-redux";

const ForgotPasswordLayout = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/crm/dashboard");
    } else {
    }
  }, [navigate]);

  // validate email
  const validate = () => {
    if (email === "") {
      setError("All fields are required");

      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    setError("");
    if (validate()) {
      await dispatch(FORGOT_PASSWORD({ email })).then((res) => {
        if (res?.success) {
          navigate("/crm/login");
        }
      });
    }
    setLoad(false)
  };

  return (
    <>
      {/* <Header /> */}
      <form  onSubmit={handleSubmit} className="h-full flex items-center">
        <div className="flex items-center h-full  w-full">
          <div className="flex relative h-full w-full">
            <div className="hidden lg:inline w-2/6">
              <img
                src={SignUp}
                className=" object-cover w-full h-[100vh]"
                alt=""
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
                  Forget password
                </h3>
                {/* <p className="tx-color-03 tx-16 mg-b-40 font-extrabold">
                  Welcome back! Please signin to continue.
                </p> */}
                {error && (
                  <>
                    <div className="text-red-500">{error}.</div>
                  </>
                )}

                <div className="my-8">
                  <label className="font-semibold text-[#1D1D1E] ml-2 mb-1 inline-block w-full">
                    Email address
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

                <button
                  type="submit"
                  disabled={load}
                  // onClick={() => {
                  //   ();
                  // }}
                  className="bg-[#191242] w-full text-[#fff] p-3 rounded-2xl mb-3"
                >
                 {load ? 'Processing...' :' Send Email'}
                </button>
                <div className="mb-5 text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/crm/login"
                    className="font-semibold text-[#191242]"
                  >
                    Login
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

export default ForgotPasswordLayout;
