import authInitialState from "./authInitialState";


export const authReducers = {
  authStart: (state) => {
    state.loading = true;
    state.error = null;
  },
  authStateAndSuccess: (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload;
  }, 
  authFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  authLogout: (state) => {
    state.loading = false;
    state.user = null;
    state.error = null;
  },
    authReset: (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
    },
};
