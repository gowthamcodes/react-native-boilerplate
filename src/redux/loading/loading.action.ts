import C from './loading.constant';

export const update_loading = (loading_state = false) => ({
  type: C.CHANGE_LOADING,
  payload: loading_state
});
