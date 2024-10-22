const initialState = {
  profile: {},
  userList: [],
  groupList: [],
  pagination: {
    limit: 10,
    offset: 1,
    total: 10,
  },
  groupPagination: {
    limit: 10,
    offset: 1,
    total: 10,
  },

  ui: {
    profileloading: false,
  },
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETPROFILE_FULLFILL":
      state = {
        ...state,
        profile: action.data,
      };
      break;
    case "GETUSERLIST_FULLFILLED":
      state = {
        ...state,
        profileLoading: false,
        userList: action?.data?.usersData,
        pagination: action?.data?.pagination,
      };
      break;
    case "GETGROUPLIST_FULLFILLED":
      state = {
        ...state,
        profileLoading: false,
        groupList: action?.data?.groupData,
        groupPagination: action?.pagination,
      };
      break;
    case "UPDATEUSERLIST_FULLFILLED":
      state = {
        profile: action?.payload?.data?.data,
      };
      break;
    case "ACTIVEINACTIVEUSER_SUCCESS":
      state = {
        status: "loading",
        profileloading: false,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default userListReducer;
