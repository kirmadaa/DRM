const initialState = {
    list: [],
    Detail: {},
    pagination: {
        limit: 10,
        offset: 1,
        total: 10,
    },
};
const AssignmentRules = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_ASSIGNMENT_RULES":
            state = {
                ...state,
                list: action?.data?.data?.assignmentData || [],
                pagination: action?.data?.data?.pagination,
            }
            break;
        default:
            return state
    }
    return state
};

export default AssignmentRules;
