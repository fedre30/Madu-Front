import _ from "lodash";
export default {
  getListeFilteredByFilterObject(list, filters = {}) {
    filters = Object.entries(filters);
    // Object.entries renvoie un tableau qui à chaque index contient un tableau de key, value
    //on obtient donc le résultat [["key", "value"], ...]
    if (filters.length === 0) return list;
    let filteredResults = list
      .map(item => {
        let value = {};
        for (let filter of filters) {
          // on initialiser à null la valeur ici pour le every d'apres
          value[`${filter[0]}-${filter[1]}`] = null;
          // la valeur d'un filtre peut etre multiple si séparé par une ","
          let splitedFilters = filter[1].toString().split(",");
          if (splitedFilters.includes(item[filter[0]].toString())) {
            value[`${filter[0]}-${filter[1]}`] = true;
          }
        }
        // ici on vérifie que toutes les valeurs sont bien à true, ce qui signifie que chaque filtre est passé
        if (Object.values(value).every(v => v === true)) {
          return item;
        } else {
          return undefined;
        }
      })
      .filter(Boolean);

    return filteredResults;
  },
  UPDATE_LIST(stored, list) {
    let itemsToMutate = {
      itemsToAdd: [],
      itemsToUpdate: []
    };
    if (_.isEmpty(stored)) {
      try {
        let indexedObjects = {};
        for (let new_value of list) {
          indexedObjects[new_value.uid] = new_value;
        }
        itemsToMutate.state = indexedObjects;
        itemsToMutate.list = list.map(object => object.uid);
      } catch (error) {
        console.error(error); //eslint-disable-line
      }
      return itemsToMutate;
    }

    if (list instanceof Array) {
      for (let new_value of list) {
        let old_value = stored[new_value.uid];
        if (old_value === undefined) {
          itemsToMutate.itemsToAdd.push(new_value);
        } else if (old_value.modification_date != new_value.modification_date) {
          itemsToMutate.itemsToUpdate.push(new_value);
        }
      }
    } else {
      itemsToMutate.error = "Incorrect type of response";
    }
    return itemsToMutate;
  },

  hashFilters(filter) {
    if (!filter) return "no_filter";
    let hash = [].concat(...Object.entries(filter)).join("_");
    if (hash === "") {
      hash = "no_filter";
    }
    return hash;
  }
};
