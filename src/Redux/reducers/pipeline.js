// **  Initial State
const initialState = {
  stageList: [],
  pipelineModal: null,
};

const pipelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_STAGES":
      state = { ...state, stageList: action.data };
      break;
    case "PIPELINE_MODAL":
      state = { ...state, pipelineModal: action.data };
      break;
    default:
      return state;
  }
  return state;
};

export default pipelineReducer;
