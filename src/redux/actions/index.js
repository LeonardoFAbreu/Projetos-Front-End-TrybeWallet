// Coloque aqui suas actions
export const USER_INFOS = 'USER_INFOS';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';
export const EXCHANGE_TYPE = 'EXCHANGE_TYPE';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_ERROR = 'GET_ERROR';

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

export const requestAPI = () => (
  {
    type: REQUEST_API,
  });

export const responseAPI = (currencies) => (
  {
    type: RESPONSE_API,
    currencies,
  });

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
      delete result.USDT;
      return dispatch(responseAPI(result));
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
}
