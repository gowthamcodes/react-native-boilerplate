import { AnyAction } from 'redux';
import C from './loading.constant';

export const loading = (state = false, action: AnyAction) => {
  switch (action.type) {
    case C.CHANGE_LOADING:
      return action.payload;
    default:
      return state;
  }
};
