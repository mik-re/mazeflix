import {RouterLinkStub, mount, createLocalVue} from '@vue/test-utils'
import MfxHeader from '@/components/Header.vue';
import {IconsPlugin} from "bootstrap-vue";
import MfxSearchBar from '@/components/SearchBar.vue'

const localVue = createLocalVue()
localVue.use(IconsPlugin);

describe('MfxHeader', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(MfxHeader, {
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    it("should display header component", () => {
        expect(wrapper.find('.main-header')).toBeTruthy()
    });

    it("should display Search component", () => {
        expect(wrapper.findComponent(MfxSearchBar)).toBeTruthy()
    });

    it("should logo should redirect to home", () => {
        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual(
            {"name": "home"}
        )
    });

});