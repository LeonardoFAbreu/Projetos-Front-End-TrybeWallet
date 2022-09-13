import { TOTAL_EXPENSE, EXCHANGE_TYPE,
  REQUEST_API, RESPONSE_API, GET_ERROR, ADD_EXPENSES,
  REMOVE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  expenseValue: 0,
  exchange: 'BRL',
  expenses: [],
  currencies: [],
  error: null,
  editor: false,
  idToEdit: 0,
};

const walletReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSE:
    return {
      ...state,
      expenseValue: action.expenseValue,
    };
  case EXCHANGE_TYPE:
    return {
      ...state,
      exchange: action.exchange,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload),
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

// teste para novo commit

export default walletReduce;
