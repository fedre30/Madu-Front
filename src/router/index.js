import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PointsOfInterest from "../views/PointsOfInterest.vue";
import Companies from "../views/Companies.vue";
import Tips from "../views/Tips.vue";
import NewAddresses from "../views/NewAddresses.vue";
import Disagreements from "../views/Disagreements.vue";
import Challenges from "../views/Challenges.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/tips",
    name: "tips",
    component: Tips
  },
  {
    path: "/shops",
    name: "shops",
    component: PointsOfInterest
  },
  {
    path: "/company-list",
    name: "company-list",
    component: Companies
  },
  {
    path: "/challenges",
    name: "challenges",
    component: Challenges
  },
  {
    path: "/new-addresses",
    name: "new-addresses",
    component: NewAddresses
  },
  {
    path: "/disagreements",
    name: "disagreements",
    component: Disagreements
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
