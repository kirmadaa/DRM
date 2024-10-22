const initialState = {
  loginLogs: [],
  pagination: {},
  timelineInfo: [],
  loader: false,
  filter: localStorage.getItem("filter") || "All",
  macros: [],
  checkedListedData: [],
};

const commanvar = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TIMELINE_BY_CONNECTION_ID":
      return { ...state, timelineInfo: action?.data };
    case "SET_FILTER_VALUE":
      return { ...state, filter: action?.data };
    case "SET_CHECKBOX_OF_LISTING_DATA":
      return { ...state, checkedListedData: action?.data };
    case "GET_MACRO":
      return { ...state, macros: action?.data?.macroData || [] };
    default:
      return state;
    case "GET_LOGIN_LOGS":
      return {
        ...state,
        loginLogs: action.data.loginLogData,
        pagination: action.data.pagination,
        loader: false,
        error: false,
      };
  }
};

export default commanvar;
