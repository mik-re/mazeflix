import {mount, createLocalVue, RouterLinkStub} from '@vue/test-utils'
import Vuex from 'vuex';
import {
    state,
    mutations,
} from './mocks/search';
import {mutationTypes} from '@/store/modules/search'
import {showsMock} from './mocks/shows.js'

import MfxSearch from '../views/Search.vue'
import MfxErrorMessage from '../components/ErrorMessage.vue'
import MfxLoader from '../components/Loader.vue'
import MfxMovieCard from '../components/MovieCard.vue';

jest.mock('@/store');
const localVue = createLocalVue()
localVue.use(Vuex);

describe('MfxSearch', () => {
    let wrapper = null;
    let storeMock;

    beforeEach(() => {
        storeMock = {
            mutations,
            store: new Vuex.Store({
                modules: {
                    search: {
                        state,
                        mutations
                    }
                }
            })
        }

        wrapper = mount(MfxSearch, {
            store: storeMock.store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    it("should display error component if error true", async () => {
        storeMock.store.state.search.validationErrors = {
            error: 'some error'
        }
        storeMock.store.state.search.searchShowResult = null;
        storeMock.store.state.search.isSubmitting = false;
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeTruthy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="search-results"]').exists()).toBeFalsy()
    });

    it("should display loader while fetching data", async () => {
        storeMock.store.state.search.validationErrors = null
        storeMock.store.state.search.searchShowResult = null;
        storeMock.store.state.search.isSubmitting = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeFalsy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeTruthy()
        expect(wrapper.find('[data-mfx="search-results"]').exists()).toBeFalsy()
    });

    it("should display no results feedback", async () => {
        storeMock.store.state.search.validationErrors = null;
        storeMock.store.state.search.isSubmitting = false;
        storeMock.store.state.search.searchShowResult = [];
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeFalsy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="no-results"]').exists()).toBeTruthy()
    });

    it("should display results", async () => {
        storeMock.store.state.search.validationErrors = null;
        storeMock.store.state.search.isSubmitting = false;
        storeMock.store.state.search.searchShowResult = showsMock;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeFalsy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="no-results"]').exists()).toBeFalsy()

        const movieCards = wrapper.findAllComponents(MfxMovieCard);
        expect(movieCards.wrappers.length).toEqual(showsMock.length);

        movieCards.wrappers.forEach((card, i) => {
            expect(card.props().id).toEqual(showsMock[i].show.id);
            expect(card.props().image).toEqual(showsMock[i].show.image.medium);
            expect(card.props().title).toEqual(showsMock[i].show.name);
        })
    });

    it("should set the state of searchBar to null when routing away", () => {
        wrapper.vm.$destroy()
        expect(storeMock.mutations[mutationTypes.finishSearch]).toBeCalled()
    });
})