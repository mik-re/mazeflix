import {mutationTypes, actionTypes} from "@/store/modules/shows";

export const showsMock = [
    {
        show: {
            id: 11,
            image: {
                medium: 'https://someimage.html',
                original: 'https://someimage.html'
            },
            name: 'Breaking Bad'
        },
    },
    {
        show: {
            id: 12,
            image: {
                medium: 'https://someimage.html',
                original: 'https://someimage.html'
            },
            name: 'American Horror Story'
        },
    },
    {
        show: {
            id: 13,
            image: {
                medium: 'https://someimage.html',
                original: 'https://someimage.html'
            },
            name: 'Game of thrones'
        },
    },
];

export const showDetailMock = {
    ...showsMock[0].show,
    summary: 'summary of the show',
    rating: {
        average: 9.2
    },
    language: "English",
    genres: ["Drama", "Thriller"],
}

export const showsHomeMock = {
    Action: [
        showsMock[0].show
    ],
    Drama: [
        showsMock[0].show
    ]
}

export const showCategoriesMock = ['Action', 'Drama'];

export const state = {
    isSubmitting: false,
    validationErrors: null,
    shows: null,
    showById: null,
    categories: null
}

export const mutations = {
    [mutationTypes.getShowsStart]: jest.fn(),
    [mutationTypes.getShowsSuccess]: jest.fn(),
    [mutationTypes.getShowsFailure]: jest.fn(),
    [mutationTypes.getShowByIdStart]: jest.fn(),
    [mutationTypes.getShowByIdSuccess]: jest.fn(),
    [mutationTypes.getShowByIdFailure]: jest.fn(),
    [mutationTypes.getShowByIdReset]: jest.fn(),
    [mutationTypes.getShowCategories]: jest.fn(),
}

export const actions = {
    [actionTypes.fetchShowsFeed]: jest.fn(),
    [actionTypes.fetchShowById]: jest.fn(),
}

