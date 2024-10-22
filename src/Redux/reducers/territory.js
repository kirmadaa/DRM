const initialState = {
    List: [],
    Detail: {},
    pagination: {
        limit: 10,
        offset: 1,
        total: 10,
    },
};
const Territory = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_DATA_TERRITORY":
            state = {
                ...state,
                List: action.data.data.TerritoriesData,
                pagination: action.data.data.pagination,
            }
            break;
        default:
            return state
    }
    return state
};

export default Territory;
