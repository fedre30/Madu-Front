import { shallow } from "@vue/test-utils";
import SidebarEntry from "../../src/components/molecules/sidebarEntry.vue";

it("should match snapshot", () => {
  const wrapper = shallow(SidebarEntry);

  expect(wrapper.element).toBeDefined();
  expect(wrapper.element).toMatchSnapshot();
});
