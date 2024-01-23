import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../src/views/pages/home/HomePage";
import PageCreateAnnotations from "../src/views/pages/create/PageCreateAnnotations";
import AnnotationsPage from "../src/views/pages/annotations/AnnotationsPage";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/create",
    component: PageCreateAnnotations,
  },
  {
    path: "/annotations",
    component: AnnotationsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
