
// 

// **  Initial State
const initialState = {
    sheetByModuleName: null,
};

const sheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SHEET_BY_MODULENAME":
            state = {
                ...state,
                sheetByModuleName: action.data,
            };
            break;
        default:
            return state;
    }
    return state;
};

export default sheetReducer;
