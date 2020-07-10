export default {
  meta: {},
  scopes: null,
  rootUrl: "",
  modelsTimestamps: {
    companies: "0.0",
    shops: "0.0",
    tags: "0.0",
    typesOfShops: "0.0",
    greenscoreCriterias: "0.0",
    rewards: "0.0",
    challenges: "0.0",
    newAddresses: "0.0",
    users: "0.0",
    userDisagreements: "0.0"
  },
  modelsFlagLoaded: {
    companies: false,
    shops: false,
    tags: false,
    typesOfShops: false,
    greenscoreCriterias: false,
    rewards: false,
    challenges: false,
    newAddresses: false,
    users: false,
    userDisagreements: false
  },
  modelsFetchHandler: {
    companies: null,
    shops: null,
    tags: null,
    typesOfShops: null,
    greenscoreCriterias: null,
    rewards: null,
    challenges: null,
    newAddresses: null,
    users: null,
    userDisagreements: null
  },
  selfUser: {},
  selfUserLoaded: false,

  metaDefinition: {
    default: {
      fetchModelsPeriod: 30000 // définit le temps en ms entre chaque fetch
    },
    listModels: {
      companies: {
        url: "company/"
      },
      shops: {
        url: "shop/"
      },
      newAddresses: {
        url: "new-address/"
      },
      challenges: {
        url: "challenge/"
      },
      tags: {
        url: "tag/"
      },
      rewards: {
        url: "reward/"
      },
      typesOfShops: {
        url: "type-of-shop/"
      },
      greenscoreCriterias: {
        url: "greenscore-criteria/"
      },
      userDisagreements: {
        url: "user-disagreement/"
      },
      users: {
        url: "user/"
      }
    }
  },
  companies: {},
  companiesList: [],
  shops: {},
  shopsList: [],
  newAddresses: {},
  newAddressesList: [],
  tags: {},
  tagsList: [],
  challenges: {},
  challengesList: [],
  rewards: {},
  rewardsList: [],
  typesOfShops: {},
  typesOfShopsList: [],
  userDisagreements: {},
  userDisagreementsList: [],
  users: {},
  usersList: [],
  status: "",
  token: localStorage.getItem("token") || "",
  currentUser: {
    uid: "",
    authenticated: false
  }
};
