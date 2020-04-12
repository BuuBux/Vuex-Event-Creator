import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'event-list',
    component: () => import(/* webpackChunkName: "EventList" */ '../views/EventList.vue'),
  },
  {
    path: '/details/:id',
    name: 'event-details',
    props: true,
    component: () => import(/* webpackChunkName: "EventDetails" */ '../views/EventDetails.vue'),
  },
  {
    path: '/create/',
    name: 'event-create',
    component: () => import(/* webpackChunkName: "EventCreate" */ '../views/EventCreate.vue'),
  },
  {
    path: '/filtered/:organizer',
    name: 'event-filtered',
    props: true,
    component: () => import(/* webpackChunkName: "EventListFiltered" */ '../views/EventListSorted.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
