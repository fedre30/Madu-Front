import axios from "axios";
export default {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      console.debug("login"); // eslint-disable-line
      commit("auth_request");
      console.debug(user); // eslint-disable-line
      axios({
        url: `${window.config.api_root_url}login/`,
        data: user,
        method: "POST"
      })
        .then(resp => {
          console.debug(resp); // eslint-disable-line
          const token = resp.data.accessToken;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
          console.debug(err); // eslint-disable-line
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    localStorage.setItem("token", "");
    commit("LOGOUT");
  },
  fetchData(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${window.config.api_root_url}${payload.modelName}/`,
          payload.filters
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  postData(context, payload) {
    return new Promise((resolve, reject) => {
      let url = `${window.config.api_root_url}${payload.modelName}/`;
      if (payload.is_update === true) {
        url = `${url}update/${payload.objectId}`;
      } else {
        url = `${url}add`;
      }
      axios
        .post(url, payload.data)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  patchData(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${window.config.api_root_url}${payload.modelName}/update/${payload.objectId}`,
          payload.data
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // createData(context, payload) {

  // }
};
