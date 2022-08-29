import { USER_INFOS } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

function userReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFOS:
    return { ...state, email: action.email };
  default: return state;
  }
}

export default userReduce;
