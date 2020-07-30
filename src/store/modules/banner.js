import {requestBannerList} from "../../util/request"
const state = {
    list: []

}

const mutations = {
    changeList(state, list) {
        state.list = list
    }
}

const actions = {
    requestList({ commit }) {
        requestBannerList().then(res=>{
            commit("changeList",res.data.list)
        })
    }
}

const getters = {
    list(state){
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
