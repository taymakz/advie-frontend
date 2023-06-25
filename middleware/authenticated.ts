import {useAuthenticateStore} from "~/store/account/AuthenticateStore";

export default  defineNuxtRouteMiddleware( (to, from) => {
    const authStore =  useAuthenticateStore();
     if (!authStore.isLogin) {
        return navigateTo(`/login?backUrl=${to.fullPath}`)
    }
})

