// Coloque aqui suas actions
export const USER_INFOS = 'USER_INFOS';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';
export const EXCHANGE_TYPE = 'EXCHANGE_TYPE';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_ERROR = 'GET_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const RESPONSE_API_WITH_ADD_BUTTON = 'RESPONSE_API_WITH_ADD_BUTTON';

export const userInfos = (email) => (
  {
    type: USER_INFOS,
    email,
  });

export const totalExpense = (expenseValue) => (
  {
    type: TOTAL_EXPENSE,
    expenseValue,
  });

export const exchangeType = (exchange) => (
  {
    type: EXCHANGE_TYPE,
    exchange,
  });

export const addExpenses = (expenses) => (
  {
    type: ADD_EXPENSES,
    expenses,
  });

export const requestAPI = () => (
  {
    type: REQUEST_API,
  });

export const responseAPI = (currencies, responseAPIWithAddButton) => (
  {
    type: RESPONSE_API,
    currencies,
    responseAPIWithAddButton,
  });

// export const responseAPIWithAddButton = (currencies) => (
//   {
//     type: RESPONSE_API_WITH_ADD_BUTTON,
//     currencies,
//   });

export const getError = (error) => (
  {
    type: GET_ERROR,
    error,
  });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());

    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await response.json();
      const resultWithAddButton = {
        ...result,
      };
      delete result.USDT;
      return dispatch(responseAPI(result, resultWithAddButton));
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
}

// export function fetchAPIWithAddButton() {
//   return async (dispatch) => {
//     dispatch(requestAPI());

//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const result = await response.json();
//       return dispatch(responseAPIWithAddButton(result));
//     } catch (error) {
//       dispatch(getError(error.message));
//     }
//   };
// }
