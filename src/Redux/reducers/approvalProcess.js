const initialState = {
    list: [],
    details: {},
    pagination: {
        limit: 10,
        offset: 1,
        total: 10,
    },
};
const approvalProcess = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_APPROVAL_PROCESS":
            state = {
                ...state,
                list: action?.data?.data?.ApprovalProcessData || [],
                pagination: action?.data?.data?.pagination,
            }
            break;
        case "GET_APPROVAL_PROCESS_DETAIL":
            state = {
                ...state,
                details: action?.data?.data[0] || {}
            }
            break;
        case "RESET_APPROVAL_PROCESS_DETAIL":
            state = {
                ...state,
                details: {},
            }
            break;
        default:
            return state
    }
    return state
};

export default approvalProcess;
