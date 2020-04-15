import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'event-list',
    component: () => import(/* webpackChunkName: "EventList" */ '../views/EventList.vue'),
  },
  {
    path: '/event/:id',
    name: 'event-details',
    props: true,
    component: () => import(/* webpackChunkName: "EventDetails" */ '../views/EventDetails.vue'),
  },
  {
    path: '/event/:organizer',
    name: 'event-filtered',
    props: true,
    component: () => import(/* webpackChunkName: "EventListFiltered" */ '../views/EventListSorted.vue'),
  },
  {
    path: '/create',
    name: 'event-create',
    component: () => import(/* webpackChunkName: "EventCreate" */ '../views/EventCreate.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
