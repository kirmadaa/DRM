const initialState = {
  securityprofile: [],
  loader: true,
  pagination: {
    limit: 10,
    offset: 1,
    total: 10,
  },

  permissions: null,
};

const SecuirtyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SECURITY_PROFILE_FULL_FILL":
      state = {
        ...state,
        securityprofile: action.data.RoleData,
        loader: false,
        pagination: {
          limit: action.data.pagination.limit,
          offset: action.data.pagination.offset,
          total: action.data.pagination?.total,
        },
      };
      break;
    case "CHECK_PERMISSIONS":
      state = {
        ...state,
        permissions: action.data.data,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default SecuirtyProfileReducer;
