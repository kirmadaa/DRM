import axios from "axios";

// ** Toaster
import ToastContent from "../Components/toastContent";
import { Slide, toast } from "react-toastify";

const AlertError = (text) => {
  return toast.error(
    <ToastContent
      type={"light-danger"}
      //  icon={<AlertCircle size={12} />}
      title={"Fail :("}
      text={
        <span className="fw-light">
          {typeof text === "object"
            ? "Something is wrong Please  try on more time "
            : text}{" "}
        </span>
      }
    />,
    { transition: Slide, hideProgressBar: true, autoClose: 4000 }
  );
};

const AlertSuccess = (text) => {
  return toast.success(
    <ToastContent
      type="success"
      //  icon={<UserCheck size={12} />}
      text={<span className="fw-lighter">{text}</span>}
      title={<span className="fw-lighter text-success">Success !</span>}
    />,
    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
  );
};
export const errorSuccess = AlertSuccess;
export const errorAlert = AlertError;
/*
 * @apiPath {string}
 * @method {string}
 * @header {function returns object}
 * @bodyData {default object}
 */
export const MakeProtectedApiCall = async (
  apiPath,
  method,
  header,
  bodyData = {},
  alert = false,
  getAlert = true
) => {
  switch (method.toLowerCase()) {
    case "get":
      try {
        const res = await axios.get(apiPath, { headers: { ...header } });
        return res;
      } catch (error) {
        const msg = error.response?.data?.msg;
        if (error.response?.status !== 400 || error?.response?.status !== 500) {
          if (msg) {
            // console.log(msg)
          }
        }
        toast.clearWaitingQueue();
        if (error?.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/crm/login";
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    case "post":
      try {
        const res = await axios.post(apiPath, bodyData, {
          headers: { ...header },
        });
        if (getAlert) {
          AlertSuccess(res.data?.data?.msg || res.data.msg);
        }
        return res;
      } catch (error) {
        if (error?.response === undefined) {
          AlertError(error.response?.data?.msg || "Server not responding ...");
          return;
        }
        const msg = error?.response?.data?.msg;
        if (error?.response?.status === 500) {
          AlertError(msg.msg);
          return { status: error?.response?.status };
        }
        if (error?.response?.status === 400) {
          if (alert) {
            AlertError(msg);
          }
          return { status: error?.response?.status };
        }
        if (error?.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/crm/login";
        }
        toast.clearWaitingQueue();
        return { status: error?.response?.status };
      }
    case "put":
      try {
        const res = await axios.put(apiPath, bodyData, {
          headers: { ...header },
        });
        AlertSuccess(res.data?.data?.msg || res.data.msg);
        return res;
      } catch (error) {
        const msg = error.response?.data?.msg;
        AlertError(msg);
        toast.clearWaitingQueue();
        return { status: error.response?.status };
      }
    case "patch":
      try {
        const res = await axios.patch(apiPath, bodyData, {
          headers: { ...header },
        });

        AlertSuccess(res.data?.data?.msg || res.data.msg);
        return res;
      } catch (error) {
        const msg = error.response?.data?.msg;
        AlertError(msg);
        toast.clearWaitingQueue();
        return { status: error.response?.status };
      }
    case "delete":
      try {
        const res = await axios.delete(apiPath, {
          headers: header,
          data: bodyData,
        });
        AlertSuccess(res.data?.data?.msg || res.data.msg);
        return res;
      } catch (error) {
        const msg = error.response?.data?.msg;
        AlertError(msg);
        toast.clearWaitingQueue();
        return { status: error.response?.status };
      }
    default:
      break;
  }
};
