import { mount } from '@vue/test-utils'
import MfxErrorMessage from '@/components/ErrorMessage.vue'

describe('MfxErrorMessage', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(MfxErrorMessage, {});
    });

    it("should display ErrorMessage component with default message", () => {
        expect(wrapper.find('.error-message')).toBeTruthy()
        expect(wrapper.find('.error-message').text()).toBe('Something went wrong!')
    });

    it("should display ErrorMessage component with props message", async() => {
        const message = "some error"
        await wrapper.setProps({message})
        expect(wrapper.find('.error-message').text()).toBe(message)
    });


});