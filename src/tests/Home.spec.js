import {mount, createLocalVue, RouterLinkStub} from '@vue/test-utils'
import MfxHome from '../views/Home.vue';
import Vuex from "vuex";
import {
    state,
    actions, showCategoriesMock, showsHomeMock,
} from './mocks/shows.js';
import MfxErrorMessage from "../components/ErrorMessage";
import MfxLoader from "../components/Loader";
import {actionTypes} from "../store/modules/shows";
import MfxMovieCard from "../components/MovieCard";
import MfxCategories from "../components/Categories"


jest.mock('@/store');

const localVue = createLocalVue()
localVue.use(Vuex);

describe('MfxHome', () => {
    let wrapper = null;
    let storeMock;

    beforeEach(() => {
        storeMock = {
            actions,
            store: new Vuex.Store({
                modules: {
                    shows: {
                        state,
                        actions,
                    }
                }
            })
        }
        wrapper = mount(MfxHome, {
            store: storeMock.store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    it("should display error component if error true", async () => {
        storeMock.store.state.shows.validationErrors = {
            error: 'some error'
        }
        storeMock.store.state.shows.shows = null;
        storeMock.store.state.shows.isSubmitting = false;
        storeMock.store.state.shows.categories = false;

        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeTruthy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeFalsy()
        expect(wrapper.find('[data-mfx="show-home"]').exists()).toBeFalsy()
    });

    it("should display loader while fetching data", async () => {
        storeMock.store.state.shows.validationErrors = null
        storeMock.store.state.shows.shows = null;
        storeMock.store.state.shows.isSubmitting = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(MfxErrorMessage).exists()).toBeFalsy()
        expect(wrapper.findComponent(MfxLoader).exists()).toBeTruthy()
        expect(wrapper.find('[data-mfx="shows-home"]').exists()).toBeFalsy()
    });

    it("should fetch the shows",  () => {
        expect(storeMock.actions[actionTypes.fetchShowsFeed]).toBeCalled()
    });

    describe('Dashboard', () => {

        beforeEach(async () => {
            storeMock.store.state.shows.validationErrors = null
            storeMock.store.state.shows.shows = showsHomeMock;
            storeMock.store.state.shows.isSubmitting = null;
            storeMock.store.state.shows.categories = showCategoriesMock
            await wrapper.vm.$nextTick();
        });

        it("display categories section", () => {
            const categoryComponent = wrapper.findComponent(MfxCategories);
            expect(categoryComponent.exists()).toBeTruthy()
            expect(categoryComponent.props().categories).toEqual(showCategoriesMock);
        });

        it("display Genres", () => {
            const mocKeys = Object.keys(showsHomeMock)
            const genres = wrapper.findAll('[data-mfx="shows-genre"]')
            expect(genres.length).toBe(mocKeys.length)

            genres.wrappers.forEach((genre, i) => {
                expect(genre.text()).toEqual(mocKeys[i]);
            })
        });

        it("display shows", () => {
            const shows = Object.keys(showsHomeMock).reduce((acc, genre) => {
                return  [
                    ...acc,
                    ...showsHomeMock[genre]
                ]
            },[])
            const movieCards = wrapper.findAllComponents(MfxMovieCard);
            expect(movieCards.wrappers.length).toEqual(shows.length);

            movieCards.wrappers.forEach((card, i) => {
                expect(card.props().id).toEqual(shows[i].id);
                expect(card.props().image).toEqual(shows[i].image.medium);
                expect(card.props().title).toEqual(shows[i].name);
            })
        });
    });
});