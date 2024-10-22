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

const socialAccountsreducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ROLE_DATA_LOADING":
      return {
        ...state,
        loader: true,
        error: null,
      };
    case "GET_FACEBOOK_PLATFORM":
      return {
        ...state,
        getidloading: false,
        data: action,
      };
    case "GET_FACEBOOK_PLATFORM_ERROR":
      return {
        ...state,
        getiderror: false,
      };
    case "GET_FACEBOOK_PLATFORM_LOADING":
      return {
        ...state,
        getidloading: true,
      };

    case "GET_GOOGLE_PLATFORM":
      return {
        ...state,
        getidloading: false,
        data: action,
      };
    case "GET_GOOGLE_PLATFORM_ERROR":
      return {
        ...state,
        getiderror: false,
      };
    case "GET_GOOGLE_PLATFORM_LOADING":
      return {
        ...state,
        getidloading: true,
      };
    case "GET_FACEBOOK_CAMPAIGNS_PLATFORM":
      return {
        ...state,
        getidloading: false,
        data: action,
      };
    case "GET_FACEBOOK_CAMPAIGNS_PLATFORM_ERROR":
      return {
        ...state,
        getiderror: false,
      };
    case "GET_FACEBOOK_CAMPAIGNS_PLATFORM_LOADING":
      return {
        ...state,
        getidloading: true,
      };
    case "GET_FACEBOOK_ADSETS_PLATFORM":
      return {
        ...state,
        getidloading: false,
        data: action,
      };
    case "GET_FACEBOOK_ADSETS_PLATFORM_ERROR":
      return {
        ...state,
        getiderror: false,
      };
    case "GET_FACEBOOK_ADSETS_PLATFORM_LOADING":
      return {
        ...state,
        getidloading: true,
      };

    default:
      return state;
  }
};

export default socialAccountsreducer;
