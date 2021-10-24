import {RouterLinkStub, mount } from '@vue/test-utils'
import MfxMovieCard from '@/components/MovieCard.vue';

describe('MfxMovieCard', () => {
    let wrapper = null;

    let props = null;

    beforeEach(() => {
        props = {
            id: 123,
            image: 'https://image.com',
            title: 'Friends'
        }
        wrapper = mount(MfxMovieCard, {
            propsData: props,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    it("should display movie card", () => {
        expect(wrapper.find('.mfx-movie-card')).toBeTruthy()
    });

    it("should display image from data", () => {
        expect(wrapper.find('.fallback').exists()).toBeFalsy()
        expect(wrapper.find('img.mfx-image-fit').attributes().src).toEqual(props.image)
    });

    it("should display fallback content if data is missing", async () => {
        const noImage = {
            ...props,
            image: null
        };
        await wrapper.setProps(noImage)
        expect(wrapper.find('.fallback').exists()).toBeTruthy()
        expect(wrapper.find('img.mfx-image-fit').exists()).toBeFalsy()
        expect(wrapper.find('.fallback p').text()).toEqual(noImage.title)
    });

    it("should display fallback content if data is missing", async () => {
        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual(
            {"name": "show", "params": {"id": props.id}}
        )
    });
});