import { createStore } from 'vuex'
export default createStore({
    state: {
        userName: 'zhangsan'
    },
    getters: {
        newName(state) {
            return state.userName + '!'
        }
    },
    mutations: {
        updateName(state, name) {
            state.userName = name
            console.log(state.userName);

        }
    }
})