import axios from "axios";
import LocalForage from "localforage";

let isError403 = function(error) {
  return (
    error.status === 403 ||
    error.toString().includes("request canceled") ||
    error.toString().includes("Request failed with status code 403")
  );
};

let isError500 = function(error) {
  return (
    error.status === 500 ||
    error.status === 502 ||
    error.status === 503 ||
    error.toString().includes("status code 500") ||
    error.toString().includes("status code 502") ||
    error.toString().includes("status code 503") ||
    error.toString().includes("Network Error")
  );
};

let wait = async function(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

let ensureApiUrlIsAbsolute = url => {
  let regex = /^\/api\/v\d+(\.\d+)?\//;
  let relativeUrl = url.match(regex);
  if (relativeUrl) {
    url = url.replace(relativeUrl[0], "");
  }
  return url;
};

export default {
  async clearModels({ state, commit, dispatch }, listModels = null) {
    if (listModels === null) {
      listModels = state.metaDefinition.listModels;
    }
    for (let modelName in listModels) {
      dispatch("cancelFetchModelPeriodically", modelName);
      commit("RESET_MODEL_VALUES", modelName);
    }
  },
  async loadModels({ state, dispatch }, listModels = null) {
    let models = {};
    if (listModels === null) {
      listModels = state.metaDefinition.listModels;
    }
    for (let modelName in listModels) {
      if (listModels[modelName].fetch !== false) {
        models[modelName] = listModels[modelName];
      }
    }
    return dispatch("fetchModelsPeriodically", models);
  },

  async reloadModels({ state, dispatch }, listModels = null) {
    if (listModels === null) {
      listModels = state.metaDefinition.listModels;
    }
    await dispatch("clearModels", listModels);
    await dispatch("loadModels", listModels);
  },

  async createItem(context, { item, model, url, scopes = null }) {
    delete item.uid;
    const config = {
      headers: scopes || {}
    };
    return this.axios.post(url, item, config).then(response => {
      let addItemData = {
        modelName: model,
        item: response.data
      };
      if (context.state.metaDefinition.listModels[model].fetch !== false) {
        context.commit("ADD_ITEM", addItemData);
      }
      return Promise.resolve(response.data);
    });
  },
  async updateItem(context, { item, model }) {
    item.url = ensureApiUrlIsAbsolute(item.url);
    return this.axios.put(item.url, item).then(response => {
      let editItemData = {
        modelName: model,
        item: response.data
      };
      if (context.state.metaDefinition.listModels[model].fetch !== false) {
        context.commit("EDIT_ITEM", editItemData);
      }
      return Promise.resolve(response.data);
    });
  },
  async patchItem(context, { item, model }) {
    if (model === "selfUser") {
      item.url = ensureApiUrlIsAbsolute("/account/me/");
    } else {
      item.url = ensureApiUrlIsAbsolute(item.url);
    }
    return this.axios.patch(item.url, item).then(response => {
      let editItemData = {
        modelName: model,
        item: response.data
      };

      if (model === "selfUser") {
        context.commit("UPDATE_SELF_USER", response.data);
      } else {
        if (context.state.metaDefinition.listModels[model].fetch !== false) {
          context.commit("EDIT_ITEM", editItemData);
        }
      }
      return Promise.resolve(response.data);
    });
  },
  async deleteItem(context, { item, model }) {
    item.url = ensureApiUrlIsAbsolute(item.url);
    return this.axios.delete(item.url).then(() => {
      let deleteItem = {
        modelName: model,
        itemUid: item.uid
      };
      if (context.state.metaDefinition.listModels[model].fetch !== false) {
        context.commit("DELETE_ITEM", deleteItem);
      }
    });
  },
  async initialFetchModels({ getters, dispatch }) {
    console.debug('fetch'); //eslint-disable-line
    if (getters.userIsAuthenticated) {
      dispatch("fetchCurrentUserPeriodically");
    }
    return dispatch("loadModels");
  },

  async listModels(context, { url, filters, scope, isStats = false }) {
    let defaultFilters = {
      c_resp_nested: "false",
      c_resp_page_size: 250,
      timestamp_start: "0.0"
    };
    let params = Object.assign({}, defaultFilters, filters || {});
    let queryParams = context.getters.queryParams(params);
    let request = {
      url: `${url}${queryParams}`,
      scopes: scope || {}
    };

    let reponse = null;
    try {
      if (isStats) {
        reponse = context.dispatch("remoteGet", {
          url: `${url}stats/${queryParams}`,
          config: { headers: request.scopes || {} }
        });
      } else {
        reponse = await context.dispatch("unpaginateResponse", request);
      }
    } catch (error) {
      return;
    }
    return reponse;
  },

  async fetchModelByName(context, modelName) {
    let meta = context.state.metaDefinition.listModels[modelName];
    let timestamp = context.state.modelsTimestamps[modelName] || "0.0";
    let filters = Object.assign(
      {},
      { timestamp_start: timestamp },
      meta.filter
    );
    let response = await context.dispatch("listModels", {
      url: meta.url,
      filters: filters,
      scope: meta.scoped ? context.state.scopes : {},
      isStats: meta.stats
    });
    await context.dispatch("updateItemsStored", {
      response,
      meta,
      modelName
    });
    return;
  },

  async updateItemsStored(
    context,
    { response, meta, modelName, isMeta = true, filterHashed = "" }
  ) {
    // on ne traite pas ici les response ignorées
    if (response !== undefined && response !== "ignored") {
      if (meta.stats) {
        context.commit("UPDATE_STATS_MODEL", {
          modelName: modelName,
          count: response.data.objects_count
        });
        context.commit("UPDATE_MODEL_LOADING_STATUS", {
          modelName: modelName,
          status: true
        });
        return Promise.resolve();
      }
      let updateMutation = isMeta ? "UPDATE_LIST" : "nsLoaderStore/UPDATE_LIST";
      let updateTimestamp = isMeta
        ? "UPDATE_MODEL_TIMESTAMP"
        : "nsLoaderStore/UPDATE_MODEL_TIMESTAMP";
      let removeDeletedModels = isMeta
        ? "REMOVE_DELETED_MODELS"
        : "nsLoaderStore/REMOVE_DELETED_MODELS";

      context.commit(updateMutation, {
        modelName: modelName,
        list: response.results,
        filterHashed: filterHashed
      });
      context.commit(updateTimestamp, {
        modelName: modelName,
        timestamp: response.timestamp_end,
        filterHashed: filterHashed
      });
      context.commit(removeDeletedModels, {
        modelName: modelName,
        deletedModelUid: response.deleted_uids,
        filterHashed: filterHashed
      });
      if (isMeta) {
        context.commit("UPDATE_MODEL_LOADING_STATUS", {
          modelName: modelName,
          status: true
        });
      }
      if (meta.persistent) {
        context.commit("UPDATE_LOCAL_STORAGE", {
          modelName: modelName,
          deletedModelUid: response.deleted_uids,
          list: response.results,
          timestamp: response.timestamp_end
        });
      }
    } else if (response === "ignored" && isMeta) {
      context.commit("UPDATE_MODEL_LOADING_STATUS", {
        modelName: modelName,
        status: true
      });
    }
    return Promise.resolve();
  },

  async unpaginateResponse(context, { url, scopes = null }) {
    return new Promise(async resolve => {
      let promises = [];
      let results = [];
      let deleted_uids = [];
      let timestamp_end = 0.0;

      const config = { headers: scopes || {} };

      let response = await context.dispatch("remoteGet", { url, config });
      if (response === "ignored") {
        resolve(response);
        return;
      }
      if (response.status === 204) {
        resolve("ignored");
        return;
      }
      results = response.data.results;
      timestamp_end = response.data.timestamp_end;
      deleted_uids = response.data.deleted_uids || [];
      if (response.data.num_total_pages > 1) {
        // i = 2 car la pagination commence à partir de la page 2, la page 1 étant fait dans la premiere requete en await
        for (let i = 2; i <= response.data.num_total_pages; i++) {
          url = response.data.next.replace(/page=\d+/, `page=${i}`);
          promises.push(context.dispatch("remoteGet", { url, config }));
        }
      }
      Promise.all(promises).then(responses => {
        for (let response of responses) {
          results = results.concat(response.data.results);
          timestamp_end = response.data.timestamp_end;
          deleted_uids = deleted_uids.concat(response.data.deleted_uids);
        }
        resolve({
          results,
          deleted_uids,
          timestamp_end
        });
      });
    });
  },
  async remoteGet(context, { url, config = {} }) {
    return new Promise(async (resolve, reject) => {
      console.debug(this); //eslint-disable-line
      this.axios
        .get(url, config)
        .then(data => {
          resolve(data);
        })
        .catch(async error => {
          if (axios.isCancel(error)) {
            reject(error);
          } else if (isError403(error)) {
            resolve("ignored");
          } else if (isError500(error)) {
            await wait(15);
            this.remoteGet(url, config);
          }
          if (axios.isCancel(error)) {
            reject(error);
          }
          let errorMessage = `ERROR while GET on ${url}: ${error}`;
          if (error.status) {
            errorMessage = `ERROR while GET on ${url} has return a ${error.status}`;
          }
          reject(errorMessage);
        });
    });
  },

  async fetchSelfUser(context) {
    return context
      .dispatch("remoteGet", { url: "account/me/" })
      .then(response => {
        context.commit("UPDATE_SELF_USER", response.data);
      });
  },

  cancelFetchModelsPeriodically({ state, dispatch }, models = null) {
    if (!models) {
      models = state.metaDefinition.listModels;
    }
    for (let modelName in models) {
      if (models[modelName].fetch === false) continue;
      dispatch("cancelFetchModelPeriodically", modelName);
    }
  },

  cancelFetchModelPeriodically({ state, commit }, modelName) {
    clearTimeout(state.modelsFetchHandler[modelName]);
    commit("UPDATE_MODEL_FETCH_HANDLER", { modelName, handler: null });
  },

  async fetchCurrentUserPeriodically({ dispatch, commit }) {
    let fetchSelfUser = () => {
      dispatch("fetchSelfUser")
        .catch(error => {
          if (!axios.isCancel(error)) {
              console.error(error); //eslint-disable-line
          }
        })
        .finally(() => {
          let handler = setTimeout(fetchSelfUser, 60000);
          commit("UPDATE_MODEL_FETCH_HANDLER", {
            modelName: "AccountMe",
            handler
          });
        });
    };
    fetchSelfUser();
    return Promise.resolve();
  },

  async fetchModelsPeriodically({ state, commit, dispatch }, models = null) {
    let defaultPeriod = state.metaDefinition.default.fetchModelsPeriod;
    if (isNaN(defaultPeriod)) {
      console.warn("No periodically fetch of models"); //eslint-disable-line
      return;
    }

    let fetchModel = (modelName, period) => {
      // Add or Subs 20% of value
      let periodWithVariation = Math.floor(
        period * (0.8 + Math.random() * 0.4)
      );
      // Cancel periodically fetch if already exists
      // OPTIM A ACTIVER QUAND COMMANDÉE
      //if(state.modelsFetchHandler[modelName]){
      dispatch("cancelFetchModelPeriodically", modelName);
      //}
      dispatch("fetchModelByName", modelName).finally(() => {
        let handler = setTimeout(() => {
          fetchModel(modelName, period);
        }, periodWithVariation);
        commit("UPDATE_MODEL_FETCH_HANDLER", { modelName, handler });
      });
    };
    if (!models) {
      models = state.metaDefinition.listModels;
    }
    for (let modelName in models) {
      if (models[modelName].fetch === false) continue;
      let period = models[modelName].fetchPeriod || defaultPeriod;
      fetchModel(modelName, period);
    }

    return Promise.resolve();
  },
  removeLocalData() {
    return LocalForage.clear();
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: `${window.config.api_root_url}auth/login/`,
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Token ${token}`;
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
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
          console.debug(resp); //eslint-disable-line
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
          `${window.config.api_root_url}${payload.modelName}/${payload.objectId}/`,
          payload.data
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
