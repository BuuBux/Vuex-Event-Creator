import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'EventList',
    component: () => import(/* webpackChunkName: "EventList" */ '../views/EventList.vue'),
  },
  {
    path: '/details/:id',
    name: 'EventDetails',
    component: () => import(/* webpackChunkName: "EventDetails" */ '../views/EventDetails.vue'),
  },
  {
    path: '/create/',
    name: 'EventCreate',
    component: () => import(/* webpackChunkName: "EventCreate" */ '../views/EventCreate.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
