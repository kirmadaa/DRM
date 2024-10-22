// **  Initial State
const initialState = {
  data: [],
  filters: [],
  tableHeader: [],
  detail: {},
  form: {},
  pagination: {},
  loader: true,
  updateIdTable: "",
  redriect: false,
  Notes: [],
  Checbox: {},
  Lockup: [],
  reset_data: false,
  loading: false,
  listOfTags: []
};

// ADD_NEW_TAGS
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DATA":
      const keys = Object.keys(action.data);
      state = {
        ...state,
        data: action.data[keys[0]],
        pagination: action.data[keys[1]],
      };
      break;
    case "ADD_NEW_TAGS":
      return {
        ...state, listOfTags: action?.data
      }
      break;
    case "GET_ALL_DATA_FILTER":
      const keys1 = Object.keys(action.data);
      state = {
        ...state,
        data: action.data[keys1[0]],
        pagination: action.data[keys1[1]],
      };
      break;
    case "NULL_ALL_DATA_FILTER":
      state = {
        ...state,
        data: [],
        pagination: {},
      };
      break;
    case "GET_TABLE_HEADER":
      state = {
        ...state,
        tableHeader: action.data.data,
        updateIdTable: action.data._id,
        loader: false,
      };
      break;
    case "GET_FILTERS":
      state = {
        ...state,
        filters: action.data,
      };
      break;
    case "GET_DETAIL":
      state = {
        ...state,
        listOfTags: action.data?.data?.listOfTags || [],
        detail: action.data.data,
        redriect: false,
      };
      break;
    case "SET_LOADER":
      state = {
        ...state,
        loader: action.data,
      };
      break;
    case "GET_FORM":
      state = {
        ...state,
        form: action.data,
        redriect: false,
      };
      break;
    case "RESET_STATE":
      state = {
        ...state,
        data: [],
        filters: [],
        tableHeader: [],
        detial: {},
        form: {},
        pagination: {},
        loader: true,
        redriect: false,
      };
      break;
    case "SAVE":
      state = {
        ...state,
        redriect: action.redriect,
      };
      break;
    case "UPDATE":
      state = {
        ...state,
        redriect: true,
      };
      break;

    case "GET_NOTES":
      state = {
        ...state,
        Notes: action.data.data,
      };
      break;
    case "SELECT_CHECKBOX":
      state = {
        ...state,
        Checbox: action.payload,
      };
      break;
    case "GET_LOCKUP":
      // const keys2 = Object.keys(action.data);
      state = {
        ...state,
        Lockup: action.data[keys[1]],
      };
      break;
    case "GET_LOOKUP_WITH_SEARCH":
      // const keys3 = Object.keys(action.data);
      state = {
        ...state,
        Lockup: action.data[keys[1]],
      };
      break;
    case "RESET_DATA":
      state = {
        ...state,
        reset_data: action.data,
      };
      break;
    case "LOADING":
      state = {
        ...state,
        loading: action.data,
        redriect: false,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default userReducer;
