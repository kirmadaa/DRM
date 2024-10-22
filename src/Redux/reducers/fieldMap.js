// **  Initial State
const initialState = {
    leadFields: [],
    accountFields: [],
    contactFields: [],
    opportunityFields: [],

};

const FiledMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FORM_LEAD":
            return { ...state, leadFields: action.data };
        case "GET_FORM_CONTACT":
            return { ...state, contactFields: action.data };
        case "GET_FORM_ACCOUNT":
            return { ...state, accountFields: action.data };
        case "GET_FORM_OPPORTUNITY":
            return { ...state, opportunityFields: action.data };

        default:
            return state;
    }
    return state;
};

export default FiledMapReducer;
