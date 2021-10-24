import { mount } from '@vue/test-utils'
import MfxCategories from '@/components/Categories.vue'

describe('MfxCategories', () => {

    it("should display categories", () => {
        const props = {
            categories : [
                "Drama",
                "Thriller"
            ]
        };

        const wrapper = mount(MfxCategories, {
            propsData: props
        });

        expect(wrapper.findAll('.category-list li').length).toBe(props.categories.length)
    });
});