const initialState = {
    list: [],
    details: {},
    dashboardFilter: "",
    reloadPage: false,
    pagination: {
        limit: 10,
        offset: 1,
        total: 10,
    },
};
const CustomizationDashboard = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_CUSTOMIZATION_DASHBOARD":
            state = {
                ...state,
                list: action?.data?.data?.CustomizeDashboardData || [],
                pagination: action.data.data.pagination,
            }
            break;
        case "GET_CUSTOMIZATION_DASHBOARD_DETAIL":
            state = {
                ...state,
                details: action?.data?.data[0] || {}
            }
            break;
        case "RESET_CUSTOMIZATION_DASHBOARD_DETAIL":
            state = {
                ...state,
                details: {},
            }
            break;
        case "SET_DASHBOARD_CUSTOMIZATION":
            state = {
                ...state,
                dashboardFilter: action.data
            }
            break;
        case "SET_RELOAD_DASHBOARD":
            state = {
                ...state,
                reloadPage: action.data
            }
            break;
        default:
            return state
    }
    return state
};

export default CustomizationDashboard;
