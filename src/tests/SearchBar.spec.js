import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex';
import {
    getters,
    mutations,
    actions
} from './mocks/search';
import {getterTypes, mutationTypes, actionTypes} from '@/store/modules/search'
import MfxSearchBar from '@/components/SearchBar.vue'
import {IconsPlugin} from 'bootstrap-vue'

jest.mock('lodash.debounce', () => jest.fn(fn => fn));
jest.mock('@/store');

const localVue = createLocalVue()
localVue.use(IconsPlugin);
localVue.use(Vuex);


describe('MfxSearchBar', () => {
    let wrapper = null;
    let storeMock;
    beforeEach(() => {
        storeMock = {
            actions,
            getters,
            mutations,
            store: new Vuex.Store({
                modules: {
                    search: {
                        actions,
                        getters,
                        mutations
                    }
                }
            })
        }

        wrapper = mount(MfxSearchBar, {
            store: storeMock.store,
            localVue
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display input search", () => {
        expect(wrapper.find('.search-input')).toBeTruthy()
    });

    it("should handle the search when user is typing", async () => {
        storeMock.getters[getterTypes.isUserTyping].mockReturnValue(true)
        const searchValue = 'friends';
        const searchInput = wrapper.find('.search-input');
        searchInput.setValue(searchValue)
        await searchInput.trigger('keyup');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.searchQuery).toBe(searchValue)
        expect(storeMock.getters[getterTypes.isUserTyping]).toBeTruthy()
        expect(storeMock.mutations[mutationTypes.startSearch]).not.toBeCalled()
        //we want to test the payload passed to the action is correct
        expect(storeMock.actions[actionTypes.searchShow]).toBeCalledWith(
            expect.anything(), searchValue
        )
    });

    it("should not call service when user is typing space", async () => {
        const searchValue = ' ';
        const searchInput = wrapper.find('.search-input');
        searchInput.setValue(searchValue)
        await searchInput.trigger('keyup');
        await wrapper.vm.$nextTick();
        expect(storeMock.mutations[mutationTypes.finishSearch]).toBeCalled()
    });

})