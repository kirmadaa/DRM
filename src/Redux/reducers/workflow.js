const initialState = {
  workflowIdData: null,
};

const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WORKFLOW_BY_ID":
      state = {
        ...state,
        workflowIdData: action.data,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default workflowReducer;
