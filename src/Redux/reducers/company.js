// **  Initial State
const initialState = {
  Company: {},
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMPANY_DATA_BY_ID":
      state = { ...state, Company: action.data };
      break;
    default:
      return state;
  }
  return state;
};

export default companyReducer;
