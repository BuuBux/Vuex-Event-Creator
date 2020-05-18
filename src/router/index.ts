import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'event-list',
    props: true,
    component: () => import(/* webpackChunkName: "EventList" */ '../views/EventList.vue'),
  },
  {
    path: '/event/:id',
    name: 'event-details',
    props: true,
    component: () => import(/* webpackChunkName: "EventDetails" */ '../views/EventDetails.vue'),
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id)
        .then((event) => {
          // TODO remove no-param-reassign error
          // eslint-disable-next-line no-param-reassign
          to.params.event = event;
          next();
        });
    },
  },
  {
    path: '/event/:organizer',
    name: 'event-filtered',
    props: true,
    component: () => import(/* webpackChunkName: "EventListFiltered" */ '../views/EventSorted.vue'),
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
