import { combineReducers } from 'redux';
import { loading } from './loading/loading.reducer';
import { user, isloggedin } from './user/user.reducer';
import { app_configuration } from './app_configuration/app_configuration.reducer';
import user_constants from './user/user.constant';

const application_reducer = combineReducers({
  // users related
  loading,
  user,
  isloggedin,
  app_configuration
});

export const root_reducer = (state: any, action: any) => {
  if (action.type === user_constants.DEAUTH_USER) {
    delete state.user;
  }
  return application_reducer(state, action);
};
