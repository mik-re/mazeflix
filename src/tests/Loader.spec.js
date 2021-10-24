import { mount } from '@vue/test-utils'
import MfxLoader from '@/components/Loader.vue';

describe('MfxLoader', () => {

    it("should display loader", () => {
        let wrapper = mount(MfxLoader, {});
        expect(wrapper.find('.mfx-movie-card')).toBeTruthy()
    });

});