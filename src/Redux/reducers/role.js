// ** Initial State
const initialState = {
  filters: [],
  roledata: [],
  roledetail: [],
  form: {},
  roleById: {},
  pagination: {},
  loader: true,
  getalldataloader: true,
  error: null,
  getalldataerror: false,
  getidloading: true,
  getiderror: false,
};

const rolereducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ROLE_DATA_LOADING":
      return {
        ...state,
        loader: true,
        error: null,
      };
    case "GET_ALL_ROLE_DATA":
      return {
        ...state,
        roledata: action.data.RoleData,
        pagination: action.data.pagination,
        loader: false,
        error: false,
      };
    case "GET_ALL_ROLE_DATA_ERROR":
      return {
        ...state,
        loader: false,
        error: true,
      };
    case "GET_ALL_DATA":
      return {
        ...state,
        roledetail: action.data.RoleData,
        getalldataloader: false,
        getalldataerror: false,
      };
    case "GET_ALL_DATA_LOADING":
      return {
        ...state,
        getalldataloader: true,
        getalldataerror: false,
      };
    case "GET_ALL_DATA_ERROR":
      return {
        ...state,
        getalldataloader: false,
        getalldataerror: true,
      };

    case "GET_ROLE_BY_ID_DATA":
      return {
        ...state,
        getidloading: false,
        roleById: action.payload,
      };
    case "GET_ROLE_BY_ID_DATA_ERROR":
      return {
        ...state,
        getiderror: false,
      };
    case "GET_ROLE_BY_ID_DATA_LOADING":
      return {
        ...state,
        getidloading: true,
      };

    default:
      return state;
  }
};

export default rolereducer;
