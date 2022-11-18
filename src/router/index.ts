import { createRouter, createWebHistory } from "vue-router";

import ActivateAccountView from "../views/ActivateAccountView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MarketPlaceView from "../views/MarketPlaceView.vue";
import RegistrationDone from "../views/RegistrationDone.vue";
import RegistrationView from "../views/RegistrationView.vue";
import ReqActivateAccountView from "../views/ReqActivateAccountView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import ResetPasswordDoneView from "../views/ResetPasswordDoneView.vue";
import ResetPasswordSubmitView from "../views/ResetPasswordSubmitView.vue";

import BuildSiteView from "../site/BuildSite.vue";
import MySitesView from "../site/MySites.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homex",
      component: HomeView,
      //component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/regist",
      name: "registration",
      component: RegistrationView,
    },
    {
      path: "/regist-done",
      name: "registrationdone",
      component: RegistrationDone,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/marketplace",
      name: "marketplace",
      component: MarketPlaceView,
    },
    {
      path: "/activate",
      name: "activate",
      component: ReqActivateAccountView,
    },
    {
      path: "/dp/activate-submit",
      name: "activateConfirm",
      component: ActivateAccountView,
    },
    {
      path: "/reset-password",
      name: "resetpassword",
      component: ResetPasswordView,
    },
    {
      path: "/dp/reset-password",
      name: "resetpasswordsubmit",
      component: ResetPasswordSubmitView,
    },
    {
      path: "/reset-password-done",
      name: "resetpassworddone",
      component: ResetPasswordDoneView,
    },
    {
      path: "/build-site",
      name: "buildsite",
      component: BuildSiteView,
    },
    {
      path: "/my-sites",
      name: "mysites",
      component: MySitesView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
