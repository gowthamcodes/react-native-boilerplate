import { AnyAction } from 'redux';
import { IUser } from '../../types/misc/user.types';
import C from './user.constant';

export const user = (state: IUser | null = null, action: AnyAction) => {
  switch (action.type) {
    case C.AUTH_USER:
      return action.payload;
    case C.UPDATE_USER: {
      const _state = JSON.parse(JSON.stringify(state as IUser));
      return {
        ..._state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export const isloggedin = (state = false, action: AnyAction) => {
  if (action.type === C.SET_LOGIN) {
    return action.payload;
  } else {
    return state;
  }
};
