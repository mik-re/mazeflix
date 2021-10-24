import {mount, createLocalVue} from '@vue/test-utils'
import MfxShowDetail from '../views/ShowDetail.vue';
import Vuex from "vuex";
import {
    state,
    mutations,
    actions, showDetailMock
} from './mocks/shows.js';
import MfxErrorMessage from "../components/ErrorMessage";
import MfxLoader from "../components/Loader";
import {actionTypes} from "../store/modules/shows";
jest.mock('@/store');

const localVue = createLocalVue()
localVue.use(Vuex);

describe('ShowDetail', () => {
    let wrapper = null;
    let storeMock;
    const $route = {
        params: {
            id: 11
        }
    }
    beforeEach(() => {
        storeMock = {
            mutations,
            actions,
            store: new Vuex.Store({
                modules: {
                    shows: {
                        state,
                        mutations,
                        actions,
                    }
                }
            })
        }
        wrapper = mount(MfxShowDetail, {
            store: storeMock.store,
            localVue,
            mocks: {
                $route
            }
        });
    });

    it("should display error component if error true", async () => {
        storeMock.store.state.shows.validationErrors = {
            error: 'some error'
        }
        storeMock.store.state.shows.showById = null;
        storeMock.store.state.shows.isSubmitting = false;

        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeTruthy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="show-detail"]').exists()).toBeFalsy()
    });

    it("should display loader while fetching data", async () => {
        storeMock.store.state.shows.validationErrors = null
        storeMock.store.state.shows.showById = null;
        storeMock.store.state.shows.isSubmitting = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeFalsy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeTruthy()
        expect(wrapper.find('[data-mfx="show-detail"]').exists()).toBeFalsy()
    });

    it("should fetch the show",  () => {
        expect(storeMock.actions[actionTypes.fetchShowById]).toBeCalled()
    });

    it("should display show with datails", async () => {
        storeMock.store.state.shows.validationErrors = null
        storeMock.store.state.shows.showById = showDetailMock;
        storeMock.store.state.shows.isSubmitting = null;
        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-mfx="show-detail"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-mfx="show-image"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-mfx="show-image-fallback"]').exists()).toBeFalsy()
        expect( wrapper.find('[data-mfx="show-image"]').attributes().src).toEqual(showDetailMock.image.original)
        expect(wrapper.find('[data-mfx="show-name"]').text()).toBe(showDetailMock.name)
        expect(wrapper.find('[data-mfx="show-genres"]').text()).toBe(wrapper.vm.genres)
        expect(wrapper.find('[data-mfx="show-language"]').text()).toBe(showDetailMock.language)
    });

    it("should not display language and rating if missing", async () => {
        const noRatingAndLanguage = {
            ...showDetailMock,
            rating: null,
            language: null
        }

        storeMock.store.state.shows.validationErrors = null
        storeMock.store.state.shows.showById = noRatingAndLanguage;
        storeMock.store.state.shows.isSubmitting = null;
        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-mfx="show-rating"]').exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="show-image-language"]').exists()).toBeFalsy()
    });

    it("should display a show fallback image", async () => {
        const noImage = {
            ...showDetailMock,
            image: null
        }

        storeMock.store.state.shows.validationErrors = null
        storeMock.store.state.shows.showById = noImage;
        storeMock.store.state.shows.isSubmitting = null;
        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-mfx="show-image"]').exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="show-image-fallback"]').exists()).toBeTruthy()
    });
});