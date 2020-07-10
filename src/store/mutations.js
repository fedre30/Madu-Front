import _ from "lodash";
import LocalForage from "localforage";
import helpers from "./commonFunction.js";
import Store from "./index.js";
export default {
  GETTERS_CREATED(state) {
    state.gettersCreated = true;
  },
  CREATE_ENTRIES(state, modelName) {
    Store.state[modelName] = {};
    Store.state.modelsTimestamps[modelName] = "0.0";
    Store.state.modelsFlagLoaded[modelName] = false;
    Store.state.modelsFetchHandler[modelName] = null;
    if (!state.metaDefinition.listModels[modelName].stats) {
      Store.state[`${modelName}List`] = [];
    }
  },
  ADD_META_MODEL(state, modelName) {
    state.metaDefinition.listModels[`${modelName}s`] = {
      url: `${modelName}/`,
      forced: true // to allow deletion of the model when logging out of the app
    };
  },
  ADD_STORE_ENTRIES(state, modelName) {
    state[modelName] = {};
    state[`${modelName}List`] = [];
    state.modelsTimestamps[modelName] = "0.0";
    state.modelsFlagLoaded[modelName] = false;
    state.modelsFetchHandler[modelName] = null;
  },
  REMOVE_STORE_ENTRIES(state, modelName) {
    delete state.modelsFetchHandler[modelName];
    delete state.modelsFlagLoaded[modelName];
    delete state.modelsTimestamps[modelName];
    delete state[`${modelName}List`];
    delete state[modelName];
  },
  REMOVE_META_MODEL(state, modelName) {
    delete state.metaDefinition.listModels[`${modelName}s`];
  },

  RESET_MODELS_SCOPED(state, scopedModelsNameList) {
    for (let modelName of scopedModelsNameList) {
      this.commit("RESET_MODEL_VALUES", modelName);
    }
  },

  SET_SCOPE(state, scopes) {
    if (!state.scopes) {
      state.scopes = {};
    }
    for (let key in scopes) {
      state.scopes[key] = scopes[key];
    }
  },

  REMOVE_SCOPE(state, scope_key) {
    delete state.scopes[scope_key];
  },

  RESET_SCOPE(state) {
    state.scopes = null;
  },

  RESET_MODEL_VALUES(state, modelName) {
    state[modelName] = {};
    state[`${modelName}List`] = [];
    state.modelsTimestamps[modelName] = "0.0";
    state.modelsFlagLoaded[modelName] = false;
    state.modelsFetchHandler[modelName] = null;
  },

  UPDATE_LOCAL_STORAGE(state, data) {
    LocalForage.getItem(data.modelName).then(localValues => {
      if (localValues === null) {
        localValues = { list: {}, timestamp: 0 };
      }
      for (let item of data.list) {
        localValues.list[item.uid] = item;
      }
      for (let itemDeleted of data.deletedModelUid) {
        delete localValues.list[itemDeleted];
      }
      localValues.timestamp = data.timestamp;
      LocalForage.setItem(data.modelName, localValues);
    });
  },

  UPDATE_LIST(state, { list, modelName }) {
    if (list.length === 0) return;
    let stored = state[modelName];
    let itemsToMutate = helpers.UPDATE_LIST(stored, list);
    if (itemsToMutate.error) {
      throw new Error(itemsToMutate.error);
    }
    if (_.isEmpty(stored)) {
      state[modelName] = itemsToMutate.state;
      state[`${modelName}List`] = itemsToMutate.list;
    } else {
      for (let item of itemsToMutate.itemsToAdd) {
        this.commit("ADD_ITEM", {
          modelName: modelName,
          item: item
        });
      }
      for (let item of itemsToMutate.itemsToUpdate) {
        this.commit("EDIT_ITEM", {
          modelName: modelName,
          item: item
        });
      }
    }
  },

  UPDATE_STATS_MODEL(state, data) {
    state[data.modelName] = data.count;
  },

  EDIT_ITEM(state, { modelName, item }) {
    for (let key in item) {
      state[modelName][item.uid][key] = item[key];
    }
  },

  UPDATE_SELF_USER(state, data) {
    state.selfUser = data;
    state.selfUserLoaded = true;
  },

  ADD_ITEM(state, { modelName, item }) {
    this._vm.$set(state[modelName], item.uid, item);
    state[`${modelName}List`].push(item.uid);
  },

  DELETE_ITEM(state, { modelName, itemUid }) {
    let index = state[`${modelName}List`].findIndex(uid => {
      return uid == itemUid;
    });
    if (index == -1) {
      return;
    }
    state[`${modelName}List`].splice(index, 1);
    delete state[modelName][itemUid];
  },

  UPDATE_MODEL_TIMESTAMP(state, { modelName, timestamp }) {
    state.modelsTimestamps[modelName] = timestamp;
  },

  UPDATE_MODEL_LOADING_STATUS(state, data) {
    state.modelsFlagLoaded[data.modelName] = data.status;
  },

  UPDATE_MODEL_FETCH_HANDLER(state, data) {
    state.modelsFetchHandler[data.modelName] = data.handler;
  },

  REMOVE_DELETED_MODELS(state, { deletedModelUid, modelName }) {
    if (deletedModelUid instanceof Array) {
      let _deletedModelUid = [...new Set(deletedModelUid)];
      for (let modelUid of _deletedModelUid) {
        this.commit("DELETE_ITEM", {
          modelName: modelName,
          itemUid: modelUid
        });
      }
    }
  },

  SET_FLAG_MODELS_LOADED() {
      console.warn('WARNING, Obsolete mutation'); //eslint-disable-line
  },

  UNSET_FLAG_MODELS_LOADED() {
      console.warn('WARNING, Obsolete mutation'); //eslint-disable-line
  },

  SET_API_ROOT_URL(state, data) {
    state.rootUrl = data;
  },

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
