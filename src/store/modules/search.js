import tvMazeApi from '@/api/tvMaze';

const state = {
    isUserTyping: false,
    validationErrors: null,
    searchShowResult: null,
    isSubmitting: false
}

export const mutationTypes = {
    startSearch: '[searchBar] Start Search',
    finishSearch: '[searchBar] Finish Search',

    searchShowStart: '[searchShow] Search  show start',
    searchShowSuccess: '[searchShow] Search show success',
    searchShowFailure: '[searchShow] Search show failure'
}

export const getterTypes = {
    isUserTyping: '[searchBar] User is typing',
}

const getters = {
    [getterTypes.isUserTyping]: state => {
        return state.isUserTyping
    },
}

export const actionTypes = {
    searchShow: '[searchShow] Search shows'
}

const mutations = {
    [mutationTypes.startSearch](state) {
        state.isUserTyping = true;
    },
    [mutationTypes.finishSearch](state) {
        state.searchShowResult = null;
        state.isUserTyping = false;
    },
    [mutationTypes.searchShowStart](state) {
        state.searchShowResult = null
        state.isSubmitting = true
    },
    [mutationTypes.searchShowSuccess](state, payload) {
        state.isSubmitting = false
        state.searchShowResult = payload;
    },
    [mutationTypes.searchShowFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    [actionTypes.searchShow]({commit}, query) {
        return new Promise(resolve => {
            commit(mutationTypes.searchShowStart)
            tvMazeApi.searchShow(query)
                .then(Show => {
                   commit(mutationTypes.searchShowSuccess, Show)
                    resolve(Show)
                })
                .catch(error => {
                    commit(
                        mutationTypes.searchShowFailure,
                        error
                    )
                })
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}