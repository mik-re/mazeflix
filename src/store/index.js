import Vue from 'vue'
import Vuex from 'vuex'
import search from '@/store/modules/search'
import shows from '@/store/modules/shows'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        search,
        shows
    }
})
