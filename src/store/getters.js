import schwartz from "schwartz";

export default {
  modelsLoaded: state => {
    let listModels = state.meta.listModels;
    for (let modelName in listModels) {
      if (listModels[modelName].fetch === false) continue;
      if (!state.modelsFlagLoaded[modelName]) {
        // console.debug(`Among all, ${modelName} not loaded yet`);
        return false;
      }
    }
    return true;
  },

  modelsUnscopedLoaded: state => {
    let listModels = state.meta.listModels;
    for (let modelName in listModels) {
      if (listModels[modelName].fetch === false) continue;
      // Model scoped only if explicit key scoped set to true
      if (listModels[modelName].scoped !== true) {
        if (!state.modelsFlagLoaded[modelName]) {
          return false;
        }
      }
    }
    return true;
  },

  modelsScopedLoaded: state => {
    let listModels = state.meta.listModels;
    for (let modelName in listModels) {
      if (listModels[modelName].fetch === false) continue;
      // Model scoped only if explicit key scoped set to true
      if (listModels[modelName].scoped === true) {
        if (!state.modelsFlagLoaded[modelName]) {
          // console.debug(`Among Scoped, ${modelName} not loaded yet`);
          return false;
        }
      }
    }
    return true;
  },

  queryParams: () => (filter = {}) => {
    let queryParams = Object.keys(filter)
      .map(key => {
        return `${key}=${filter[key]}`;
      })
      .join("&");
    return `?${queryParams}`;
  },

  getItemForUser(state) {
    return (list, uid) => {
      return state[list].filter(item => {
        return item.employee == uid;
      });
    };
  },

  getItemFromListById(state) {
    return (list, uid) => {
      return state[list].find(item => {
        return item.uid == uid;
      });
    };
  },

  getList(state) {
    return list => {
      return state[list];
    };
  },

  apiRootUrl(state) {
    return state.rootUrl;
  },

  apiStatusUrl(state, getters) {
    let statusUrl = new URL("/status/", getters.apiRootUrl);
    return statusUrl.href;
  },

  appStatusUrl() {
    let statusUri = window.status_uri || "/status/";
    let statusUrl = new URL(statusUri, window.location.origin);
    return statusUrl.href;
  },
  currentUser(state) {
    return state.selfUser;
  },

  userIsSuperUser(state, getters) {
    if (!getters.currentUser || !getters.currentUser.level) {
      return false;
    }
    let level = getters.currentUser.level.toLowerCase();
    return level === "superuser";
  },

  userIsAdmin(state, getters) {
    if (!getters.currentUser || !getters.currentUser.level) {
      return false;
    }
    let level = getters.currentUser.level.toLowerCase();
    return level === "admin";
  },

  userIsManager(state, getters) {
    if (!getters.currentUser || !getters.currentUser.level) {
      return false;
    }
    let level = getters.currentUser.level.toLowerCase();
    return level === "manager";
  },

  userIsSimpleUser(state, getters) {
    if (!getters.currentUser || !getters.currentUser.level) {
      return false;
    }
    let level = getters.currentUser.level.toLowerCase();
    return level === "simpleuser";
  },

  userIsAtLeastAdmin(state, getters) {
    return getters.userIsSuperUser || getters.userIsAdmin;
  },

  userIsAtLeastManager(state, getters) {
    return getters.userIsManager || getters.userIsAtLeastAdmin;
  },

  getCollectionSorted: () => (collection, key) => {
    return schwartz(collection, elt => {
      return elt[key];
    });
  },

  permissionByModelName(state, getters) {
    let objectConcretePerm = {};
    for (let item of getters.concretePermissions) {
      objectConcretePerm[item.model_name] = item;
    }
    return objectConcretePerm;
  },

  hasPermissionOnModel: (state, getters) => (modelName, action) => {
    // action can be: create, update, delete, retrieve
    if (getters.userIsAtLeastAdmin) {
      return true;
    }
    let concretePermission = getters.permissionByModelName[modelName];
    if (!concretePermission) return false;
    let user = getters.currentUser;
    for (let role of user.roles_uid) {
      if (concretePermission[`${action}_roles_uid`].includes(role)) {
        return true;
      }
    }
    return false;
  },
  userPasswordChangeable: (state, getters) => (user = undefined) => {
    if (user === undefined) {
      return !!getters.currentUser.external_auth === false;
    } else {
      return !!user.external_auth === false;
    }
  },

  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,

  companies(state) {
    if (state["companiesList"]) {
      return state["companiesList"].map(objId => state["companies"][objId]);
    }
    return [];
  },
  companiesByUid: state => objId => {
    return state["companies"][objId];
  },
  shops(state) {
    return state["shopsList"].map(objId => state["shops"][objId]);
  },
  shopsByUid: state => objId => {
    return state["shops"][objId];
  },
  newAddresses(state) {
    return state["newAddressesList"].map(objId => state["newAddresses"][objId]);
  },
  newAddressesByUid: state => objId => {
    return state["newAddresses"][objId];
  },
  tags(state) {
    return state["tagsList"].map(objId => state["tags"][objId]);
  },
  tagsByUid: state => objId => {
    return state["tags"][objId];
  },
  challenges(state) {
    return state["challengesList"].map(objId => state["challenges"][objId]);
  },
  challengesByUid: state => objId => {
    return state["challenges"][objId];
  },
  rewards(state) {
    return state["rewardsList"].map(objId => state["rewards"][objId]);
  },
  rewardsByUid: state => objId => {
    return state["rewards"][objId];
  },
  typesOfShops(state) {
    return state["typesOfShopsList"].map(objId => state["typesOfShops"][objId]);
  },
  typesOfShopsByUid: state => objId => {
    return state["typesOfShops"][objId];
  },
  userDisagreements(state) {
    return state["userDisagreementsList"].map(
      objId => state["userDisagreements"][objId]
    );
  },
  userDisagreementsByUid: state => objId => {
    return state["userDisagreements"][objId];
  },
  users(state) {
    return state["usersList"].map(objId => state["users"][objId]);
  },
  usersByUid: state => objId => {
    return state["users"][objId];
  },
  greenscoreCriterias(state) {
    return state["greenscoreCriteriasList"].map(
      objId => state["greenscoreCriterias"][objId]
    );
  },
  greenscoreCriteriasByUid: state => objId => {
    return state["greenscoreCriterias"][objId];
  }
};
