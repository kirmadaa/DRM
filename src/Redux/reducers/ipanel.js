// **  Initial State
const initialState = {
    mainSearchResult: null,
};

const ipanelState = (state = initialState, action) => {
    switch (action.type) {
        case "IPANEL_SEARCH":
            return { ...state, mainSearchResult: action.data };
        default:
            return state;
    }
    return state;
};

export default ipanelState;
