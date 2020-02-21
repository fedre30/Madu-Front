# Madu 
### Frontoffice


> 🍃 Welcome to Hetic W3 final project ! 🥕


## Concept 🧐

Madu is a Mobile app that lists on a map all eco-friendly adresses such as shops, resturants etc., in order to create more ethical and engaged consumers.

## Brief 🤓

Developing a Back-office whose feature are:

* Dashboard for clients management (companies or schools)
* Dashboad for POI management (restaurant, shops, etc.)
* Map of existing POIs and clients.
* Login

## Stack choices 📦

### Libraries 📕

* [Vue](https://vuejs.org)
* [vuex](https://vuex.vuejs.org)
* [element-ui](https://element.eleme.io/#/fr-FR) 
* [Vue-router](https://router.vuejs.org)
* [leaflet](https://leafletjs.com)
* [node-open-geocoder](https://github.com/joaquimserafim/node-open-geocoder)

### Why Vue.js?
Vue.js is a very light Javascript framework that allows to easily build up to medium-size Apps.


### Why Vuex?
Vuex is useful for several reasons: firstly, when data needs to be passed between more than two components; secondly, when several sets of two components need the same data, but don't have a direct parent-child relationship, thirdly mutation debugging info and time travel in the browser.
In our case, it has been very useful for login management.

### Why Element?

Element is a very large UI library, widely used among Vue.js community.
We chose this library for the amount of available components, community support and documentation.

### Why Leaflet?

As this project aims a more eco-friendly life, we stated that Google Maps API was not a good choice as it is well known that Google API have a huge environmental print.
So, we chose Leaflet over other APIs because it is widely used in Javascript-built applications and it is quite easy to set up.


## Team 👩🏻‍💻 👨🏻‍💻

* Quentin Aimé (Frontend Developer)
* Federica Alfano (Frontend Developer)
* Joel Pokam (Frontend Developer)


## Link 🐼

[http://35.180.164.83:8080/](http://35.180.164.83:8080/)

### Login credentials 🔑

**username**: `chrystal.leliegard@madu.net`

**password**: `madu`

## Project setup 🚀
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Infra

### Ansible

#### Rôles
    
- `install_docker`: Docker setup on AWS Instance
- `pull_and_run_docker_image`: Pull and Run of a docker image

#### Commande

`ansible-playbook -i ./ansible/inventory/hosts ./ansible/roles/install_docker.yml --key <your_key> --user ubuntu`

`ansible-playbook -i ./ansible/inventory/hosts ./ansible/roles/pull_and_run_docker_image.yml --key <your_key> --user ubuntu`

### Terraform

- variables: `key_path` (path to your public key)

- An instance EC2 on Ubuntu 18.04 
- A security group allowing the port 22 and 8080 for the app

`terraform init`

`terraform apply`
