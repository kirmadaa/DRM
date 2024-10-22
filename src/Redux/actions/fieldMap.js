import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
    return {
        "x-auth-token": `bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
    };
};

const baseUrl = process.env.REACT_APP_BASE_URL;
export const GET_FORM_LEAD = () => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms-get-by-title/Leads"}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_FORM_LEAD", data: res?.data?.data });
            }
        } catch (error) { }
    };
};
export const GET_FORM_CONTACT = () => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms-get-by-title/Contacts"}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_FORM_CONTACT", data: res?.data?.data });
            }
        } catch (error) { }
    };
};
export const GET_FORM_ACCOUNT = () => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms-get-by-title/Accounts"}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_FORM_ACCOUNT", data: res?.data?.data });
            }
        } catch (error) { }
    };
}
export const GET_FORM_OPPORTUNITY = () => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms-get-by-title/Opportunities"}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_FORM_OPPORTUNITY", data: res?.data?.data });
            }
        } catch (error) { }
    };
}
export const UPDATE_FORM_LEAD = (data) => {
    const id = data?._id;
    delete data?._id;
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms/"}${id}`;
            const res = await MakeProtectedApiCall(url, "Patch", getHeaders(), data);
            if (res?.status === 200) {
                dispatch({ type: "UPDATE_FORM_LEAD", data: res?.data?.data });
            }
        } catch (error) { }
    };
}
export const UPDATE_FORM_CONTACT = (data) => {
    const id = data?._id;
    delete data?._id;
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms/"}${id}`;
            const res = await MakeProtectedApiCall(url, "Patch", getHeaders(), data);
            if (res?.status === 200) {
                dispatch({ type: "UPDATE_FORM_CONTACT", data: res?.data?.data });
            }
        } catch (error) { }
    };
}
export const UPDATE_FORM_ACCOUNT = (data) => {
    const id = data?._id;
    delete data?._id;
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms/"}${id}`;
            const res = await MakeProtectedApiCall(url, "Patch", getHeaders(), data);
            if (res?.status === 200) {
                dispatch({ type: "UPDATE_FORM_ACCOUNT", data: res?.data?.data });
            }
        } catch (error) { }
    };
}
export const UPDATE_FORM_OPPORTUNITY = (data) => {
    const id = data?._id;
    delete data?._id;
    return async (dispatch) => {
        try {
            const url = `${baseUrl}${"/forms/"}${id}`;
            const res = await MakeProtectedApiCall(url, "Patch", getHeaders(), data);
            if (res?.status === 200) {
                dispatch({ type: "UPDATE_FORM_OPPORTUNITY", data: res?.data?.data });
            }
        } catch (error) { }
    };
}