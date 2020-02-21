export default {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token) {
    state.status = "success";
    state.currentUser.authenticated = true;
    state.token = token;
  },
  auth_error(state) {
    state.status = "error";
  },
  AUTHENTICATE_USER(state) {
    state.currentUser.authenticated = true;
  },
  LOGOUT(state) {
    state.currentUser.authenticated = false;
    state.token = "";
  }
};
