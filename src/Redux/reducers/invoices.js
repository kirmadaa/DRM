const initialState = {
  List: [],
  Detail: {},
  Filters: [],
  pagination: {
    limit: 10,
    offset: 1,
    total: 10,
  },
};
const Invoices = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DATA_SaleOrder":
      state = {
        ...state,
        List: action.data.data.orderData,
        pagination: action.data.data.pagination,
      };
      break;
    case "GET_ALL_DATA_FILTER_SaleOrder":
      state = {
        ...state,
        List: action.data.data.orderData,
        pagination: action.data.data.pagination,
      };
      break;
    case "NULL_ALL_DATA_FILTER_SaleOrder":
      state = {
        ...state,
        List: [],
        pagination: {
          limit: 10,
          offset: 1,
          total: 10,
        },
      };
      break;
    case "GET_DATA_BY_ID_SaleOrder":
      state = {
        ...state,
        Detail: action.data.data,
      };
      break;
    case "GET_FILTERS_SaleOrder":
      state = {
        ...state,
        Filters: action.data.data,
      };
      break;
    case "RESET_STATE_SaleOrder":
      state = {
        ...state,
        List: [],
        Detail: {},
        Filters: [],
        pagination: {
          limit: 10,
          offset: 1,
          total: 10,
        },
      };

      break;

    default:
      return state;
  }
  return state;
};

export default Invoices;
