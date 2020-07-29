import { requestActivityList } from "../../util/request"

const state = {
    list: []
}

const mutations = {
    changeAcyivityList(state, arr) {
        state.list = arr
    }
}

const actions = {
    requestActivityList(context) {
        requestActivityList().then(res => {
            context.commit("changeAcyivityList", res.data.list)
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