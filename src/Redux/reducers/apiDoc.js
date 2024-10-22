// **  Initial State
const initialState = {
    apiList: []
}

const apiDocReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_API_LIST":
            state = { ...state, apiList: action.data, }
            break;
        default:
            return state
    }
    return state
}

export default apiDocReducer
