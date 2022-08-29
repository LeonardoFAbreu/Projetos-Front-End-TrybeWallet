import { combineReducers } from 'redux';
// import user from './user';
import userReduce from './user';
// import wallet from './wallet';
import walletReduce from './wallet';

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  user: userReduce,
  wallet: walletReduce });

export default rootReducer;
