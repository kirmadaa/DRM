// **  Initial State
const initialState = {
    emailTemplates: [],
    smsTemplates: [],
    whatsAppTemplates: [],
    permissionById: null,
}

const ServiceControlReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_TEMPLATE_EMAIL_LIST":
            state = { ...state, emailTemplates: action.data, }
        case "GET_TEMPLATE_SMS_LIST":
            state = { ...state, smsTemplates: action.data, }
            break;
        case "GET_TEMPLATE_WHATSAPP_LIST":
            state = { ...state, whatsAppTemplates: action.data, }
            break;
        case "GET_DATA_SHARING_PERMISSIONS":
            return { ...state, permissionById: action?.data }
            break;
        default:
            return state
    }
    return state
}

export default ServiceControlReducer
