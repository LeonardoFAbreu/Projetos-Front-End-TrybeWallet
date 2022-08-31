import { TOTAL_EXPENSE, EXCHANGE_TYPE,
  REQUEST_API, RESPONSE_API, GET_ERROR } from '../actions';

const INITIAL_STATE = {
  expenseValue: 0,
  exchange: 'BRL',
  expenses: [],
  currencies: [],
  error: null,
};

const walletReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSE:
    return {
      ...state,
      expenseValue: action.walletReduce,
    };
  case EXCHANGE_TYPE:
    return {
      ...state,
      exchange: action.exchange,
    };
  case REQUEST_API:
    return {
      ...state,
    };
  case RESPONSE_API:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case GET_ERROR:
    return {
      ...state,
      error: action.error,
    };

  default: return state;
  }
};

export default walletReduce;
