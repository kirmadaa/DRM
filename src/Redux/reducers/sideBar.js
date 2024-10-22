// **  Initial State
const initialState = {
  sideBar: true,
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIDEBAR_STATE":
      state = {
        ...state,
        sideBar: action.data,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default sideBarReducer;
