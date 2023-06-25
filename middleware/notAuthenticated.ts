import {useAuthenticateStore} from "~/store/account/AuthenticateStore";


export default defineNuxtRouteMiddleware(async () => {

    const authStore = await useAuthenticateStore();
    if (authStore.isLogin) {
        return  navigateTo('/')
    }
})
