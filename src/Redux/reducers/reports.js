
// **  Initial State
const initialState = {
    listOfFolders: [],
    listOfReports: [],
    listOfModulelookup: [],
}

const reports = (state = initialState, action) => {

    switch (action.type) {
        case "GET_LIST_OF_FOLDERS":
            state = { ...state, listOfFolders: action.data, }
            break;
        case "GET_LIST_OF_REPORTS":
            state = { ...state, listOfReports: action.data, }
            break;
        case "GET_LOOKUP_OF_MODULE":
            state = { ...state, listOfModulelookup: action.data, }
            break;
        default:
            return state
    }
    return state
}

export default reports
