import Vue from "vue";
import Vuex from 'vuex'
import { setItem, getItem } from "@/utils/strorage";
Vue.use(Vuex)
const TOKEN_KEY = 'TOKEN_USER'
const actions = {}
const mutations = {
    setUser(state, data) {
        state.user = data
        setItem(TOKEN_KEY, state.user)
    },

}
const state = {
    user: getItem(TOKEN_KEY),
}
export default new Vuex.Store({
    actions,
    mutations,
    state
})