import tvMazeApi from '@/api/tvMaze';
import {refactorShowsByGenre, sortByRating} from "@/helpers";

const state = {
    isSubmitting: false,
    validationErrors: null,
    shows: null,
    showById: null,
    categories: null
}

export const mutationTypes = {
    getShowsStart: '[Shows Feed] Get shows feed start',
    getShowsSuccess: '[Shows Feed] Get shows feed success',
    getShowsFailure: '[Shows Feed] Get shows feed failure',
    getShowCategories: '[Shows Feed] Get shows feed categories',
    getShowByIdStart: '[Shows Feed] Get show feed by id start',
    getShowByIdSuccess: '[Shows Feed] Get show feed by id success',
    getShowByIdFailure: '[Shows Feed] Get show by id feed failure',
    getShowByIdReset: '[Shows Feed] Get show by id to null while leaving detail page',
}

export const actionTypes = {
    fetchShowsFeed: '[Shows Feed] Search shows',
    fetchShowById: '[Shows Feed] Search show by id'
}

const mutations = {
    [mutationTypes.getShowsStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.getShowsSuccess](state, payload) {
        state.isSubmitting = false
        const refactoredByGenre = refactorShowsByGenre(payload)
        Object.keys(refactoredByGenre).forEach(genre => {
            refactoredByGenre[genre] = sortByRating(refactoredByGenre[genre])
        });
        state.shows = refactoredByGenre;
    },
    [mutationTypes.getShowsFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.getShowByIdStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.getShowByIdSuccess](state, payload) {
        state.isSubmitting = false
        state.showById = payload;
    },
    [mutationTypes.getShowByIdFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.getShowByIdReset](state) {
        state.showById = null
    },
    [mutationTypes.getShowCategories](state) {
        state.categories = Object.keys(state.shows)
    },
}

const actions = {
    [actionTypes.fetchShowsFeed]({commit}, query) {
        return new Promise(resolve => {
            commit(mutationTypes.getShowsStart)
            tvMazeApi.getShowFeed(query)
                .then(shows => {
                    commit(mutationTypes.getShowsSuccess, shows)
                    commit(mutationTypes.getShowCategories)
                    resolve(shows)
                })
                .catch(error => {
                    commit(
                        mutationTypes.getShowsFailure,
                        error
                    )
                })
        })
    },
    [actionTypes.fetchShowById]({commit}, id) {
        return new Promise(resolve => {
            commit(mutationTypes.getShowByIdStart)
            tvMazeApi.getShowById(id)
                .then(show => {
                    commit(mutationTypes.getShowByIdSuccess, show)
                    resolve(show)
                })
                .catch(error => {
                    commit(
                        mutationTypes.getShowByIdFailure,
                        error
                    )
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}