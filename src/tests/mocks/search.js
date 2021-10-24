import {mutationTypes, getterTypes, actionTypes} from "@/store/modules/search";

export const state = {
    isUserTyping: false,
    validationErrors: null,
    searchShowResult: null,
    isSubmitting: false
}

export const getters = {
    [getterTypes.isUserTyping]:jest.fn(),
}

export const mutations = {
    [mutationTypes.startSearch]: jest.fn(),
    [mutationTypes.finishSearch] : jest.fn(),
    [mutationTypes.searchShowStart] : jest.fn(),
    [mutationTypes.searchShowSuccess] : jest.fn(),
    [mutationTypes.searchShowFailure]: jest.fn(),
}

export const actions = {
    [actionTypes.searchShow] : jest.fn(() => Promise.resolve({ data: {} }))
}
