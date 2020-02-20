import { shallowMount } from "@vue/test-utils";
import Header from "../../src/components/molecules/Header.vue";

it("should match snapshot", () => {
  const wrapper = shallowMount(Header);

  expect(wrapper.element).toBeDefined();
  expect(wrapper.element).toMatchSnapshot();
});
