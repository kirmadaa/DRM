// **  Initial State
const initialState = {
    logedInUser: null,
    profileInfo: null,
    getAllCity: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                logedInUser: action.data
            }
        case 'GET_PROFILE':
            return {
                ...state,
                profileInfo: action.data
            }
        case 'GET_ALL_CITY':
            return {
                ...state,
                getAllCity: action.data
            }
        default:
            return state
    }
}

export default authReducer
