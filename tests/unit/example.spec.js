import { shallowMount } from "@vue/test-utils";
import About from "@/views/About";

describe("About.vue", () => {
  it("renders about", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toMatch("This is an about page");
  });
});
