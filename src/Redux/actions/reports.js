


import { MakeProtectedApiCall } from "../../utility/api";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
    return {
        "x-auth-token": `bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
    };
};


export const GET_LIST_OF_FOLDERS = () => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report/folder`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res.status === 200) {
                dispatch({ type: 'GET_LIST_OF_FOLDERS', data: res?.data?.data })
                return res;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const CREATE_NEW_FOLDER = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report/folder`;
            const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
            if (res.status === 200) {
                return res;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const GET_LIST_OF_REPORTS = (endPoint) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report${endPoint}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res.status === 200) {
                dispatch({ type: 'GET_LIST_OF_REPORTS', data: res?.data?.data })
                return res;
            } else {
                dispatch({ type: 'GET_LIST_OF_REPORTS', data: res?.data?.data || [] })
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const DELETE_FOLDER = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report/folder`;
            const res = await MakeProtectedApiCall(url, "DELETE", getHeaders(), payload);
            if (res.status === 200) {
                return res;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const UPDATE_FOLDER = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report/folder`;
            const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), payload);
            if (res.status === 200) {
                return res;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};


export const GET_LOOKUP_OF_MODULE = (module) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report/modules?moduleName=${module}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res.status === 200) {
                dispatch({ type: 'GET_LOOKUP_OF_MODULE', data: res?.data?.data })
                return res?.data?.data
            } else {
                dispatch({ type: 'GET_LOOKUP_OF_MODULE', data: res?.data?.data || [] })
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const ADD_NEW_REPORT = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report`;
            const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
            console.log("oooooo", res);
            if (res.status === 200 || res.status === 201) {
                return {res:"true",data:res.data.data}
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const DELETE_REPORTS = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report`;
            const res = await MakeProtectedApiCall(url, "DELETE", getHeaders(), payload);
            if (res.status === 200 || res.status === 201) {
                return true
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const GET_REPORT_BY_ID = (id) => {
    return async () => {
        try {
            let url = `${baseUrl}/report/all?reportId=${id}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res.status === 200) {
                return res?.data?.data;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const GENRATE_REPORT_BY_ID = (id) => {
    return async () => {
        try {
            let url = `${baseUrl}/report/generate?reportId=${id}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res.status === 200) {
                return res?.data?.data;
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const UPDATE_REPORT_BY_ID = (payload) => {
    return async (dispatch) => {
        try {
            let url = `${baseUrl}/report`;
            const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), payload);
            if (res.status === 200 || res.status === 201) {
                return true
            } else {
                if (res?.status !== 400) {
                    toast.error(res?.data?.msg);
                }
            }
            return res
        } catch (e) {
            toast.error(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};