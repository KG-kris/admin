import { requestVipList } from "../../util/request"
const state = {
    list: []
}
const mutations = {
    changeVipList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requestVipList(context) {
        requestVipList().then(res => {
            context.commit("changeVipList", res.data.list)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}