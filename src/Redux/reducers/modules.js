
// **  Initial State
const initialState = {
    listOfForms: [],
    getModuleById: null,
    formbyModuleName:null,
    quickFormbyModuleName:null
}

const ModulesReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_ALL_FORMS":
            state = { ...state, listOfForms: action.data, }
            break;
        case "GET_FOMR_LAYOUT_BY_MODULE":
            state = { ...state, formbyModuleName: action.data, }
            break;
        case "GET_QUICK_FORM_LAYOUT_BY_MODULE":
            state = { ...state, quickFormbyModuleName: action.data, }
            break;
        case "GET_MODULE_BY_ID":
            state = { ...state, getModuleById: action.data, }
            break;
        default:
            return state
    }
    return state
}

export default ModulesReducer
